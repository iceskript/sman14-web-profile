import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Phone, Mail, Search, LogIn, ChevronDown, Menu, X } from 'lucide-react';
import { client, urlFor } from '../lib/sanity';

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  // --- 1. DEFINISI MENU (Dipindah ke atas agar bisa diakses Search Engine) ---
  const menuItems = [
    { name: 'BERANDA', dropdown: false, path: '/' },
    { 
      name: 'TENTANG', 
      dropdown: true, 
      items: [
        { label: 'Profil Sekolah', path: '/profil' },
        { label: 'Sarana dan Prasarana', path: '/profil#sarana-prasarana' },
        { label: 'Visi & Misi', path: '/profil#visi-misi' },
        { label: 'Struktur Organisasi', path: '/profil#organisasi' }
      ] 
    },
    { 
      name: 'BERITA', 
      dropdown: true, 
      items: [{ label: 'Daftar Berita', path: '/berita' }] 
    },
    { 
      name: 'INFORMASI', 
      dropdown: true, 
      items: [
        { label: 'Pendaftaran', path: '/pendaftaran' },
        { label: 'Kontak', path: '/kontak' }
      ] 
    },
    { 
      name: 'DATA', 
      dropdown: true, 
      items: [
        { label: 'Dewan Guru', path: '/dewan-guru' },
        { label: 'Tenaga Kependidikan', path: '/tenaga-kependidikan' }
      ] 
    },
    { name: 'EKSTRAKURIKULER', dropdown: false, path: '/ekstrakurikuler' },
    { name: 'GALERI', dropdown: false, path: '/galeri' },
  ];

  // --- 2. KATA KUNCI KONTEN & BAGIAN WEBSITE (Static Shortcuts) ---
  const staticShortcuts = [
    // Sinonim & Bagian Halaman
    { keys: ['sambutan', 'kepala', 'kepsek', 'syawal'], url: '/profil#sambutan', title: 'Sambutan Kepala Sekolah', type: 'Profil' },
    { keys: ['lokasi', 'alamat', 'telepon', 'map', 'peta'], url: '/#kontak', title: 'Kontak & Lokasi', type: 'Kontak' },
    { keys: ['program', 'unggulan', 'teknologi', 'life skill'], url: '/#program', title: 'Program Unggulan', type: 'Program' },
    { keys: ['prestasi', 'juara', 'lomba', 'pemenang'], url: '/#prestasi', title: 'Prestasi Siswa', type: 'Prestasi' },
    { keys: ['testimoni', 'alumni', 'kata mereka'], url: '/#testimoni', title: 'Testimoni Alumni', type: 'Alumni' },
    { keys: ['statistik', 'jumlah siswa', 'jumlah guru'], url: '/#statistik', title: 'Statistik Sekolah', type: 'Info' },
    { keys: ['ppdb', 'masuk', 'registrasi', 'daftar'], url: '/pendaftaran', title: 'Info Pendaftaran (PPDB)', type: 'Pendaftaran' },
    { keys: ['guru', 'pengajar', 'nip'], url: '/dewan-guru', title: 'Dewan Guru', type: 'Halaman' },
    { keys: ['staf', 'pegawai', 'tu', 'tata usaha', 'admin'], url: '/tenaga-kependidikan', title: 'Tenaga Kependidikan', type: 'Halaman' },
  ];

  // Logika Live Search (Autocomplete)
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchQuery.trim().length < 2) {
        setSuggestions([]);
        return;
      }

      const trimmedQuery = searchQuery.trim().toLowerCase();

      // A. Cari di MENU NAVIGASI (Otomatis)
      const menuMatches = [];
      menuItems.forEach(menu => {
        // Cek Menu Utama
        if (menu.name.toLowerCase().includes(trimmedQuery)) {
           if (!menu.dropdown) {
             menuMatches.push({ _id: `menu-${menu.name}`, title: menu.name, path: menu.path, _type: 'static', typeLabel: 'Menu' });
           }
        }
        // Cek Sub Menu
        if (menu.items) {
           menu.items.forEach(sub => {
              if (sub.label.toLowerCase().includes(trimmedQuery)) {
                 menuMatches.push({ _id: `menu-${sub.label}`, title: sub.label, path: sub.path, _type: 'static', typeLabel: 'Menu' });
              }
           });
        }
      });

      // B. Cari di STATIC SHORTCUTS (Konten Halaman)
      const staticMatches = staticShortcuts.filter(item => 
        item.keys.some(key => key.includes(trimmedQuery)) || 
        item.title.toLowerCase().includes(trimmedQuery)
      ).map(item => ({
        _id: `static-${item.url}`,
        _type: 'static',
        title: item.title,
        path: item.url,
        typeLabel: item.type
      }));

      try {
        const groqQuery = `*[
          (_type in ["berita", "galeri", "saranaPrasarana", "pendaftaran", "tenagaKependidikan", "dewanGuru"]) && 
          (judul match $searchTerm || nama match $searchTerm || posisi match $searchTerm || bidang match $searchTerm)
        ][0...5] {
          _id, _type,
          "title": coalesce(judul, nama),
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
        const data = await client.fetch(groqQuery, { searchTerm: `${searchQuery}*` });
        // Gabungkan hasil: Pintasan Halaman (Static) + Konten Database (Sanity)
        setSuggestions([...menuMatches, ...staticMatches, ...data]);
      } catch (err) {
        console.error("Search error:", err);
      }
    };

    const timer = setTimeout(fetchSuggestions, 300); // Debounce 300ms
    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Menutup dropdown saat klik di luar area search
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      const trimmedQuery = searchQuery.trim().toLowerCase();
      
      // Cek kecocokan langsung dengan Shortcut
      let directMatch = staticShortcuts.find(item => 
        item.keys.some(key => key === trimmedQuery || (trimmedQuery.length > 3 && key.startsWith(trimmedQuery)))
      );

      // Jika tidak ada di shortcut, cek di Menu Items
      if (!directMatch) {
        menuItems.forEach(menu => {
          if (menu.name.toLowerCase() === trimmedQuery && !menu.dropdown) directMatch = { url: menu.path };
          if (menu.items) {
            const sub = menu.items.find(s => s.label.toLowerCase() === trimmedQuery);
            if (sub) directMatch = { url: sub.path };
          }
        });
      }

      const shortcut = directMatch;

      if (shortcut) {
        // Jika cocok dengan pintasan, langsung buka halamannya
        handleNavigation(shortcut.url);
      } else {
        // Jika tidak, buka halaman hasil pencarian umum
        navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      }

      setSearchQuery('');
      setIsMobileMenuOpen(false);
      setShowSuggestions(false);
    }
  };

  const handleNavigation = (path) => {
    if (path.includes('#')) {
      const [pathname, hash] = path.split('#');
      navigate(pathname);
      // Beri jeda sedikit agar halaman termuat sebelum scroll ke elemen
      setTimeout(() => {
        const element = document.getElementById(hash);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    } else {
      navigate(path);
      window.scrollTo(0, 0);
    }
    setIsMobileMenuOpen(false);
    setShowSuggestions(false);
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
              <div className="relative group" ref={searchRef}>
                <input 
                  type="text" 
                  placeholder="search..." 
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowSuggestions(true);
                  }}
                  onKeyDown={handleSearch}
                  onFocus={() => searchQuery.length >= 2 && setShowSuggestions(true)}
                  className="w-[180px] h-[28px] bg-white border border-gray-300 rounded-full px-4 pl-9 text-[11px] focus:outline-none focus:border-[#587F93] transition-all"
                />
                <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                {/* Suggestions Dropdown Desktop */}
                {showSuggestions && searchQuery.length >= 2 && (
                  <div className="absolute top-full right-0 w-[280px] bg-white shadow-2xl rounded-xl mt-2 py-2 border border-gray-100 z-[110] overflow-hidden">
                    {suggestions.length > 0 ? (
                      suggestions.map((item) => (
                        <div 
                          key={item._id}
                          onClick={() => {
                            handleNavigation(item.path);
                            setSearchQuery('');
                            setShowSuggestions(false);
                          }}
                          className="px-4 py-2.5 hover:bg-gray-50 cursor-pointer flex items-center gap-3 transition-colors border-b border-gray-50 last:border-none"
                        >
                          <div className="w-8 h-8 rounded bg-gray-100 flex-shrink-0 overflow-hidden">
                            {item.foto ? (
                              <img src={urlFor(item.foto).width(50).height(50).url()} className="w-full h-full object-cover" />
                            ) : (
                              <Search size={12} className="m-auto text-gray-400" />
                            )}
                          </div>
                          <div className="text-left overflow-hidden">
                            <p className="text-[11px] font-bold text-gray-800 truncate">{item.title}</p>
                            <p className="text-[9px] text-[#587F93] font-black uppercase tracking-tighter">
                              {item._type === 'static' ? item.typeLabel : (item._type === 'saranaPrasarana' ? 'Fasilitas' : item._type === 'tenagaKependidikan' ? 'Tenaga Kependidikan' : item._type === 'dewanGuru' ? 'Dewan Guru' : item._type)}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-3 text-[11px] text-gray-400 font-bold text-center">
                        Tidak ada hasil...
                      </div>
                    )}
                  </div>
                )}
              </div>
              <Link 
                to="/login"
                className="bg-[#587F93] text-white px-4 h-[28px] rounded-full font-extrabold text-[11px] flex items-center gap-1.5 active:scale-95 shadow-sm hover:bg-[#587F93] transition-all cursor-pointer no-underline inline-flex items-center"
              >
                <LogIn size={13} /> LOGIN
              </Link>
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

    <div className={`fixed top-0 right-0 h-full w-[85%] max-w-[350px] bg-white z-[200] shadow-2xl transition-transform duration-300 ease-in-out transform xl:hidden flex flex-col font-urbanist ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex justify-between items-center p-5 border-b border-gray-100 shrink-0">
           <img src="/logo-smapas.svg" alt="Logo" className="w-[40px] h-[40px]" onClick={() => { handleNavigation('/'); setIsMobileMenuOpen(false); }} />
           <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-gray-500"><X size={28} /></button>
        </div>

        <div className="flex-grow overflow-y-auto p-5">
           {/* Mobile Search Bar */}
           <div className="relative mb-6">
             <input 
               type="text" 
               placeholder="Cari sesuatu..." 
               value={searchQuery}
               onChange={(e) => {
                 setSearchQuery(e.target.value);
                 setShowSuggestions(true);
               }}
               onKeyDown={handleSearch}
               className="w-full h-[45px] bg-gray-50 border border-gray-200 rounded-xl px-5 pl-12 text-sm focus:outline-none focus:border-[#587F93] transition-all font-bold"
             />
             <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />

             {/* Mobile Suggestions */}
             {showSuggestions && searchQuery.length >= 2 && suggestions.length > 0 && (
               <div className="absolute top-full left-0 w-full bg-white shadow-xl rounded-xl mt-2 py-1 border border-gray-100 z-[110] overflow-hidden">
                 {suggestions.map((item) => (
                   <div 
                     key={item._id}
                     onClick={() => {
                       handleNavigation(item.path);
                       setSearchQuery('');
                     }}
                     className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-center gap-4 transition-colors border-b border-gray-50 last:border-none"
                   >
                     <div className="w-10 h-10 rounded-lg bg-gray-100 flex-shrink-0 overflow-hidden">
                        {item.foto ? (
                          <img src={urlFor(item.foto).width(80).height(80).url()} className="w-full h-full object-cover" />
                        ) : (
                          <Search size={16} className="m-auto text-gray-400" />
                        )}
                     </div>
                     <div className="text-left overflow-hidden">
                       <p className="text-sm font-bold text-gray-800 truncate">{item.title}</p>
                       <p className="text-[10px] text-[#587F93] font-black uppercase tracking-widest">
                         {item._type === 'static' ? item.typeLabel : (item._type === 'saranaPrasarana' ? 'Fasilitas' : item._type === 'tenagaKependidikan' ? 'Tenaga Kependidikan' : item._type === 'dewanGuru' ? 'Dewan Guru' : item._type)}
                       </p>
                     </div>
                   </div>
                 ))}
               </div>
             )}
           </div>

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

        {/* Tombol Login Mobile di Bagian Bawah */}
        <div className="p-5 border-t border-gray-100 shrink-0">
          <Link 
            to="/login"
            onClick={() => setIsMobileMenuOpen(false)}
            className="w-full bg-[#587F93] text-white h-[50px] rounded-xl font-[900] text-[14px] flex items-center justify-center gap-3 active:scale-95 shadow-lg transition-all uppercase tracking-widest cursor-pointer no-underline"
          >
            <LogIn size={20} /> Login Admin
          </Link>
        </div>
      </div>
    </>
  );
};

export default Navbar;
