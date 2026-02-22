import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules'; 
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { fetchDewanGuru, urlFor } from '../lib/sanity';

import 'swiper/css';

const DataGuru = () => {
  const navigate = useNavigate();
  const swiperRef = useRef(null);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const result = await fetchDewanGuru();
        setData(result);
      } catch (error) {
        console.error('Gagal memuat data guru:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  // Gandakan data agar looping marquee tetap mulus tanpa jeda
  const guruData = data.length > 0 ? [...data, ...data.map(item => ({...item, _id: item._id + '_dup'}))] : [];

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

  if (isLoading) {
    return (
      <section className="py-24 bg-[#F9F9F9] font-urbanist text-center">
        <p className="text-gray-500 font-medium">Memuat data guru...</p>
      </section>
    );
  }

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
            spaceBetween={20}
            slidesPerView={2}
            loop={true}
            allowTouchMove={true}
            speed={5000} 
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              pauseOnMouseEnter: true, 
            }}
            breakpoints={{
              640: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 5 },
            }}
            className="marquee-swiper !pb-12"
          >
            {guruData.map((guru, index) => (
              <SwiperSlide key={`${guru._id}-${index}`}>
                <motion.div
                  whileHover={{ y: -10 }}
                  className="flex flex-col items-center p-2"
                >
                  <div className="w-full aspect-[4/5] bg-white rounded-2xl shadow-[0_25px_50px_-15px_rgba(0,0,0,0.15)] border border-white overflow-hidden mb-6 relative group/img">
                    <img 
                      src={guru.foto ? urlFor(guru.foto).width(400).height(500).url() : 'https://via.placeholder.com/400x500?text=Guru'} 
                      alt={guru.nama}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-500" />
                  </div>

                  <div className="text-center">
                    <h3 className="text-[15px] lg:text-[21px] font-bold text-[#1A1A1A] leading-tight mb-1">
                      {guru.nama}
                    </h3>
                    <p className="text-[#587F93] font-semibold text-[11px] lg:text-[14px] uppercase tracking-widest">
                      {guru.bidang 
                        ? guru.bidang
                            .replace(/admSarana|Adm\. Sarana & Prasarana/gi, 'Admin Sarpras')
                            .replace(/wakaSarana|Waka Sarana & Prasarana/gi, 'Waka Sarpras')
                        : "Guru"
                      }
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
            onClick={() => navigate('/dewan-guru')}
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