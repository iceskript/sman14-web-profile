import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules'; 
import { ChevronLeft, ChevronRight } from 'lucide-react';

import 'swiper/css';

const DataGuru = () => {
  const swiperRef = useRef(null);

  const rawData = [
    { id: 1, nama: "Nama Guru, S.Pd.", jabatan: "Kepala Sekolah", img: "/guru-1.jpg" },
    { id: 2, nama: "Nama Guru, M.Pd.", jabatan: "Wakil Kepala Sekolah", img: "/guru-2.jpg" },
    { id: 3, nama: "Nama Guru, S.T.", jabatan: "Guru Mata Pelajaran", img: "/guru-3.jpg" },
    { id: 4, nama: "Nama Guru, S.Kom.", jabatan: "Guru Mata Pelajaran", img: "/guru-4.jpg" },
    { id: 5, nama: "Nama Guru, M.Si.", jabatan: "Guru Mata Pelajaran", img: "/guru-5.jpg" },
    { id: 6, nama: "Nama Guru, S.Si.", jabatan: "Guru Mata Pelajaran", img: "/guru-6.jpg" },
  ];

  // Gandakan data agar looping marquee tetap mulus tanpa jeda
  const guruData = [...rawData, ...rawData.map(item => ({...item, id: item.id + 100}))]; 

  // Logika Manual Arrow dengan override speed
  const handlePrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      const swiper = swiperRef.current.swiper;
      swiper.autoplay.stop();
      swiper.slidePrev(600); 
      setTimeout(() => { swiper.autoplay.start(); }, 700);
    }
  };

  const handleNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      const swiper = swiperRef.current.swiper;
      swiper.autoplay.stop();
      swiper.slideNext(600); 
      setTimeout(() => { swiper.autoplay.start(); }, 700);
    }
  };

  return (
    <section className="py-24 bg-[#F9F9F9] font-urbanist overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-5 lg:px-[100px]">
        
        {/* --- HEADER --- */}
        <div className="text-center mb-16">
          <h2 className="text-[32px] lg:text-[40px] font-black text-[#1A1A1A] uppercase tracking-tight leading-none mb-2">
            DATA GURU
          </h2>
          <p className="text-[18px] lg:text-[22px] font-medium text-[#555]">
            SMA Negeri 14 Samarinda
          </p>
          <div className="w-24 h-[4px] bg-[#587F93] mx-auto mt-4 rounded-full" />
        </div>

        {/* --- SLIDER AREA --- */}
        <div className="relative group mb-12">
          <Swiper
            ref={swiperRef}
            modules={[Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            loop={true}
            allowTouchMove={true}
            speed={5000} 
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              pauseOnMouseEnter: true, 
            }}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            className="marquee-swiper !pb-12"
          >
            {guruData.map((guru, index) => (
              <SwiperSlide key={`${guru.id}-${index}`}>
                <motion.div
                  whileHover={{ y: -10 }}
                  className="flex flex-col items-center p-2"
                >
                  <div className="w-full aspect-[4/5] bg-white rounded-2xl shadow-[0_25px_50px_-15px_rgba(0,0,0,0.15)] border border-white overflow-hidden mb-6 relative group/img">
                    <img 
                      src={guru.img} 
                      alt={guru.nama}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110"
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/400x500?text=Guru'; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-500" />
                  </div>

                  <div className="text-center">
                    <h3 className="text-[19px] lg:text-[21px] font-bold text-[#1A1A1A] leading-tight mb-1">
                      {guru.nama}
                    </h3>
                    <p className="text-[#587F93] font-semibold text-[14px] uppercase tracking-widest">
                      {guru.jabatan}
                    </p>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* --- NAVIGASI ARROW --- */}
          <button 
            onClick={handlePrev}
            className="absolute top-[40%] -left-4 lg:-left-20 transform -translate-y-1/2 z-50 text-gray-300 hover:text-[#587F93] transition-all duration-300 opacity-0 group-hover:opacity-100 hidden md:block cursor-pointer p-4"
          >
            <ChevronLeft size={56} strokeWidth={1.2} />
          </button>
          
          <button 
            onClick={handleNext}
            className="absolute top-[40%] -right-4 lg:-right-20 transform -translate-y-1/2 z-50 text-gray-300 hover:text-[#587F93] transition-all duration-300 opacity-0 group-hover:opacity-100 hidden md:block cursor-pointer p-4"
          >
            <ChevronRight size={56} strokeWidth={1.2} />
          </button>
        </div>

        {/* --- TOMBOL SELENGKAPNYA --- */}
        <div className="relative z-10 flex justify-center">
          <motion.button
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 15px 30px rgba(0,0,0,0.15)" // Drop shadow standar (bukan glow biru)
            }}
            whileTap={{ scale: 0.95 }}
            /* Menghapus shadow-[#00B4D8]/20 (glow) 
               Menggunakan shadow-lg (drop shadow abu-abu standar)
            */
            className="bg-[#587F93] text-white px-8 py-3 rounded-full font-bold text-[13px] uppercase tracking-[0.2em] transition-all shadow-lg"
          >
            Selengkapnya
          </motion.button>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .marquee-swiper > .swiper-wrapper {
          transition-timing-function: linear !important;
        }
      `}} />
    </section>
  );
};

export default DataGuru;