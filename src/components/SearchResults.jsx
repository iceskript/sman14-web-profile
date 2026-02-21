import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, ChevronRight, ArrowRight, Loader2, FileText, Image as ImageIcon, User, Info, AlertCircle } from 'lucide-react';
import { client, urlFor } from '../lib/sanity';

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('q');
  
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const performSearch = async () => {
      if (!query) {
        setResults([]);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      try {
        // GROQ Query untuk mencari di berbagai tipe dokumen
        const groqQuery = `*[
          (_type == "berita" && (judul match $searchTerm || excerpt match $searchTerm || konten[].children[].text match $searchTerm)) ||
          (_type == "galeri" && (judul match $searchTerm || deskripsi match $searchTerm)) ||
          (_type == "saranaPrasarana" && (nama match $searchTerm || deskripsi match $searchTerm)) ||
          (_type == "pendaftaran" && (judul match $searchTerm || deskripsi match $searchTerm)) ||
          (_type == "tenagaKependidikan" && (nama match $searchTerm || posisi match $searchTerm)) ||
          (_type == "dewanGuru" && (nama match $searchTerm || bidang match $searchTerm))
        ] {
          _id,
          _type,
          "title": coalesce(judul, nama),
          "description": coalesce(excerpt, deskripsi, posisi, bidang),
          foto,
          "path": select(
            _type == "berita" => "/berita/" + _id,
            _type == "galeri" => "/galeri",
            _type == "saranaPrasarana" => "/profil#sarana-prasarana",
            _type == "pendaftaran" => "/pendaftaran",
            _type == "tenagaKependidikan" => "/tenaga-kependidikan",
            _type == "dewanGuru" => "/dewan-guru"
          )
        }`;

        const data = await client.fetch(groqQuery, { searchTerm: `*${query}*` });
        setResults(data);
      } catch (error) {
        console.error('Search error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    performSearch();
  }, [query]);

  const getTypeLabel = (type) => {
    const labels = {
      'berita': 'Berita',
      'galeri': 'Galeri',
      'saranaPrasarana': 'Fasilitas',
      'pendaftaran': 'PPDB',
      'tenagaKependidikan': 'Tenaga Kependidikan',
      'dewanGuru': 'Dewan Guru'
    };
    return labels[type] || 'Informasi';
  };

  return (
    <div className="pt-32 lg:pt-44 pb-24 font-urbanist bg-[#FDFDFD] min-h-screen">
      <div className="max-w-[1440px] mx-auto px-5 lg:px-[60px]">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <div className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">
            <span className="hover:text-[#587F93] cursor-pointer" onClick={() => navigate('/')}>Beranda</span>
            <ChevronRight size={14} />
            <span className="text-[#587F93]">Hasil Pencarian</span>
          </div>
          <h1 className="text-[40px] lg:text-[56px] font-[900] text-black leading-none tracking-tight">
            Hasil untuk <span className="text-[#587F93]">"{query}"</span>
          </h1>
          <div className="w-20 h-1.5 bg-[#587F93] mt-6 rounded-full"></div>
          <p className="mt-8 text-gray-500 font-medium text-lg">
            Ditemukan {results.length} hasil yang relevan.
          </p>
        </motion.div>

        <div className="space-y-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="animate-spin text-[#587F93]" size={48} />
              <p className="text-gray-400 font-bold uppercase tracking-widest">Mencari...</p>
            </div>
          ) : results.length > 0 ? (
            results.map((item, index) => (
              <motion.div 
                key={item._id} 
                initial={{ opacity: 0, x: -20 }} 
                animate={{ opacity: 1, x: 0 }} 
                transition={{ delay: index * 0.05 }} 
                onClick={() => navigate(item.path)} 
                className="group bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#587F93]/30 transition-all cursor-pointer flex flex-col md:flex-row gap-6 items-center"
              >
                <div className="w-full md:w-32 h-32 rounded-xl overflow-hidden bg-gray-50 shrink-0">
                  {item.foto ? (
                    <img src={urlFor(item.foto).width(200).height(200).url()} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-300 bg-gray-100">
                      <Search size={24} />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <span className="px-2 py-0.5 bg-[#587F93]/10 text-[#587F93] text-[10px] font-black uppercase tracking-widest rounded mb-2 inline-block">
                    {getTypeLabel(item._type)}
                  </span>
                  <h3 className="text-xl font-black text-gray-900 group-hover:text-[#587F93] transition-colors mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-sm line-clamp-2 font-medium">{item.description}</p>
                </div>
                <div className="hidden md:block">
                  <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-[#587F93] group-hover:text-white transition-all">
                    <ArrowRight size={20} />
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="py-20 text-center bg-white rounded-3xl border border-dashed border-gray-200">
              <AlertCircle size={48} className="mx-auto text-gray-200 mb-4" />
              <p className="text-gray-400 font-bold text-lg uppercase tracking-widest">Tidak ada hasil ditemukan</p>
              <p className="text-gray-400 mt-2">Coba gunakan kata kunci lain.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;