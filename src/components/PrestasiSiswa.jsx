import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { fetchPrestasiSiswa, urlFor } from '../lib/sanity';

import 'swiper/css';
import 'swiper/css/pagination';

const PrestasiSiswa = () => {
  const [prestasiData, setPrestasiData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadPrestasi = async () => {
      try {
        const data = await fetchPrestasiSiswa();
        setPrestasiData(data);
      } catch (error) {
        console.error('Gagal memuat prestasi:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadPrestasi();
  }, []);

  if (isLoading) {
    return (
      <section className="py-24 bg-white font-urbanist overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-5 lg:px-[100px] text-center">
          <p className="text-gray-500 font-medium">Memuat data prestasi...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-white font-urbanist overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-5 lg:px-[100px]">
        
        {/* --- HEADER SECTION --- */}
        <div className="flex flex-col items-start mb-16">
          <div className="flex items-center gap-6 mb-2">
            <span className="text-[#888888] font-[900] tracking-[0.3em] uppercase text-[18px] lg:text-[20px] whitespace-nowrap">
              ACHIEVEMENT
            </span>
            <div className="w-24 lg:w-32 h-[3px] bg-[#BCBCBC] rounded-full" />
          </div>
          
          <h2 className="text-[28px] lg:text-[36px] font-[900] text-black uppercase tracking-tight -ml-[1px] lg:-ml-[2px]">
            PRESTASI SISWA/I
          </h2>
        </div>

        {/* --- SLIDER PRESTASI --- */}
        <div className="relative prestasi-slider-container">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={40}
            slidesPerView={1}
            speed={600}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="!pb-24"
          >
            {prestasiData.map((item) => (
              <SwiperSlide key={item._id} className="h-auto flex">
                <div className="bg-white rounded-[40px] overflow-hidden flex flex-col flex-1 border border-[#F5F5F5] shadow-2xl drop-shadow-[0_20px_20px_rgba(0,0,0,0.05)] mb-10">
                  
                  {/* Image Area */}
                  <div className="relative h-[300px] bg-[#F8F8F8] overflow-hidden">
                    {item.foto ? (
                      <img 
                        src={urlFor(item.foto).width(600).height(400).url()}
                        alt={item.namaSiswa}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-100">
                        <span className="text-gray-400">Foto Prestasi</span>
                      </div>
                    )}
                  </div>

                  {/* Content Area */}
                  <div className="p-10 text-center flex flex-col flex-grow items-center">
                    <span className="text-[12px] font-black text-[#587F93] uppercase tracking-widest mb-3 px-3 py-1 bg-[#587F93]/10 rounded-full">
                      {item.tingkatPrestasi}
                    </span>
                    <h3 className="text-[22px] lg:text-[24px] font-[900] text-[#1A1A1A] mb-4 uppercase tracking-tight line-clamp-2">
                      {item.judul}
                    </h3>
                    <p className="text-[#666666] font-semibold text-[15px] mb-4">
                      {item.namaSiswa}
                    </p>
                    <p className="text-[#666666] font-medium leading-relaxed text-[14px] opacity-80 max-w-[300px] line-clamp-3">
                      {item.deskripsi}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <style jsx global>{`
            .prestasi-slider-container .swiper-pagination {
              bottom: 0px !important;
            }
            .prestasi-slider-container .swiper-pagination-bullet {
              width: 14px;
              height: 14px;
              background: #587F93;
              opacity: 0.2;
              margin: 0 8px !important;
              transition: all 0.3s ease;
            }
            .prestasi-slider-container .swiper-pagination-bullet-active {
              background: #587F93;
              opacity: 1;
              width: 14px;
              border-radius: 50%;
            }
          `}</style>
        </div>

      </div>
    </section>
  );
};

export default PrestasiSiswa;