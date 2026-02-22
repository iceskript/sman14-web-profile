import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Sambutan = () => {
  const navigate = useNavigate();

  // Konfigurasi animasi dasar agar konsisten
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] }
  };

  return (
    <section id="sambutan" className="relative w-full py-16 lg:py-24 bg-[#F8FAFC] font-urbanist scroll-mt-24">
      <div className="max-w-[1440px] mx-auto px-5 lg:px-[80px]">
        
        <div className="relative flex flex-col lg:flex-row items-center gap-10 lg:gap-16 p-8 lg:p-14 rounded-3xl bg-white shadow-[0_35px_60px_-15px_rgba(0,0,0,0.15)] border border-gray-100">
          
          {/* SISI KIRI: Foto Kepala Sekolah */}
          <div className="relative w-full lg:w-1/2 flex justify-center">
            <div className="absolute w-4/5 h-4/5 bg-[#00B0F1]/10 blur-[100px] rounded-full -z-10" />
            
            <motion.div 
              {...fadeInUp}
              className="relative overflow-hidden rounded-2xl shadow-lg border-4 border-white bg-gray-50"
            >
              <img 
                src="/kepala-sekolah.webp" 
                alt="Syawal Arifin, S.S., M.Pd." 
                className="w-full h-auto object-cover max-h-[480px] hover:scale-105 transition-transform duration-700"
                onError={(e) => { e.target.src = "https://via.placeholder.com/600x800?text=Foto+Kepsek+SMA+14"; }}
              />
            </motion.div>
          </div>

          {/* SISI KANAN: Konten Teks Sambutan */}
          <motion.div 
            {...fadeInUp}
            transition={{ ...fadeInUp.transition, delay: 0.3 }} // Sedikit jeda setelah foto muncul
            className="w-full lg:w-1/2 flex flex-col justify-center text-left"
          >
            <h2 className="text-[30px] lg:text-[42px] font-[900] text-gray-900 leading-tight mb-2 capitalize tracking-tight">
              Syawal Arifin, S.S., M.Pd.
            </h2>
            
            <div className="w-16 h-1.5 bg-[#587F93] mb-6 rounded-full" />
            
            <p className="text-[#587F93] font-bold text-sm lg:text-base uppercase tracking-normal mb-8">
              Kepala SMA Negeri 14 Samarinda
            </p>

            <div className="space-y-5">
              <p className="text-gray-500 text-sm lg:text-base leading-relaxed italic">
                "Assalamu’alaikum Warahmatullahi Wabarakatuh,"
              </p>
              <p className="text-gray-700 text-sm lg:text-base leading-relaxed">
                Selamat datang di website resmi SMA Negeri 14 Samarinda. Platform ini hadir sebagai langkah nyata digitalisasi pendidikan kami untuk memberikan layanan informasi yang transparan, akurat, dan mudah diakses oleh seluruh masyarakat.
              </p>
              <p className="text-gray-700 text-sm lg:text-base leading-relaxed">
                Di era transformasi digital ini, kami berkomitmen mengintegrasikan teknologi dalam setiap proses pembelajaran guna memotivasi siswa dan membekali mereka dengan kompetensi yang relevan. Website ini adalah jendela utama untuk mengenal lebih jauh komitmen kami dalam mencetak generasi yang beriman, berakhlak, dan unggul dalam prestasi.
              </p>
            </div>

            <button 
              onClick={() => {
                navigate('/profil');
                window.scrollTo(0, 0);
              }}
              className="mt-10 group flex items-center gap-3 text-gray-900 font-[800] hover:text-[#587F93] transition-all w-fit"
            >
              <span className="border-b-2 border-gray-900 group-hover:border-[#587F93] pb-1">
                Profil SMA Negeri 14 Samarinda
              </span>
              <span className="text-xl group-hover:translate-x-2 transition-transform duration-300">
                →
              </span>
            </button>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Sambutan;