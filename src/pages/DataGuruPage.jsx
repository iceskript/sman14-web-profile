import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { fetchStrukturOrganisasi, urlFor } from '../lib/sanity';

const DataGuruPage = () => {
  const navigate = useNavigate();
  const [guruData, setGuruData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchStrukturOrganisasi();
        setGuruData(data);
      } catch (error) {
        console.error('Gagal memuat data guru:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  if (isLoading) {
    return (
      <div className="pt-32 lg:pt-44 pb-24 font-urbanist bg-[#FDFDFD] min-h-screen">
        <div className="max-w-[1440px] mx-auto px-5 lg:px-[60px] text-center">
          <p className="text-gray-500 font-medium">Memuat data guru dan staf...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 lg:pt-44 pb-24 font-urbanist bg-[#FDFDFD] min-h-screen">
      <div className="max-w-[1440px] mx-auto px-5 lg:px-[60px]">
        
        {/* Header & Breadcrumbs */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-16"
        >
          <div className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">
            <span className="hover:text-[#587F93] cursor-pointer" onClick={() => navigate('/')}>Beranda</span>
            <ChevronRight size={14} />
            <span className="text-[#587F93]">Data Guru & Staf</span>
          </div>
          <h1 className="text-[40px] lg:text-[56px] font-[900] text-black leading-none tracking-tight">
            Struktur <span className="text-[#587F93]">Organisasi</span>
          </h1>
          <div className="w-20 h-1.5 bg-[#587F93] mt-6 rounded-full"></div>
          <p className="mt-8 text-gray-500 max-w-2xl font-medium text-lg">
            Mengenal lebih dekat tenaga pendidik dan staf profesional SMAN 14 Samarinda yang berdedikasi dalam membimbing siswa meraih prestasi.
          </p>
        </motion.div>

        {/* Guru Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10"
        >
          {guruData.map((guru) => (
            <motion.div 
              key={guru._id}
              variants={cardVariants}
              whileHover={{ y: -12 }}
              className="group bg-white rounded-[32px] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-100 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(88,127,147,0.15)]"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/5] overflow-hidden bg-gray-50">
                {guru.foto ? (
                  <img 
                    src={urlFor(guru.foto).width(400).height(500).url()} 
                    alt={guru.nama} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <span className="text-gray-400">Foto</span>
                  </div>
                )}
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#587F93]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-8">
                  {guru.email && (
                    <a 
                      href={`mailto:${guru.email}`}
                      className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#587F93] hover:bg-[#587F93] hover:text-white transition-all shadow-lg"
                      title={`Email: ${guru.email}`}
                    >
                      <Mail size={18} />
                    </a>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-8 text-center">
                <span className="text-[11px] font-black text-[#587F93] uppercase tracking-[0.2em] mb-3 block opacity-70">
                  {guru.posisi.replace(/([A-Z])/g, ' $1').trim()}
                </span>
                <h3 className="text-[18px] lg:text-[20px] font-[800] text-gray-900 leading-tight mb-2 group-hover:text-[#587F93] transition-colors">
                  {guru.nama}
                </h3>
                {guru.gelar && (
                  <p className="text-[12px] text-gray-500 mb-4">{guru.gelar}</p>
                )}
                <div className="w-8 h-[2px] bg-gray-200 mx-auto my-4 group-hover:w-16 group-hover:bg-[#587F93] transition-all duration-500"></div>
                {guru.nip && (
                  <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">
                    NIP: {guru.nip}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default DataGuruPage;