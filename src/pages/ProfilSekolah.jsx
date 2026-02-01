import React, { useState } from 'react';
import { ChevronDown, ArrowRight, ArrowLeft } from 'lucide-react'; // Tambahkan ArrowLeft
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ProfilSekolah = () => {
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  // Data Sarana Prasarana (Show Off)
  const facilities = [
    { 
      id: 1, 
      title: "Laboratorium Komputer", 
      category: "Digital Learning", 
      img: "/lab-komputer.webp",
      desc: "Perangkat spesifikasi tinggi untuk menunjang pembelajaran TIK dan desain grafis."
    },
    { 
      id: 2, 
      title: "Perpustakaan Digital", 
      category: "Literasi", 
      img: "/perpus.webp",
      desc: "Akses ribuan e-book dan ruang baca hening yang nyaman untuk siswa."
    },
  ];

  // Data Menu Grid (Kotak-kotak di bawah)
  const menuGrid = [
    { title: "Struktur Organisasi", link: "/struktur-organisasi" },
    { title: "Wakil Kepala Satuan Pendidikan", link: "/waka" },
    { title: "Tenaga Administrasi Sekolah", link: "/tas" },
    { title: "Komite Sekolah", link: "/komite" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.22, 1, 0.36, 1] 
      }
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="pt-32 lg:pt-44 pb-24 font-urbanist bg-white min-h-screen overflow-x-hidden"
    >
      
      {/* 1. HEADER TITLE */}
      <motion.div variants={itemVariants} className="max-w-[1440px] mx-auto px-5 lg:px-[60px] mb-8 lg:mb-12">
        <h1 className="text-[40px] lg:text-[56px] font-[900] text-black leading-none mb-3 tracking-tight">
          Profil Sekolah
        </h1>
        <p className="text-[16px] lg:text-[18px] text-[#999] font-medium">Beranda / Profil</p>
      </motion.div>

      {/* 2. HERO SECTION */}
      <motion.section variants={itemVariants} className="relative w-full mb-24 lg:mb-40">
        <div className="w-full h-[350px] lg:h-[600px] overflow-hidden relative z-0 bg-gray-100 rounded-tr-[60px] lg:rounded-tr-[150px]">
          <img 
            src="/gedung2.webp" 
            alt="Gedung SMAN 14 Samarinda" 
            className="w-full h-full object-cover" 
          />
        </div>

        <div className="absolute inset-0 pointer-events-none">
          <div className="max-w-[1440px] mx-auto h-full px-5 lg:px-[60px] relative">
            <div className="absolute -bottom-16 lg:-bottom-24 left-5 lg:left-[60px] w-[90%] lg:w-[65%] bg-[#587F93] text-white p-8 lg:p-14 rounded-tr-[40px] lg:rounded-tr-[100px] z-10 pointer-events-auto border-2 border-white/20 antialiased">
              <h2 className="text-[22px] lg:text-[32px] font-[800] mb-4 lg:mb-6 uppercase tracking-wider leading-tight">
                SMA Negeri 14 Samarinda
              </h2>
              <p className="text-[14px] lg:text-[16px] leading-relaxed opacity-95 text-justify font-medium">
                SMA Negeri 14 Samarinda adalah lembaga pendidikan menengah atas yang berdedikasi untuk mencetak generasi penerus bangsa yang cerdas, berkarakter, dan kompetitif.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 3. SECTION SAMBUTAN */}
      <motion.div variants={itemVariants} className="max-w-[1440px] mx-auto px-5 lg:px-[60px] relative z-20">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24 mt-8">
          <div className="relative shrink-0 pt-24 isolate">
            <div className="relative w-[300px] h-[340px] lg:w-[450px] lg:h-[420px]">
              <div className="absolute inset-0 bg-[#587F93] rounded-t-[220px] rounded-bl-[120px] rounded-br-none border-b-4 border-black/10 z-0"></div>
              <div className="absolute bottom-0 left-0 w-full h-[160%] flex justify-center z-10 pointer-events-none">
                <img src="/test1.png" alt="Kepala Sekolah" className="h-full w-auto object-contain object-bottom ml-[4%]" />
              </div>
              <div className="absolute bottom-10 right-[-15px] bg-white text-[#587F93] px-8 py-2.5 rounded-l-full border-y border-l border-black/10 z-20">
                <h3 className="text-[18px] lg:text-[24px] font-[900] uppercase tracking-tighter">SAMBUTAN</h3>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start max-w-2xl pt-10">
            <span className="text-[#587F93] text-[120px] font-serif leading-none h-[60px] opacity-30">“</span>
            <p className="text-[18px] lg:text-[24px] text-[#334155] mb-10 leading-snug font-medium">
              "Sebagai pimpinan SMAN 14 Samarinda, saya mengajak seluruh elemen sekolah untuk bersinergi mewujudkan visi sekolah yang unggul dan berakhlak mulia."
            </p>
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="bg-[#587F93] hover:bg-[#466575] text-white px-6 py-2.5 rounded-md font-bold flex items-center gap-4 active:scale-95 text-[14px]"
            >
              {isExpanded ? 'Sembunyikan' : 'Selengkapnya'}
              <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} className="bg-white text-[#587F93] p-1 rounded-full">
                <ChevronDown size={18} />
              </motion.div>
            </button>
          </div>
        </div>
      </motion.div>

      {/* 4. EXPANDED CONTENT */}
      <AnimatePresence>
        {isExpanded && (
          <motion.section 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden bg-[#587F93] text-white mt-32"
          >
            <div className="max-w-[1440px] mx-auto px-5 lg:px-[60px] py-20 grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-[28px] lg:text-[36px] font-[900] mb-10 uppercase">Visi Besar SMAN 14</h3>
                <p className="text-[16px] lg:text-[18px] leading-[2] text-justify opacity-90 font-medium">
                  Melalui program Internal Enhancement, kami bertransformasi menjadi pusat keunggulan pendidikan yang adaptif.
                </p>
              </div>
              <div className="flex flex-col justify-end">
                <p className="text-[16px] lg:text-[18px] leading-[2] opacity-90 mb-12 text-justify font-medium">
                  Sinergi antara tenaga pendidik, siswa, dan orang tua adalah kunci keberhasilan kami.
                </p>
                <div className="border-t border-white/30 pt-8">
                  <p className="font-[900] text-[22px]">Kepala Sekolah SMAN 14,</p>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* 5. SECTION PIMPINAN */}
      <motion.section variants={itemVariants} className="w-full mt-32">
        <div className="text-center mb-16 px-5">
          <h2 className="text-[32px] lg:text-[42px] font-[900] text-black mb-3 uppercase tracking-tight">
            Pimpinan SMA Negeri 14 Samarinda
          </h2>
          <div className="w-16 h-1.5 bg-[#587F93] mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-0">
          {[
            { nama: "Waka Kurikulum", foto: "/waka1.png", dark: true },
            { nama: "Kepala Sekolah", foto: "/kepsek.png", dark: false },
            { nama: "Waka Kesiswaan", foto: "/waka2.png", dark: true }
          ].map((staf, index) => (
            <div key={index} className="group relative h-[500px] lg:h-[650px] overflow-hidden bg-[#587F93]">
              <img src={staf.foto} alt={staf.nama} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              <div className={`absolute inset-0 transition-opacity duration-500 group-hover:opacity-0 z-10 ${staf.dark ? 'bg-black/45' : 'bg-[#587F93]/70'}`}></div>
              <div className="absolute bottom-12 left-0 w-full px-8 z-30 text-center transition-transform duration-500 group-hover:-translate-y-3">
                <h4 className="text-white text-[20px] lg:text-[26px] font-[800] drop-shadow-lg">{staf.nama}</h4>
                <div className="w-12 h-1 bg-white mx-auto mt-4 opacity-0 group-hover:opacity-100 group-hover:w-24 transition-all duration-700"></div>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* 6. BOTTOM SHAPE SECTION */}
      <motion.section 
        variants={itemVariants} 
        className="relative w-full pt-20 lg:pt-32 pb-40 lg:pb-80 flex flex-col items-center"
      >
        <div className="relative z-20 w-full max-w-[1320px] px-5 lg:px-0">
            <div className="relative w-full h-[400px] lg:h-[550px] overflow-visible">
                
                {/* Gambar Utama */}
                <img 
                    src="/gedung2.webp" 
                    alt="Gedung SMAN 14 Samarinda" 
                    className="w-full h-full object-cover"
                />

                {/* BLOK VISI (Di Kiri Bawah di dalam gambar) */}
                <div className="absolute bottom-6 left-6 lg:bottom-12 lg:left-12 max-w-[85%] lg:max-w-[450px] bg-[#587F93]/85 backdrop-blur-md text-white p-6 lg:p-10 rounded-xl z-30">
                  <h3 className="text-[24px] lg:text-[42px] font-[900] mb-3 leading-none tracking-tighter uppercase">
                    VISI
                  </h3>
                  <p className="text-[14px] lg:text-[16px] leading-relaxed font-medium opacity-95 tracking-tight">
                    Terwujudnya Insan yang Bertaqwa, Unggul dalam Prestasi, Berbudaya Lingkungan, dan Kompetitif di Era Global
                  </p>
                </div>

                {/* BLOK MISI (MENGGANTUNG TEPAT DI GARIS BAWAH GAMBAR) */}
                <div className="absolute bottom-0 right-0 translate-y-full w-[95%] lg:w-[63%] bg-[#587F93] text-white p-8 lg:p-12 z-40 rounded-xl rounded-tr-none antialiased">
                   <h3 className="text-[24px] lg:text-[36px] font-[900] mb-6 tracking-tight uppercase">
                    MISI
                  </h3>
                  <ul className="flex flex-col gap-4 text-[13px] lg:text-[16px] font-medium opacity-95 leading-relaxed tracking-tight">
                    <li className="flex gap-4 items-start">
                      <span className="flex-shrink-0 font-bold">1.</span>
                      <span>Melaksanakan pembelajaran dan bimbingan secara efektif, kreatif, dan inovatif.</span>
                    </li>
                    <li className="flex gap-4 items-start">
                      <span className="flex-shrink-0 font-bold">2.</span>
                      <span>Menumbuhkan semangat keunggulan dan kompetisi yang sehat kepada seluruh warga sekolah.</span>
                    </li>
                    <li className="flex gap-4 items-start">
                      <span className="flex-shrink-0 font-bold">3.</span>
                      <span>Menerapkan manajemen partisipatif dengan melibatkan seluruh warga sekolah dan komite.</span>
                    </li>
                  </ul>
                </div>
            </div>
        </div>

        {/* Background Area Informasi (Footer Strip) */}
        <div className="w-full h-[250px] lg:h-[450px] relative -mt-[150px] lg:-mt-[250px] z-10">
          <div 
            className="absolute inset-0 bg-[#587F93] flex items-end justify-center pb-12"
            style={{
              clipPath: 'polygon(0% 45%, 33.3% 45%, 33.3% 10%, 100% 10%, 100% 100%, 0% 100%)'
            }}
          >
          </div>
        </div>
      </motion.section>

      {/* 7. SECTION SARANA PRASARANA (SHOW OFF) */}
      <section className="py-24 bg-white font-urbanist border-t border-gray-100 -mt-10 lg:-mt-20 relative z-20">
        <div className="max-w-[1440px] mx-auto px-5 lg:px-[60px]">
          
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">

            {/* --- LEFT CONTENT (TEXT) --- */}
            <div className="w-full lg:w-1/3 flex flex-col items-start pt-4">
              <div className="flex items-center gap-4 mb-4">
                 <div className="w-12 h-[2px] bg-[#587F93]"></div>
                 <span className="text-[#587F93] font-bold uppercase tracking-widest text-sm">Fasilitas Sekolah</span>
              </div>

              <h2 className="text-[36px] lg:text-[48px] font-[900] text-black uppercase leading-[1.1] mb-6 tracking-tight">
                Sarana & <br/> Prasarana
              </h2>

              <p className="text-gray-500 text-[16px] leading-relaxed mb-10 max-w-md">
                Kami menyediakan lingkungan belajar yang kondusif dengan fasilitas modern untuk mendukung pengembangan potensi siswa secara maksimal.
              </p>

              <button
                onClick={() => navigate('/sarana-prasarana')}
                className="group flex items-center gap-4 text-black font-[800] text-[14px] uppercase tracking-wider hover:text-[#587F93] transition-colors"
              >
                <span className="border-b-2 border-black group-hover:border-[#587F93] pb-1 transition-colors">
                  Lihat Selengkapnya
                </span>
                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-300" />
              </button>
            </div>

            {/* --- RIGHT CONTENT (IMAGES) --- */}
            <div className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
              {facilities.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  className="group relative h-[280px] lg:h-[360px] overflow-hidden cursor-pointer bg-gray-100"
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/600x800?text=Fasilitas'; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#587F93]/90 via-[#587F93]/40 to-transparent transition-opacity duration-300 flex flex-col justify-center items-center p-8 text-center">
                    <span className="text-white/70 text-xs font-bold uppercase tracking-[0.2em] mb-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      {item.category}
                    </span>
                    <h3 className="text-white text-2xl font-[900] uppercase mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                      {item.title}
                    </h3>
                    <p className="text-white/90 text-sm leading-relaxed max-w-[250px] translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 8. SECTION ORGANISASI (NEW BLOCK) */}
      <section className="w-full py-16 bg-white font-urbanist overflow-hidden">
        {/* Menu Pills */}
        <div className="flex gap-3 mb-8 pl-5 lg:pl-[60px] overflow-x-auto no-scrollbar">
            {menuGrid.map((item, idx) => (
                <button 
                    key={idx} 
                    onClick={() => navigate(item.link)}
                    className="bg-[#587F93] text-white px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap shadow-md hover:bg-[#466575] transition-colors border border-white/20"
                >
                    {item.title}
                </button>
            ))}
        </div>

        {/* Blue Block Container - Start Mentok Kiri, Gap Kanan */}
        {/* w-[85%] artinya mengambil 85% lebar layar dari kiri, menyisakan 15% di kanan */}
        <div className="w-[90%] lg:w-[85%] bg-[#587F93] rounded-r-[50px] py-12 pr-8 relative shadow-2xl h-[400px] lg:h-[450px] flex items-center">
            
            {/* Pattern Overlay (Left Side) */}
            <div className="absolute top-0 bottom-0 left-0 w-[25%] opacity-10 pointer-events-none overflow-hidden rounded-l-none">
                 <svg width="100%" height="100%">
                    <defs>
                        <pattern id="pattern_grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <circle cx="20" cy="20" r="2" fill="white" />
                            <path d="M0 0 L40 40 M40 0 L0 40" stroke="white" strokeWidth="1" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#pattern_grid)" />
                 </svg>
            </div>

            {/* Content (Cards Grid) */}
            <div className="w-full pl-[5%] lg:pl-[20%] overflow-x-auto no-scrollbar">
                <div className="flex gap-6 pb-4 min-w-max">
                    {[1, 2, 3, 4].map((item) => (
                        <div key={item} className="w-[220px] h-[280px] lg:w-[260px] lg:h-[320px] bg-[#D9D9D9] rounded-[20px] shadow-inner shrink-0 hover:scale-105 transition-transform duration-300 cursor-pointer" />
                    ))}
                </div>
            </div>

            {/* Navigation Arrows */}
            <div className="absolute bottom-6 right-8 flex gap-3">
                <button className="bg-white text-[#587F93] p-2 rounded-full hover:bg-gray-100 transition shadow-lg active:scale-95">
                    <ArrowLeft size={20} />
                </button>
                <button className="bg-white text-[#587F93] p-2 rounded-full hover:bg-gray-100 transition shadow-lg active:scale-95">
                    <ArrowRight size={20} />
                </button>
            </div>
        </div>
      </section>

    </motion.div>
  );
};

export default ProfilSekolah;