import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  // Variabel animasi untuk kontainer teks
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 1.2, 
        ease: [0.22, 1, 0.36, 1], 
        staggerChildren: 0.3 
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  // Variabel animasi untuk gambar latar belakang (Background)
  const backgroundVariants = {
    hidden: { scale: 1.1, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        duration: 2, // Durasi lebih lama agar terasa sinematik
        ease: [0.22, 1, 0.36, 1] 
      }
    }
  };

  return (
    <section className="relative w-full h-screen overflow-hidden font-urbanist bg-black select-none">
      
      {/* 1. Background Image dengan Animasi Zoom-In Perlahan */}
      <motion.img
        src="/gedung-smapas.webp"
        alt="gedung smapas"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 w-full h-full object-cover"
        loading = "eager"
        decoding = "async"
      />

      {/* 2. Overlay Gradasi Figma */}
      <div 
        className="absolute inset-0 opacity-80" 
        aria-hidden="true"
        style={{ 
          background: 'linear-gradient(90deg, #000000 0%, #00B0F1 100%)',
          mixBlendMode: 'multiply' 
        }} 
      />

      {/* 3. Konten Teks dengan Animasi */}
      <motion.header 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative max-w-[1440px] mx-auto h-full px-5 lg:px-[60px] flex flex-col justify-center items-start z-10"
      >
        <div className="max-w-[850px] w-full mt-24 lg:mt-32"> 
          
          <motion.h1 
            variants={itemVariants}
            className="text-[28px] md:text-[40px] lg:text-[52px] font-[900] text-white leading-[1.2] lg:leading-[1.15] tracking-tight mb-6 lg:mb-8 drop-shadow-2xl text-left"
          >
            Selamat datang, <br />
            Di Website SMA Negeri 14 <br />
            Samarinda
          </motion.h1>
          
          <motion.div variants={itemVariants}>
            <a 
              href="#sambutan" 
              className="inline-flex items-center gap-2 group bg-transparent hover:bg-[#587F93] border-2 border-white hover:border-[#587F93] text-white px-6 py-3 lg:px-10 lg:py-3.5 rounded-full font-bold text-[14px] lg:text-[16px] transition-all duration-300 shadow-lg active:scale-95 cursor-pointer no-underline"
            >
              Selengkapnya
              <ChevronDown size={20} className="group-hover:translate-y-1 transition-transform duration-300" aria-hidden="true" />
            </a>
          </motion.div>

        </div>
      </motion.header>

    </section>
  );
};

export default Hero;