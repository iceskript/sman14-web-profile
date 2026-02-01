import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Phone, Mail, Search, LogIn, ChevronDown, Menu, X } from 'lucide-react';

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  // Logika Deteksi Scroll (Utility Bar tetap terlihat saat scroll ke atas)
  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        if (window.innerWidth < 1024) {
          setIsVisible(true);
          return;
        }

        if (!isMobileMenuOpen) {
          if (window.scrollY > lastScrollY && window.scrollY > 42) {
            setIsVisible(false); // Sembunyikan Utility Bar
          } else {
            setIsVisible(true);  // Munculkan kembali
          }
        }
        setLastScrollY(window.scrollY);
      }
    };

    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY, isMobileMenuOpen]);

  const menuItems = [
    { name: 'BERANDA', dropdown: false, path: '/' },
    { 
      name: 'PROFIL', 
      dropdown: true, 
      items: [
        { label: 'Profil Sekolah', path: '/profil' },
        { label: 'Sejarah', path: '/profil' },
        { label: 'Visi & Misi', path: '/profil' },
        { label: 'Struktur Organisasi', path: '/profil' }
      ] 
    },
    { 
      name: 'BERITA', 
      dropdown: true, 
      items: [{ label: 'Berita Terbaru', path: '/' }, { label: 'Pengumuman', path: '/' }, { label: 'Agenda', path: '/' }] 
    },
    { 
      name: 'INFORMASI', 
      dropdown: true, 
      items: [{ label: 'Pendaftaran', path: '/' }, { label: 'Kurikulum', path: '/' }, { label: 'Fasilitas', path: '/' }] 
    },
    { 
      name: 'DATA', 
      dropdown: true, 
      items: [{ label: 'Data Guru', path: '/' }, { label: 'Data Siswa', path: '/' }, { label: 'Alumni', path: '/' }] 
    },
    { name: 'EKSTRAKURIKULER', dropdown: false, path: '/' },
    { name: 'GALERI', dropdown: false, path: '/' },
  ];

  return (
    <>
      {/* --- HEADER UTAMA --- */}
      <header 
        className={`fixed top-0 left-0 w-full font-urbanist bg-white shadow-md z-[100] transition-transform duration-500 ease-in-out ${
          !isVisible ? 'translate-y-[-42px]' : 'translate-y-0'
        }`}
      >
        
        {/* --- TOP BAR (Utility Bar) - Warna Abu-abu Sesuai Desain Awal --- */}
        <div className="hidden lg:block bg-[#EAEAEA] h-[42px] w-full border-b border-gray-200">
          <div className="max-w-[1440px] mx-auto h-full px-[60px] flex justify-between items-center text-[12px] font-bold text-[#333]">
            <div className="flex items-center gap-[25px]">
              <div className="flex items-center gap-[6px]">
                <Phone size={14} className="text-gray-700" />
                <span>0812-2995-9922</span>
              </div>
              <div className="flex items-center gap-[6px] border-l border-gray-400 pl-[25px]">
                <Mail size={14} className="text-gray-700" />
                <span className="lowercase">sman14.smapas@gmail.com</span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* --- SEARCH BAR DIKEMBALIKAN --- */}
              <div className="relative group">
                <input 
                  type="text" 
                  placeholder="search..." 
                  className="w-[180px] h-[28px] bg-white border border-gray-300 rounded-full px-4 pl-9 text-[11px] focus:outline-none focus:border-[#587F93] transition-all"
                />
                <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
              <button 
                onClick={() => navigate('/login')}
                className="bg-[#587F93] text-white px-4 h-[28px] rounded-full font-extrabold text-[11px] flex items-center gap-1.5 active:scale-95 shadow-sm hover:bg-[#587F93] transition-all"
              >
                <LogIn size={13} /> LOGIN
              </button>
            </div>
          </div>
        </div>

        {/* --- MAIN NAVBAR --- */}
        <nav className="h-[70px] lg:h-[90px] w-full border-b border-gray-100 bg-white">
          <div className="max-w-[1440px] mx-auto h-full px-5 lg:px-[60px] flex justify-between items-center">
            
            {/* Branding Logo */}
            <div className="flex items-center gap-[10px] lg:gap-[15px] cursor-pointer" onClick={() => handleNavigation('/')}>
              <div className="w-[45px] h-[45px] lg:w-[55px] lg:h-[55px] flex items-center justify-center shrink-0">
                <img src="/logo-smapas.svg" alt="Logo SMAN 14" className="max-w-full max-h-full object-contain" />
              </div>
              <div className="flex flex-col justify-center text-left">
                <h1 className="text-[16px] lg:text-[20px] font-[900] text-black leading-none uppercase tracking-tight">
                  SMAN 14 SAMARINDA
                </h1>
                <p className="text-[10px] lg:text-[12px] text-[#666] font-bold italic mt-[1px]">
                  Beriman, Berakhlak, Berprestasi
                </p>
              </div>
            </div>

            {/* Hamburger Button Mobile */}
            <button className="xl:hidden p-2 text-gray-700" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu size={32} />
            </button>

            {/* Menu Navigasi Desktop */}
            <ul className="hidden xl:flex items-center gap-[24px] text-[13px] font-[900] text-black uppercase tracking-tight h-full">
              {menuItems.map((menu) => (
                <li 
                  key={menu.name} 
                  className="relative group cursor-pointer flex items-center h-full"
                  onMouseEnter={() => menu.dropdown && setActiveDropdown(menu.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                  onClick={() => !menu.dropdown && handleNavigation(menu.path)}
                >
                  <div className="flex items-center gap-[3px] hover:text-[#587F93] transition-colors py-8">
                    {menu.name}
                    {menu.dropdown && <ChevronDown size={12} className="opacity-60" />}
                  </div>

                  {menu.dropdown && activeDropdown === menu.name && (
                    <ul className="absolute left-0 top-full w-[220px] bg-white shadow-xl border-t-4 border-[#587F93] py-2 z-50 animate-in fade-in slide-in-from-top-2">
                      {menu.items.map((sub) => (
                        <li 
                          key={sub.label} 
                          className="px-5 py-2.5 text-[12px] font-bold text-gray-700 hover:bg-gray-50 hover:text-[#587F93] transition-all border-b border-gray-50 last:border-none"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNavigation(sub.path);
                            setActiveDropdown(null);
                          }}
                        >
                          {sub.label}
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </header>

      {/* --- SIDEBAR MOBILE (Tetap Seperti Semula) --- */}
      <div 
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 xl:hidden z-[150] ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      <div className={`fixed top-0 right-0 h-full w-[85%] max-w-[350px] bg-white z-[200] shadow-2xl transition-transform duration-300 ease-in-out transform xl:hidden flex flex-col ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex justify-between items-center p-5 border-b border-gray-100 shrink-0">
           <img src="/logo-smapas.svg" alt="Logo" className="w-[40px] h-[40px]" onClick={() => { handleNavigation('/'); setIsMobileMenuOpen(false); }} />
           <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-gray-500"><X size={28} /></button>
        </div>

        <div className="flex-grow overflow-y-auto p-5">
           <ul className="flex flex-col gap-1">
             {menuItems.map((menu) => (
               <li key={menu.name} className="border-b border-gray-50 last:border-none">
                 <div 
                    className="flex justify-between items-center py-4 text-[14px] font-extrabold text-gray-800 uppercase" 
                    onClick={() => {
                      if (menu.dropdown) {
                        activeDropdown === menu.name ? setActiveDropdown(null) : setActiveDropdown(menu.name);
                      } else {
                        handleNavigation(menu.path);
                        setIsMobileMenuOpen(false);
                      }
                    }}
                 >
                    {menu.name}
                    {menu.dropdown && <ChevronDown size={18} className={`${activeDropdown === menu.name ? 'rotate-180' : ''}`} />}
                 </div>

                 {menu.dropdown && activeDropdown === menu.name && (
                   <ul className="bg-gray-50 rounded-lg mb-4">
                     {menu.items?.map((sub) => (
                       <li key={sub.label} className="py-3 px-6 text-[12px] font-bold text-gray-600 active:text-[#587F93]" onClick={() => { handleNavigation(sub.path); setIsMobileMenuOpen(false); }}>
                         {sub.label}
                       </li>
                     ))}
                   </ul>
                 )}
               </li>
             ))}
           </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;