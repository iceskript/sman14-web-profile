import React from 'react';
import { 
  Phone, 
  Mail, 
  ChevronRight 
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // MENGGUNAKAN API EMBED MODE "PLACE" AGAR MUNCUL PIN MERAH
  // "q" diisi nama tempat spesifik + koordinat untuk akurasi maksimal
  const mapUrl = "https://maps.google.com/maps?q=SMA%20Negeri%2014%20Samarinda&t=&z=15&ie=UTF8&iwloc=&output=embed";

  // Filter warna abu-abu gelap agar ikon terlihat jelas di bg putih saat diam
  const iconBaseFilter = 'invert(30%) sepia(10%) saturate(500%) hue-rotate(180deg) brightness(95%) contrast(90%)';

  return (
    <footer className="font-urbanist bg-white relative pt-10">
      
      {/* === GARIS PEMBATAS PROFESIONAL === */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-gray-400 to-transparent opacity-50 z-10"></div>
      <div className="absolute top-[2px] left-0 w-full h-6 bg-gradient-to-b from-gray-100/80 to-transparent pointer-events-none z-10"></div>

      {/* --- BAGIAN ATAS: INFORMASI UTAMA --- */}
      <div className="py-16 text-gray-800">
        <div className="max-w-[1440px] mx-auto px-5 lg:px-[80px]">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 items-start">
            
            {/* 1. LOGO & ALAMAT */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <img 
                  src="/logo-smapas.svg" 
                  alt="Logo SMA 14" 
                  className="w-16 h-auto"
                />
                <div>
                  <h2 className="text-[20px] font-black leading-tight uppercase tracking-tight text-gray-900">
                    SMA <br /> Negeri 14 <br /> Samarinda
                  </h2>
                </div>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed max-w-[280px]">
                Jl. Rapak Indah, Karang Asam Ilir <br />
                Kec. Sungai Kunjang, Kota Samarinda, <br />
                Kalimantan Timur
              </p>
            </div>

            {/* 2. LINK ALTERNATIF */}
            <div>
              <h3 className="text-lg font-bold mb-6 text-gray-900">Link Alternatif</h3>
              <ul className="space-y-4">
                {['Beranda', 'Kontak', 'Sosmed', 'Fasilitas'].map((item) => (
                  <li key={item}>
                    <a 
                      href={item === 'Beranda' ? "/" : item === 'Kontak' ? "/kontak" : item === 'Fasilitas' ? "/profil#sarana-prasarana" : `#${item.toLowerCase()}`} 
                      onClick={(e) => {
                        if (item === 'Beranda') {
                          e.preventDefault();
                          navigate('/');
                          // Memastikan scroll ke paling atas (0,0) dengan transisi halus.
                          // Timeout 0 memastikan ini berjalan setelah siklus navigasi dimulai.
                          setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0);
                        } else if (item === 'Kontak') {
                          e.preventDefault();
                          navigate('/kontak');
                          setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 0);
                        } else if (item === 'Fasilitas') {
                          e.preventDefault();
                          navigate('/profil');
                          setTimeout(() => {
                            const element = document.getElementById('sarana-prasarana');
                            if (element) element.scrollIntoView({ behavior: 'smooth' });
                          }, 100);
                        }
                      }}
                      className="flex items-center gap-2 text-gray-500 hover:text-[#587F93] transition-all group cursor-pointer">
                      <ChevronRight size={18} className="text-gray-400 group-hover:translate-x-1 transition-transform" />
                      <span>{item}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* 3. KONTAK & IKUTI KAMI */}
            <div className="space-y-8">
              <div id="kontak">
                <h3 className="text-lg font-bold mb-6 text-gray-900">Kontak</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-500">
                    <Phone size={18} className="text-[#587F93]" />
                    <span>0812-2995-9922</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-500">
                    <Mail size={18} className="text-[#587F93]" />
                    <span>sman14.smapas@gmail.com</span>
                  </div>
                </div>
              </div>
              
              <div id="sosmed">
                <h3 className="text-lg font-bold mb-4 text-gray-900">Ikuti Kami</h3>
                <div className="flex gap-4">
                  {/* Instagram */}
                  <a href="https://www.instagram.com/sman14samarinda/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-full transition-all duration-300 shadow-sm group hover:bg-[#E1306C]">
                    <img 
                      src="/ig-logo.svg" 
                      alt="Instagram" 
                      className="w-5 h-5 transition-all duration-300 opacity-70 group-hover:opacity-100 group-hover:brightness-0 group-hover:invert" 
                      style={{ filter: iconBaseFilter }}
                      onMouseEnter={(e) => e.currentTarget.style.filter = 'none'}
                      onMouseLeave={(e) => e.currentTarget.style.filter = iconBaseFilter}
                    />
                  </a>
                  {/* TikTok */}
                  <a href="https://www.tiktok.com/@osismapas" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-full transition-all duration-300 shadow-sm group hover:bg-black">
                    <img 
                      src="/tt-logo.svg" 
                      alt="TikTok" 
                      className="w-5 h-5 transition-all duration-300 opacity-70 group-hover:opacity-100 group-hover:brightness-0 group-hover:invert" 
                      style={{ filter: iconBaseFilter }}
                      onMouseEnter={(e) => e.currentTarget.style.filter = 'none'}
                      onMouseLeave={(e) => e.currentTarget.style.filter = iconBaseFilter}
                    />
                  </a>
                  {/* Youtube */}
                  <a href="https://www.youtube.com/@SMAPAS" target="_blank" rel="noopener noreferrer" className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-full transition-all duration-300 shadow-sm group hover:bg-[#FF0000]">
                    <img 
                      src="/yt-logo.svg" 
                      alt="Youtube" 
                      className="w-5 h-5 transition-all duration-300 opacity-70 group-hover:opacity-100 group-hover:brightness-0 group-hover:invert" 
                      style={{ filter: iconBaseFilter }}
                      onMouseEnter={(e) => e.currentTarget.style.filter = 'none'}
                      onMouseLeave={(e) => e.currentTarget.style.filter = iconBaseFilter}
                    />
                  </a>
                  {/* Facebook */}
                  <a href="#https://www.instagram.com/sman14samarinda/" className="w-10 h-10 flex items-center justify-center bg-gray-50 rounded-full transition-all duration-300 shadow-sm group hover:bg-[#1877F2]">
                    <img 
                      src="/fb-logo.svg" 
                      alt="Facebook" 
                      className="w-5 h-5 transition-all duration-300 opacity-70 group-hover:opacity-100 group-hover:brightness-0 group-hover:invert" 
                      style={{ filter: iconBaseFilter }}
                      onMouseEnter={(e) => e.currentTarget.style.filter = 'none'}
                      onMouseLeave={(e) => e.currentTarget.style.filter = iconBaseFilter}
                    />
                  </a>
                </div>
              </div>
            </div>

            {/* 4. GOOGLE MAPS (DIPERBESAR & ADA PIN) */}
            <div className="w-full lg:pl-4">
              <div className="flex flex-col items-start w-full">
                <h3 className="text-[13px] font-[800] uppercase tracking-wider mb-4 text-gray-900 leading-none">
                  LOKASI SMA NEGERI 14 SAMARINDA
                </h3>
                {/* UPDATE: Tinggi h-[220px] (lebih besar) & shadow-lg (bayangan lebih tebal) */}
                <div className="w-full h-[220px] rounded-xl overflow-hidden shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                  <iframe 
                    src={mapUrl}
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Peta Lokasi SMAN 14 Samarinda"
                  ></iframe>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* --- BAWAH: COPYRIGHT --- */}
      <div className="bg-gray-50 py-6 text-center border-t border-gray-100">
        <div className="max-w-[1440px] mx-auto px-5">
          <p className="text-gray-400 text-[14px] font-medium tracking-wide">
            © Copyright <span className="font-bold uppercase tracking-tight text-gray-600">SMA NEGERI 14 SAMARINDA</span>.All Rights Reserved. Developed by Iceskript
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;