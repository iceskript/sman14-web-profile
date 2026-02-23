import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
const VisiMisi = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const dataVisiMisi = [
    {
      title: "Unggul Berprestasi",
      desc: "Menghasilkan lulusan yang kompetitif di bidang akademik maupun non-akademik di tingkat nasional.",
      img: "/unggul.webp", 
    },
    {
      title: "Berwawasan Lingkungan",
      desc: "Menciptakan budaya sekolah yang peduli dan berbudaya lingkungan hidup secara berkelanjutan.",
      img: "/berwawasan.webp",
    },
    {
      title: "Berkarakter",
      desc: "Membentuk kepribadian siswa yang beriman, bertaqwa, dan menjunjung tinggi nilai luhur budi pekerti.",
      img: "/berkarakter.webp",
    },
  ];

  return (
    <section className="py-24 bg-white font-urbanist w-full overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-5 lg:px-[60px]">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[28px] lg:text-[36px] font-[900] text-[#333] tracking-tight uppercase"
          >
            FOKUS PENDIDIKAN
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 60 }}
            viewport={{ once: true }}
            className="h-1 bg-[#587F93] mx-auto mt-4 rounded-full" 
          />
        </div>

        {/* Container Utama: 
            - Menggunakan rounded-[40px] agar lebih elegan
            - Gambar tetap nyambung (tidak ada gap antar kartu)
            - Overflow hidden untuk memotong sudut gambar di dalam
        */}
        <div className="flex flex-col lg:flex-row h-[600px] w-full bg-gray-900 rounded-[40px] overflow-hidden">
          {dataVisiMisi.map((item, index) => (
            <div
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative h-full overflow-hidden border-b lg:border-b-0 lg:border-r border-white/10 last:border-none cursor-pointer transition-[flex] duration-700 ease-[0.32,0.72,0,1]"
              style={{
                flex: hoveredIndex === index ? 5 : 1, 
              }}
            >
              {/* Image Layer */}
              <div className="absolute inset-0">
                <img 
                  src={item.img} 
                  alt={item.title}
                  className="w-full h-full object-cover"
                  style={{ 
                    transform: hoveredIndex === index ? 'scale(1.05)' : 'scale(1.1)',
                    filter: hoveredIndex === index ? 'brightness(1) grayscale(0%)' : 'brightness(0.9) grayscale(10%)',
                    transition: 'transform 1.2s ease-out, filter 0.8s ease-in-out'
                  }}
                />
                {/* Overlay Gradasi Biru Khas Sekolah */}
                <div 
                  className="absolute inset-0 transition-opacity duration-700" 
                  style={{ 
                    background: 'linear-gradient(to bottom, rgba(88, 127, 147, 0.5), rgba(0, 0, 0, 0.7))',
                    opacity: hoveredIndex === index ? 0 : 1
                  }} 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Content Layer */}
              <div className="absolute inset-0 p-6 sm:p-10 lg:p-14 flex flex-col justify-end text-white pointer-events-none">
                
                <div className="relative z-10 w-full">
                  
                  {/* Judul: Tetap stabil dan tajam */}
                  <h3 
                    className={`font-[900] uppercase tracking-wider leading-tight transition-all duration-500 ${
                      hoveredIndex === index 
                        ? 'text-[24px] sm:text-[30px] lg:text-[38px] mb-2 lg:mb-4 text-white opacity-100' 
                        : 'text-[16px] lg:text-[20px] mb-0 text-white/40'
                    }`}
                  >
                    {item.title}
                  </h3>

                  {/* Deskripsi */}
                  <div className="h-32 sm:h-24 overflow-hidden">
                    <AnimatePresence>
                      {hoveredIndex === index && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.4, delay: 0.3 }}
                        >
                          <p className="text-[14px] sm:text-[15px] lg:text-[17px] font-medium leading-relaxed max-w-full lg:max-w-[450px] text-white/80 border-l-[3px] border-[#587F93] pl-4 sm:pl-5 py-1">
                            {item.desc}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisiMisi;