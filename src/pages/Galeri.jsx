import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Image as ImageIcon, Maximize2, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchGaleri, urlFor } from '../lib/sanity';

const Galeri = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [galeriData, setGaleriData] = useState([]);
  const [filter, setFilter] = useState(location.state?.filter || 'Semua');
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchGaleri();
        setGaleriData(data);
      } catch (error) {
        console.error('Gagal memuat galeri:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (location.state?.filter) {
      setFilter(location.state.filter);
    }
  }, [location.state]);

  const categories = ['Semua', 'akademik', 'acara', 'ekstrakurikuler', 'prestasi', 'wisata', 'fasilitas'];
  
  const categoryLabels = {
    'akademik': 'Akademik',
    'acara': 'Acara',
    'ekstrakurikuler': 'Ekstrakurikuler',
    'prestasi': 'Prestasi',
    'wisata': 'Wisata',
    'fasilitas': 'Fasilitas',
  };

  const filteredData = filter === 'Semua' 
    ? galeriData 
    : galeriData.filter(item => item.kategori === filter);

  const handleImageClick = (item, index) => {
    setSelectedImage(item);
    setSelectedImageIndex(index);
  };

  const handleNext = () => {
    if (selectedImageIndex < selectedImage.foto.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  const handlePrev = () => {
    if (selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };

  if (isLoading) {
    return (
      <div className="pt-32 lg:pt-44 pb-24 font-urbanist bg-[#FDFDFD] min-h-screen">
        <div className="max-w-[1440px] mx-auto px-5 lg:px-[60px] text-center">
          <p className="text-gray-500 font-medium">Memuat galeri foto...</p>
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
          className="mb-12"
        >
          <div className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">
            <span className="hover:text-[#587F93] cursor-pointer" onClick={() => navigate('/')}>Beranda</span>
            <ChevronRight size={14} />
            <span className="text-[#587F93]">Galeri Foto</span>
          </div>
          <h1 className="text-[40px] lg:text-[56px] font-[900] text-black leading-none tracking-tight">
            Galeri <span className="text-[#587F93]">Sekolah</span>
          </h1>
          <div className="w-20 h-1.5 bg-[#587F93] mt-6 rounded-full"></div>
          <p className="mt-8 text-gray-500 max-w-2xl font-medium text-lg">
            Dokumentasi momen berharga, fasilitas unggulan, dan berbagai pencapaian civitas akademika SMAN 14 Samarinda.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 uppercase tracking-wider border-2 ${
                filter === cat 
                ? 'bg-[#587F93] text-white border-[#587F93] shadow-lg shadow-[#587F93]/20' 
                : 'bg-white text-gray-400 border-gray-100 hover:border-[#587F93] hover:text-[#587F93]'
              }`}
            >
              {cat === 'Semua' ? 'Semua' : categoryLabels[cat]}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          <AnimatePresence mode='popLayout'>
            {filteredData.flatMap((album, albumIdx) => 
              album.foto.map((fotoItem, fotoIdx) => (
                <motion.div
                  key={`${albumIdx}-${fotoIdx}`}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  onClick={() => handleImageClick(album, fotoIdx)}
                  className="group relative aspect-[4/3] rounded-none overflow-hidden bg-gray-200 shadow-xl cursor-pointer"
                >
                  {/* Image */}
                  <img 
                    src={urlFor(fotoItem).width(800).height(600).url()} 
                    alt={album.judul} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  
                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                    <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="px-3 py-1 bg-[#587F93] text-white text-[10px] font-black uppercase tracking-widest">
                          {categoryLabels[album.kategori] || album.kategori}
                        </span>
                      </div>
                      <h3 className="text-xl font-[900] text-white uppercase tracking-tight mb-2">
                        {album.judul}
                      </h3>
                      {album.deskripsi && (
                        <p className="text-sm text-white/70 leading-relaxed font-medium line-clamp-2">
                          {album.deskripsi}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Floating Icon Decor */}
                  <div className="absolute top-6 right-6 w-10 h-10 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <Maximize2 size={18} className="text-white" />
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredData.length === 0 && (
          <div className="py-20 text-center">
            <ImageIcon size={48} className="mx-auto text-gray-200 mb-4" />
            <p className="text-gray-400 font-bold text-lg uppercase tracking-widest">Belum ada foto di kategori ini</p>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[1000] bg-black/95 flex items-center justify-center p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-6xl max-h-[95vh] flex flex-col"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 lg:right-0 text-white/50 hover:text-white transition-colors p-2 z-10"
              >
                <X size={32} />
              </button>
              
              <div className="relative flex-grow flex items-center justify-center overflow-hidden rounded-lg">
                <img
                  src={urlFor(selectedImage.foto[selectedImageIndex]).width(1200).height(900).url()}
                  alt={selectedImage.judul}
                  className="max-w-full max-h-[75vh] object-contain shadow-2xl"
                />
                
                {/* Navigation Arrows */}
                {selectedImage.foto.length > 1 && (
                  <>
                    <button
                      onClick={handlePrev}
                      disabled={selectedImageIndex === 0}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 disabled:opacity-30 text-white p-3 rounded-full transition-all"
                    >
                      ← Sebelumnya
                    </button>
                    <button
                      onClick={handleNext}
                      disabled={selectedImageIndex === selectedImage.foto.length - 1}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 disabled:opacity-30 text-white p-3 rounded-full transition-all"
                    >
                      Berikutnya →
                    </button>
                  </>
                )}
              </div>
              
              <div className="mt-6 text-white">
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 bg-[#587F93] text-white text-[10px] font-bold uppercase tracking-widest rounded-full">
                    {categoryLabels[selectedImage.kategori] || selectedImage.kategori}
                  </span>
                  {selectedImage.foto.length > 1 && (
                    <span className="text-xs text-white/60">
                      {selectedImageIndex + 1} / {selectedImage.foto.length}
                    </span>
                  )}
                </div>
                <h3 className="text-2xl lg:text-3xl font-black uppercase tracking-tight mb-2">{selectedImage.judul}</h3>
                {selectedImage.deskripsi && (
                  <p className="text-white/70 text-base lg:text-lg leading-relaxed max-w-3xl">{selectedImage.deskripsi}</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Galeri;