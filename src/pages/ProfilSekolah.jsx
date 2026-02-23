import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ArrowRight, ArrowLeft, Download, ChevronRight, Award, FileText } from 'lucide-react'; 
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchSaranaPrasarana, fetchSertifikat, urlFor, client } from '../lib/sanity';

const ProfilSekolah = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);
  const [saranaPrasaranaData, setSaranaPrasaranaData] = useState([]);
  const [sertifikatData, setSertifikatData] = useState([]);
  const [isLoadingFacilities, setIsLoadingFacilities] = useState(true);
  const [isLoadingSertifikat, setIsLoadingSertifikat] = useState(true);
  
  // State untuk Tab Aktif di Section Organisasi
  const [activeTab, setActiveTab] = useState("Struktur Organisasi");

  useEffect(() => {
    const loadData = async () => {
      try {
        const facilities = await fetchSaranaPrasarana();
        setSaranaPrasaranaData(facilities);
        setIsLoadingFacilities(false);
      } catch (error) {
        console.error('Gagal memuat sarana prasarana:', error);
        setIsLoadingFacilities(false);
      }

      try {
        // Menggunakan query langsung agar file URL ter-dereference untuk sertifikat
        const query = `*[_type == "sertifikat"]{
          ...,
          "fileUrl": filePDF.asset->url
        }`;
        const sertifikat = await client.fetch(query);
        setSertifikatData(sertifikat);
        setIsLoadingSertifikat(false);
      } catch (error) {
        console.error('Gagal memuat sertifikat:', error);
        setIsLoadingSertifikat(false);
      }
    };

    loadData();
  }, []);

  // Logika Scroll ke Section berdasarkan Hash (#)
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  // Ref untuk mengontrol scroll horizontal konten organisasi
  const scrollRef = useRef(null);

  // Data Sarana Prasarana
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

  // Data Konten Dinamis untuk Section Organisasi
  const organizationContent = {
    "Struktur Organisasi": {
      type: "text",
      title: "STRUKTUR ORGANISASI",
      subtitle: "Struktur Organisasi SMAN 14 Samarinda",
      desc: "Menampilkan bagan kepemimpinan dan tata kelola sekolah yang transparan dan akuntabel untuk mewujudkan visi sekolah.",
      link: "/struktur-organisasi"
    },
    "Wakil Kepala Bidang Pendidikan": {
      type: "grid",
      title: "WAKIL KEPALA",
      subtitle: "Bidang Pendidikan",
      desc: "Tim pimpinan yang berdedikasi dalam mengelola kurikulum, kesiswaan, serta sarana dan prasarana sekolah.",
      members: [
        { name: "Waka Kurikulum", img: "/waka1.webp", link: "/waka1" },
        { name: "Waka Kesiswaan", img: "/waka2.jpeg", link: "/waka2" },
        { name: "Waka Sarana Prasarana", img: "/waka3.jpeg", link: "/waka3" },
        { name: "Koordinator Humas", img: "/waka4.jpeg", link: "/waka4" },
      ]
    },
    "Tenaga Administrasi Sekolah": {
      type: "grid",
      title: "TENAGA ADMINISTRASI",
      subtitle: "Unit Tata Usaha SMAN 14 Samarinda",
      desc: "Mendukung operasional sekolah melalui layanan administrasi yang profesional, cepat, dan transparan.",
      members: [
        { name: "Kepala TAS", img: "/tas1.jpeg", link: "/tas1" },
        { name: "Bendahara", img: "/bendahara.jpeg", link: "/tas2" },
      ]
    },
    "Komite Sekolah": {
      type: "grid",
      title: "KOMITE SEKOLAH",
      subtitle: "Mitra Strategis Pengembangan Sekolah",
      desc: "Wadah partisipasi masyarakat dan orang tua siswa dalam meningkatkan mutu pelayanan pendidikan.",
      members: [
        { name: "Komite Sekolah", img: "/komite1.png", link: "/komite" },
      ]
    },
  };

  const menuGrid = Object.keys(organizationContent);

  // --- LOGIKA NAVIGASI TOMBOL PANAH ---
  // Sekarang berfungsi untuk menggeser konten grid secara horizontal
  const handleNext = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
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
      <motion.div variants={itemVariants} className="max-w-[1440px] mx-auto px-5 lg:px-[60px] mb-12">
        <div className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">
          <span className="hover:text-[#587F93] cursor-pointer" onClick={() => navigate('/')}>Beranda</span>
          <ChevronRight size={14} />
          <span className="text-[#587F93]">Profil Sekolah</span>
        </div>
        <h1 className="text-[40px] lg:text-[56px] font-[900] text-black leading-none tracking-tight">
          Profil <span className="text-[#587F93]">Sekolah</span>
        </h1>
        <div className="w-20 h-1.5 bg-[#587F93] mt-6 rounded-full"></div>
      </motion.div>

      {/* 2. HERO SECTION */}
      <motion.section variants={itemVariants} className="relative w-full mb-24 lg:mb-40">
        <div className="w-full h-[350px] lg:h-[600px] overflow-hidden relative z-0 bg-gray-100 rounded-br-[60px] lg:rounded-br-[150px]">
          <img src="/gedung2.webp" alt="Gedung SMAN 14 Samarinda" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 pointer-events-none">
          <div className="max-w-[1440px] mx-auto h-full px-5 lg:px-[60px] relative">
            <div className="absolute -bottom-16 lg:-bottom-24 left-5 lg:left-[60px] w-[90%] lg:w-[51%] bg-[#587F93] text-white p-8 lg:p-14 rounded-br-[40px] lg:rounded-br-[100px] z-10 pointer-events-auto antialiased">
              <h2 className="text-[22px] lg:text-[32px] font-[800] mb-4 lg:mb-6 uppercase tracking-wider leading-tight">SMA Negeri 14 Samarinda</h2>
              <p className="text-[14px] lg:text-[16px] leading-relaxed opacity-95 text-justify font-medium">
                SMA Negeri 14 Samarinda adalah lembaga pendidikan menengah atas yang berdedikasi untuk mencetak generasi penerus bangsa yang cerdas, berkarakter, dan kompetitif.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 3. SECTION SAMBUTAN */}
      <motion.div variants={itemVariants} className="max-w-[1140px] mx-auto px-5 lg:px-0 relative z-20 mt-32 lg:mt-56">
        {/* Row: justify-content-center align-items-center */}
        <div className="flex flex-col lg:flex-row justify-center items-center gap-12 lg:gap-16 min-h-[376px]">
          
          {/* Column: col-md-5 col-12 */}
          <div className="w-full lg:w-5/12 flex justify-center lg:justify-end">
            {/* Card: about-itk-rektor-card (490x376) */}
            <div className="relative w-full max-w-[400px] aspect-[864/1184] bg-[#587F93] rounded-[40px] shadow-2xl flex-shrink-0 border-[12px] border-white overflow-hidden group">
              
              {/* Dekorasi Background Card */}
              <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(white 2px, transparent 2px)', backgroundSize: '20px 20px' }}></div>
              
              {/* Foto Kepala Sekolah - Dibuat object-cover agar memenuhi frame tanpa terpotong aneh */}
              <img 
                src="/kepsek1.webp" 
                alt="Kepala Sekolah" 
                className="absolute inset-0 w-full h-full object-contain object-bottom transition-transform duration-700 group-hover:scale-105"
              />

              {/* Overlay Gradient: Memberikan efek kedalaman dan menghaluskan bagian bawah foto */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#3D5A6A]/40 via-transparent to-transparent pointer-events-none"></div>

              {/* Badge Sambutan */}
              <div className="absolute top-8 left-0 bg-white text-[#587F93] px-6 py-2 rounded-r-full shadow-lg z-20">
                <span className="text-[14px] font-black uppercase tracking-widest">SAMBUTAN</span>
              </div>
            </div>
          </div>

          {/* Column: col-md-7 (Remaining space for text) */}
          <div className="w-full lg:w-7/12 flex flex-col items-start">
            <span className="text-[#587F93] text-[120px] font-serif leading-none h-[60px] opacity-30">“</span>
            <p className="text-sm lg:text-base text-[#334155] mb-10 leading-relaxed font-medium">
              Sebagai bagian dari upaya berkelanjutan dalam meningkatkan mutu pendidikan, saya memiliki misi agar kita sebagai pendidik senantiasa melakukan kolaborasi melalui berbagi pengetahuan (knowledge sharing). Saya yakin bahwa dengan saling bertukar data, metode pembelajaran, dan pengalaman, kita dapat bersama-sama meratakan kualitas pendidikan, tidak hanya di lingkungan SMA Negeri 14 Samarinda, tetapi juga sebagai kontribusi nyata bagi pendidikan di Indonesia.
            </p>
            <button onClick={() => setIsExpanded(!isExpanded)} className="bg-[#587F93] hover:bg-[#466575] text-white px-6 py-2.5 rounded-md font-bold flex items-center gap-4 active:scale-95 text-[14px] transition-all">
              {isExpanded ? 'Sembunyikan' : 'Selengkapnya'}
              <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} className="bg-white text-[#587F93] p-1 rounded-full"><ChevronDown size={18} /></motion.div>
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
            className="overflow-hidden bg-[#587F93] text-white mt-16 lg:mt-32"
          >
            <div className="max-w-[1440px] mx-auto px-5 lg:px-[60px] py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
              
              {/* Kolom Kiri */}
              <div className="flex flex-col gap-6">
                <h3 className="text-[20px] lg:text-[24px] font-[800] tracking-tight">
                  Sambutan Kepala SMA Negeri 14 Samarinda
                </h3>
                <p className="text-[14px] lg:text-[16px] leading-relaxed font-medium opacity-95 text-justify">
                  Sebagai bagian dari upaya berkelanjutan dalam meningkatkan mutu pendidikan, saya memiliki misi agar kita sebagai pendidik senantiasa melakukan kolaborasi melalui berbagi pengetahuan (knowledge sharing) dalam rangka meratakan kualitas pendidikan yang ada di Indonesia.
                </p>
                <p className="text-[14px] lg:text-[16px] leading-relaxed font-medium opacity-95 text-justify">
                  Adapun program yang menjadi rencana besar bagi SMAN 14 Samarinda mencakup peningkatan kualitas akademik, inovasi pembelajaran berbasis teknologi, penguatan karakter siswa, dan penanaman wawasan lingkungan. Secara garis besar, rencana pembangunan sekolah kita dirancang untuk menciptakan ekosistem pendidikan yang unggul, adaptif, dan berprestasi.
                </p>
              </div>

              {/* Kolom Kanan */}
              <div className="flex flex-col gap-6 lg:pt-14">
                <p className="text-[14px] lg:text-[16px] leading-relaxed font-medium opacity-95 text-justify">
                  Saya melihat potensi besar yang ada di SMA Negeri 14 Samarinda sebagai salah satu pilar pendidikan menengah. Ini merupakan kesempatan emas bagi kita untuk menjadi lembaga penghasil SDM yang bermanfaat dan membanggakan. Untuk itu, kami memohon dukungan dan kerjasama semua stakeholder untuk ikut membangun SMAN 14 Samarinda demi kemajuan pendidikan di masa depan.
                </p>
                <p className="text-[14px] lg:text-[16px] leading-relaxed font-medium opacity-95">
                  Beriman, Berakhlak, dan Berprestasi.
                </p>
                <div className="mt-6 flex flex-col pt-4">
                  <p className="font-[800] text-[15px] lg:text-[17px]">
                    Kepala SMA Negeri 14 Samarinda,
                  </p>
                  <p className="font-[800] text-[15px] lg:text-[17px]">
                    Syawal Arifin, S.S., M.Pd.
                  </p>
                </div>
              </div>

            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* 5. BOTTOM SHAPE SECTION (VISI MISI) */}
      <motion.section id="visi-misi" variants={itemVariants} className="relative w-full pt-20 lg:pt-32 pb-24 lg:pb-80 flex flex-col items-center scroll-mt-32">
        <div className="relative z-20 w-full max-w-[1440px] mx-auto px-5 lg:px-[60px]">
            <div className="relative w-full flex flex-col lg:block">
                <div className="w-full h-[250px] lg:h-[550px] overflow-hidden rounded-2xl lg:rounded-none">
                  <img src="/gedung2.webp" alt="Gedung SMAN 14 Samarinda" className="w-full h-full object-cover" />
                </div>
                <div className="mt-8 lg:mt-0 lg:absolute lg:bottom-12 lg:left-0 lg:max-w-[450px] lg:bg-[#587F93]/85 lg:backdrop-blur-md lg:text-white p-0 lg:p-10 rounded-xl lg:z-30">
                  <h3 className="text-[24px] lg:text-[42px] font-[900] mb-3 leading-none tracking-tighter uppercase text-[#587F93] lg:text-white">VISI</h3>
                  <p className="text-[14px] lg:text-[16px] leading-relaxed font-medium tracking-tight text-gray-700 lg:text-white lg:opacity-95">Terwujudnya Insan yang Bertaqwa, Unggul dalam Prestasi, Berbudaya Lingkungan, dan Kompetitif di Era Global</p>
                </div>
                <div className="mt-10 lg:mt-0 lg:absolute lg:bottom-0 lg:right-0 lg:translate-y-full lg:w-[63%] lg:bg-[#587F93] lg:text-white p-0 lg:p-12 lg:z-40 lg:rounded-xl lg:rounded-tr-none antialiased">
                   <h3 className="text-[24px] lg:text-[36px] font-[900] mb-6 tracking-tight uppercase text-[#587F93] lg:text-white">MISI</h3>
                   <ul className="flex flex-col gap-4 text-[13px] lg:text-[16px] font-medium leading-relaxed tracking-tight text-gray-700 lg:text-white lg:opacity-95">
                    <li className="flex gap-4 items-start"><span className="flex-shrink-0 font-bold text-[#587F93] lg:text-white">1.</span><span>Melaksanakan pembelajaran dan bimbingan secara efektif, kreatif, dan inovatif.</span></li>
                    <li className="flex gap-4 items-start"><span className="flex-shrink-0 font-bold text-[#587F93] lg:text-white">2.</span><span>Menumbuhkan semangat keunggulan dan kompetisi yang sehat kepada seluruh warga sekolah.</span></li>
                    <li className="flex gap-4 items-start"><span className="flex-shrink-0 font-bold text-[#587F93] lg:text-white">3.</span><span>Menerapkan manajemen partisipatif dengan melibatkan seluruh warga sekolah dan komite.</span></li>
                  </ul>
                </div>
            </div>
        </div>
        <div className="hidden lg:block w-full h-[450px] relative lg:-mt-[250px] z-10">
          <div className="absolute inset-0 bg-[#587F93] flex items-end justify-center pb-12" style={{ clipPath: 'polygon(0% 45%, 33.3% 45%, 33.3% 10%, 100% 10%, 100% 100%, 0% 100%)' }}></div>
        </div>
      </motion.section>

      {/* 6. SECTION SARANA PRASARANA */}
      <section id="sarana-prasarana" className="py-24 bg-white font-urbanist border-t border-gray-100 -mt-10 lg:-mt-20 relative z-20 scroll-mt-32">
        <div className="max-w-[1440px] mx-auto px-5 lg:px-[60px]">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
            <div className="w-full lg:w-1/3 flex flex-col items-start pt-4">
              <div className="flex items-center gap-4 mb-4">
                 <div className="w-12 h-[2px] bg-[#587F93]"></div>
                 <span className="text-[#587F93] font-bold uppercase tracking-widest text-sm">Fasilitas Sekolah</span>
              </div>
              <h2 className="text-[36px] lg:text-[48px] font-[900] text-black uppercase leading-[1.1] mb-6 tracking-tight">Sarana & <br/> Prasarana</h2>
              <p className="text-gray-500 text-[16px] leading-relaxed mb-10 max-w-md">Kami menyediakan lingkungan belajar yang kondusif dengan fasilitas modern untuk mendukung pengembangan potensi siswa secara maksimal.</p>
              <button onClick={() => navigate('/galeri', { state: { filter: 'fasilitas' } })} className="group flex items-center gap-4 text-black font-[800] text-[14px] uppercase tracking-wider hover:text-[#587F93] transition-colors">
                <span className="border-b-2 border-black group-hover:border-[#587F93] pb-1 transition-colors">Lihat Selengkapnya</span>
                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-300" />
              </button>
            </div>
            <div className="w-full lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
              {isLoadingFacilities ? (
                <p className="col-span-2 text-gray-500">Memuat data fasilitas...</p>
              ) : (
                saranaPrasaranaData.slice(0, 4).map((item, index) => (
                  <motion.div key={item._id} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.2, duration: 0.6 }} className="group relative h-[280px] lg:h-[360px] overflow-hidden cursor-pointer bg-gray-100 shadow-lg">
                    {item.foto && (
                      <img src={urlFor(item.foto).width(600).height(500).url()} alt={item.nama} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#587F93]/90 via-[#587F93]/40 to-transparent transition-opacity duration-300 flex flex-col justify-center items-center p-8 text-center">
                      <span className="text-white/70 text-xs font-bold uppercase tracking-[0.2em] mb-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">{item.kategori}</span>
                      <h3 className="text-white text-2xl font-[900] uppercase mb-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">{item.nama}</h3>
                      <p className="text-white/90 text-sm leading-relaxed max-w-[250px] translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">{item.deskripsi}</p>
                    </div>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 7. SECTION ORGANISASI */}
      <section id="organisasi" className="w-full py-16 bg-white font-urbanist overflow-hidden scroll-mt-32">
        
        {/* Menu Pills */}
        <div className="max-w-[1440px] mx-auto flex flex-wrap gap-3 lg:gap-4 mb-10 px-5 lg:px-[60px]">
            {menuGrid.map((item) => (
                <button 
                    key={item} 
                    onClick={() => setActiveTab(item)}
                    className={`px-5 lg:px-8 py-2.5 lg:py-3 rounded-full text-[12px] lg:text-sm font-[800] shadow-lg transition-all duration-300 border-2 uppercase tracking-tight whitespace-nowrap ${
                      activeTab === item 
                      ? 'bg-white text-[#587F93] border-[#587F93]' 
                      : 'bg-[#587F93] text-white border-[#587F93] hover:bg-white hover:text-[#587F93]'
                    }`}
                >
                    {item}
                </button>
            ))}
        </div>

        {/* Blue Block Container Wrapper */}
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative min-h-[550px] lg:min-h-[500px] flex items-center w-full"
          >
            {/* Background Layer */}
            <div 
                className="absolute inset-y-0 bg-[#587F93] rounded-r-none lg:rounded-r-[40px] shadow-2xl overflow-hidden transition-none [--right-gap:0px] lg:[--right-gap:60px]"
                style={{ 
                    left: 'max(0px, 50vw - 1100px)',
                    right: 'calc(max(0px, 50vw - 720px) + var(--right-gap))' 
                }}
            >
                <div className="absolute top-0 bottom-0 left-0 w-[30%] opacity-10 pointer-events-none">
                 <svg width="100%" height="100%">
                    <defs>
                        <pattern id="pattern_grid_org" width="40" height="40" patternUnits="userSpaceOnUse">
                            <circle cx="20" cy="20" r="1.5" fill="white" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#pattern_grid_org)" />
                 </svg>
                </div>
            </div>

            {/* Content Layer */}
            <div className="relative z-20 w-full max-w-[1440px] mx-auto px-5 lg:px-[60px] py-16 lg:py-20">
                <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-start">
                    <div className={`w-full ${organizationContent[activeTab].type === "text" ? "lg:w-2/3" : "lg:w-1/2"} flex flex-col items-start`}>
                      <h2 className="text-[28px] lg:text-[54px] font-[900] text-white leading-tight mb-4 uppercase tracking-tight">
                        {organizationContent[activeTab].title}
                      </h2>
                      <p className="text-white/70 text-[14px] lg:text-[18px] font-medium mb-6 lg:mb-8 pl-2">
                        {organizationContent[activeTab].subtitle}
                      </p>
                      
                      {organizationContent[activeTab].desc && (
                        <p className="text-white/90 text-[16px] lg:text-[22px] leading-relaxed font-medium italic mb-10 pl-2">
                          {organizationContent[activeTab].desc}
                        </p>
                      )}
                      
                      {organizationContent[activeTab].type === "text" && (
                        <button 
                          onClick={() => {
                            navigate(organizationContent[activeTab].link);
                            window.scrollTo(0, 0);
                          }}
                          className="group flex items-center gap-4 text-white font-bold text-sm uppercase tracking-widest border-b-2 border-white/30 pb-1 hover:border-white transition-all mt-2 ml-2"
                        >
                          Selengkapnya 
                          <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform duration-300" />
                        </button>
                      )}
                    </div>

                    <div className="w-full lg:w-1/2">
                      {organizationContent[activeTab].type === "grid" && (
                        <div ref={scrollRef} className="flex gap-6 overflow-x-auto no-scrollbar pb-6 pl-2 pr-10 lg:pr-32 scroll-smooth">
                          {organizationContent[activeTab].members.map((member, i) => (
                            <div key={i} className="flex-shrink-0 flex flex-col items-center gap-4 group">
                              <div className="w-[180px] h-[220px] lg:w-[210px] lg:h-[270px] bg-white/10 backdrop-blur-md overflow-hidden relative rounded-sm">
                                 <img 
                                   src={member.img} 
                                   alt={member.name} 
                                   className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                                 />
                              </div>
                              <span className="text-white font-[800] text-[11px] lg:text-xs uppercase tracking-wider text-center">
                                {member.name}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                </div>

                {/* --- NAVIGATION ARROWS (POJOK KANAN BAWAH) --- */}
                {organizationContent[activeTab].type === "grid" && (
                  <div className="absolute bottom-6 right-14 lg:bottom-10 lg:right-[100px] z-30 flex gap-3">
                      <button 
                        onClick={handlePrev}
                        className="group flex items-center justify-center w-8 h-8 lg:w-10 lg:h-10 border border-white/40 text-white rounded-full hover:bg-white/10 transition-all duration-300 active:scale-90 backdrop-blur-sm"
                      >
                          <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-0.5" />
                      </button>
                      <button 
                        onClick={handleNext}
                        className="group flex items-center justify-center w-8 h-8 lg:w-10 lg:h-10 bg-white text-[#587F93] rounded-full hover:bg-white/90 border border-white transition-all duration-300 active:scale-90 shadow-lg"
                      >
                          <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
                      </button>
                  </div>
                )}
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* 9. SECTION SERTIFIKAT / AKREDITASI */}
      <motion.section 
        className="w-full mb-24 lg:mb-40"
      >
        <div className="relative w-full py-24 lg:py-32 bg-[#3D5A6A] rounded-none rounded-bl-[80px] lg:rounded-bl-[150px] flex flex-col items-center justify-center overflow-hidden shadow-2xl">
          {/* Background Image Layer (Subtle) */}
          <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
            <img src="/gedung2.webp" alt="" className="w-full h-full object-cover grayscale" />
          </div>

          {/* Dekorasi Background (Titik-titik halus) */}
          <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(white 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>
          </div>

          {/* Sertifikat Grid */}
          <div className="relative z-10 w-full max-w-[1440px] mx-auto px-5 lg:px-[60px]">

            {isLoadingSertifikat ? (
              <p className="text-white text-center">Memuat sertifikat...</p>
            ) : (
              <div className="flex flex-wrap justify-center gap-8 lg:gap-10">
                {sertifikatData.map((item) => (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="group relative w-full max-w-[650px] aspect-[297/210] bg-[#FFFCF5] rounded-xl shadow-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-2 border border-gray-200"
                  >
                    {/* Content Layer (Paper Look) */}
                    {item.foto ? (
                      <div className="absolute inset-0 transition-all duration-500 group-hover:blur-[2px] group-hover:opacity-60">
                        <img 
                          src={urlFor(item.foto).width(600).height(420).url()} 
                          alt={item.nama} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 lg:p-10 text-center transition-all duration-500 group-hover:blur-[2px] group-hover:opacity-60">
                          
                          {/* Decorative Border (Certificate Frame) */}
                          <div className="absolute inset-3 border-[3px] border-double border-[#3D5A6A]/20 pointer-events-none"></div>
                          <div className="absolute inset-2 border border-[#3D5A6A]/10 pointer-events-none"></div>

                          {/* Decorative Header */}
                          <div className="w-14 h-14 lg:w-16 lg:h-16 mb-4 rounded-full bg-[#3D5A6A]/10 flex items-center justify-center text-[#3D5A6A]">
                              <Award size={32} strokeWidth={1.5} />
                          </div>
                          
                          <h3 className="text-[#3D5A6A] font-[900] text-lg lg:text-2xl uppercase tracking-widest leading-tight mb-2 line-clamp-2 px-8">
                              {item.nama}
                          </h3>
                          
                          <div className="w-20 h-1 bg-[#3D5A6A]/20 rounded-full my-4"></div>

                          {/* Fake Text Lines for Document Feel */}
                          <div className="w-full max-w-[70%] space-y-3 opacity-10 mt-2">
                              <div className="h-2 bg-black rounded-full w-full mx-auto"></div>
                              <div className="h-2 bg-black rounded-full w-5/6 mx-auto"></div>
                          </div>
                          
                          {/* Watermark/Icon Bottom Right */}
                          <div className="absolute bottom-4 right-6 opacity-5 rotate-[-15deg]">
                              <Award size={64} />
                          </div>
                      </div>
                    )}
                    
                    {/* Hover Overlay Layer */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 z-20 bg-[#3D5A6A]/20 backdrop-blur-[2px]">
                        {item.fileUrl ? (
                            <a 
                                href={`${item.fileUrl}?dl=`}
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-[#3D5A6A] text-white px-8 py-3 rounded-full font-bold text-sm uppercase tracking-widest hover:bg-[#2c424e] shadow-xl flex items-center gap-2"
                            >
                                <Download size={18} />
                                Unduh PDF
                            </a>
                        ) : (
                            <span className="bg-gray-500 text-white px-4 py-2 rounded-full text-xs font-bold">Tidak Tersedia</span>
                        )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </motion.section>

      {/* CSS Global untuk menyembunyikan scrollbar */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

    </motion.div>
  );
};

export default ProfilSekolah;