import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const DataGuruPage = () => {
  const navigate = useNavigate();

  const guruData = [
    { id: 1, nama: "Syawal Arifin, S.S., M.Pd.", jabatan: "Kepala Sekolah", mapel: "Manajemen Pendidikan", img: "/kepsek.png" },
    { id: 2, nama: "Nama Guru Waka, S.Pd.", jabatan: "Waka Kurikulum", mapel: "Matematika", img: "/waka1.png" },
    { id: 3, nama: "Nama Guru Waka, M.Pd.", jabatan: "Waka Kesiswaan", mapel: "Bahasa Indonesia", img: "/waka2.png" },
    { id: 4, nama: "Nama Guru, S.Kom.", jabatan: "Guru Mapel", mapel: "Informatika", img: "/guru-4.jpg" },
    { id: 5, nama: "Nama Guru, S.Si.", jabatan: "Guru Mapel", mapel: "Biologi", img: "/guru-5.jpg" },
    { id: 6, nama: "Nama Guru, M.Si.", jabatan: "Guru Mapel", mapel: "Fisika", img: "/guru-6.jpg" },
    { id: 7, nama: "Nama Guru, S.Pd.", jabatan: "Guru Mapel", mapel: "Sejarah", img: "/guru-1.jpg" },
    { id: 8, nama: "Nama Guru, S.Sn.", jabatan: "Guru Mapel", mapel: "Seni Budaya", img: "/guru-2.jpg" },
  ];

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
            <span className="text-[#587F93]">Data Guru</span>
          </div>
          <h1 className="text-[40px] lg:text-[56px] font-[900] text-black leading-none tracking-tight">
            Data <span className="text-[#587F93]">Guru</span>
          </h1>
          <div className="w-20 h-1.5 bg-[#587F93] mt-6 rounded-full"></div>
          <p className="mt-8 text-gray-500 max-w-2xl font-medium text-lg">
            Mengenal lebih dekat tenaga pendidik profesional SMAN 14 Samarinda yang berdedikasi dalam membimbing siswa meraih prestasi.
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
              key={guru.id}
              variants={cardVariants}
              whileHover={{ y: -12 }}
              className="group bg-white rounded-[32px] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-100 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(88,127,147,0.15)]"
            >
              {/* Image Container */}
              <div className="relative aspect-[4/5] overflow-hidden bg-gray-50">
                <img 
                  src={guru.img} 
                  alt={guru.nama} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={(e) => e.target.src = 'https://via.placeholder.com/400x500?text=Guru+SMAN14'}
                />
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#587F93]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-8">
                  <button 
                    className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#587F93] hover:bg-[#587F93] hover:text-white transition-all shadow-lg"
                    title="Hubungi via Email"
                  >
                    <Mail size={18} />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 text-center">
                <span className="text-[11px] font-black text-[#587F93] uppercase tracking-[0.2em] mb-3 block opacity-70">
                  {guru.jabatan}
                </span>
                <h3 className="text-[18px] lg:text-[20px] font-[800] text-gray-900 leading-tight mb-2 group-hover:text-[#587F93] transition-colors">
                  {guru.nama}
                </h3>
                <div className="w-8 h-[2px] bg-gray-200 mx-auto my-4 group-hover:w-16 group-hover:bg-[#587F93] transition-all duration-500"></div>
                <p className="text-gray-400 text-sm font-bold uppercase tracking-widest">
                  {guru.mapel}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default DataGuruPage;