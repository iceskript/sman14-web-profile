import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BeritaTerbaru = () => {
  const navigate = useNavigate();

  const newsData = [
    {
      id: 1,
      date: '12 Feb 2026',
      category: 'Kegiatan',
      title: 'Pelaksanaan Ujian Praktik Kelas XII Tahun Ajaran 2025/2026',
      excerpt: 'Siswa kelas XII mulai melaksanakan ujian praktik sebagai salah satu syarat kelulusan dengan penuh antusiasme...',
      image: '/news1.png'
    },
    {
      id: 2,
      date: '10 Feb 2026',
      category: 'Prestasi',
      title: 'SMAN 14 Samarinda Meraih Juara 1 Lomba Debat Bahasa Inggris Tingkat Provinsi',
      excerpt: 'Tim debat sekolah berhasil menyisihkan puluhan sekolah lainnya dalam ajang bergengsi tahun ini...',
      image: '/news2.png'
    },
    {
      id: 3,
      date: '08 Feb 2026',
      category: 'Pengumuman',
      title: 'Sosialisasi Program Go-Green: Menuju Sekolah Adiwiyata Mandiri',
      excerpt: 'Langkah nyata sekolah dalam menjaga kelestarian lingkungan melalui program pemilahan sampah dan penghijauan...',
      image: '/news3.png'
    },
    {
      id: 4,
      date: '05 Feb 2026',
      category: 'Kegiatan',
      title: 'Workshop Jurnalistik Siswa: Mengembangkan Bakat Menulis di Era Digital',
      excerpt: 'Menghadirkan narasumber profesional untuk membekali siswa kemampuan menulis berita yang etis dan menarik...',
      image: '/news4.png'
    },
    {
      id: 5,
      date: '01 Feb 2026',
      category: 'Akademik',
      title: 'Penerapan Kurikulum Merdeka: Inovasi Pembelajaran Berbasis Proyek',
      excerpt: 'Bagaimana SMAN 14 mengimplementasikan P5 untuk membentuk karakter profil pelajar pancasila...',
      image: '/news5.png'
    }
  ];

  // Animasi Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

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
            <span className="text-[#587F93]">Berita Terbaru</span>
          </div>
          <h1 className="text-[40px] lg:text-[56px] font-[900] text-black leading-none tracking-tight">
            Berita <span className="text-[#587F93]">Terbaru</span>
          </h1>
          <div className="w-20 h-1.5 bg-[#587F93] mt-6 rounded-full"></div>
        </motion.div>

        {/* News Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
        >
          {newsData.map((news) => (
            <motion.div 
              key={news.id}
              variants={cardVariants}
              whileHover={{ y: -10 }}
              className="group bg-white rounded-3xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col h-full transition-all duration-300 hover:shadow-[0_20px_50px_rgba(88,127,147,0.15)]"
            >
              {/* Image Container */}
              <div className="relative h-[240px] overflow-hidden">
                <img 
                  src={news.image} 
                  alt={news.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => e.target.src = 'https://via.placeholder.com/600x400?text=SMAN14+News'}
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full shadow-sm">
                  <span className="text-[11px] font-black text-[#587F93] uppercase tracking-wider">{news.category}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-2 text-gray-400 mb-4">
                  <Calendar size={14} />
                  <span className="text-[12px] font-bold uppercase tracking-wide">{news.date}</span>
                </div>
                
                <h3 className="text-[20px] font-[800] text-gray-900 leading-tight mb-4 group-hover:text-[#587F93] transition-colors line-clamp-2">
                  {news.title}
                </h3>
                
                <p className="text-gray-500 text-[15px] leading-relaxed mb-8 line-clamp-3 font-medium">
                  {news.excerpt}
                </p>

                <button 
                  onClick={() => navigate(`/berita/${news.id}`)}
                  className="mt-auto flex items-center gap-3 text-[#587F93] font-black text-[13px] uppercase tracking-widest group/btn"
                >
                  Baca Selengkapnya
                  <ArrowRight size={18} className="transition-transform duration-300 group-hover/btn:translate-x-2" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default BeritaTerbaru;