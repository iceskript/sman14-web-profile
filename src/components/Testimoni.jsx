import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { Quote } from 'lucide-react';
import { fetchAlumni, urlFor } from '../lib/sanity';

import 'swiper/css';
import 'swiper/css/pagination';

const Testimoni = () => {
  const [alumniData, setAlumniData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAlumni = async () => {
      try {
        const data = await fetchAlumni();
        setAlumniData(data);
      } catch (error) {
        console.error('Gagal memuat alumni:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadAlumni();
  }, []);

  if (isLoading) {
    return (
      <section className="py-24 bg-white font-urbanist overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-5 lg:px-[100px] text-center">
          <p className="text-gray-500 font-medium">Memuat testimoni alumni...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-white font-urbanist overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-5 lg:px-[100px]">
        
        {/* --- HEADER SECTION --- */}
        <div className="flex flex-col items-start mb-20">
          <div className="flex items-center gap-6 mb-2">
            <span className="text-[#888888] font-[900] tracking-[0.3em] uppercase text-[18px] lg:text-[20px] whitespace-nowrap">
              TESTIMONI
            </span>
            <div className="w-24 lg:w-32 h-[3px] bg-[#BCBCBC] rounded-full" />
          </div>
          <h2 className="text-[28px] lg:text-[36px] font-[900] text-black uppercase tracking-tight -ml-[2px]">
            ALUMNI SMAPAS
          </h2>
        </div>

        {/* --- SLIDER TESTIMONI --- */}
        <div className="relative testimoni-slider-container lg:px-12">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={60}
            slidesPerView={1}
            speed={800}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            breakpoints={{ 
              1024: { slidesPerView: 2 } 
            }}
            className="!pb-28 !pt-16" 
          >
            {alumniData.map((item) => (
              <SwiperSlide key={item._id} className="h-auto pb-10">
                {/* PENYESUAIAN CARD:
                  - shadow-[0_30px_60px_rgba(0,0,0,0.12)] dipertegas agar efek card lebih muncul.
                  - drop-shadow-[0_10px_10px_rgba(0,0,0,0.05)] untuk aksen bayangan tambahan.
                */}
                <div className="relative bg-white rounded-[15px] p-10 lg:p-14 shadow-[0_30px_60px_rgba(0,0,0,0.12)] drop-shadow-[0_10px_10px_rgba(0,0,0,0.05)] border border-gray-100 flex flex-col h-full ml-10 mr-4 transition-all duration-300 hover:shadow-[0_40px_80px_rgba(0,0,0,0.15)]">
                  
                  {/* FOTO ALUMNI */}
                  <div className="absolute -top-12 -left-10 w-24 h-24 lg:w-32 lg:h-32 bg-[#D9D9D9] rounded-full border-[8px] border-white shadow-xl z-30 overflow-hidden">
                    {item.foto ? (
                      <img 
                        src={urlFor(item.foto).width(256).height(256).url()}
                        alt={item.namaAlumni} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-400 text-xs">Foto</span>
                      </div>
                    )}
                  </div>

                  {/* IDENTITAS */}
                  <div className="ml-14 lg:ml-20 mb-8">
                    <h3 className="text-[20px] lg:text-[24px] font-[900] text-[#1A1A1A] leading-tight uppercase">
                      {item.namaAlumni}
                    </h3>
                    <p className="text-[#666666] font-semibold text-[14px] lg:text-[16px]">
                      {item.universitas || item.pekerjaanSaatIni}
                    </p>
                  </div>

                  {/* PESAN */}
                  <div className="relative flex-grow">
                    <Quote className="absolute -top-3 -left-7 text-[#1A1A1A] w-6 h-6 fill-current opacity-20" />
                    <p className="text-[#1A1A1A] font-medium italic leading-relaxed text-[15px] lg:text-[17px] pl-2 pr-4 relative z-10">
                      {item.testimoni}
                    </p>
                    <div className="flex justify-end mt-2">
                      <Quote className="text-[#1A1A1A] w-6 h-6 fill-current opacity-20 rotate-180" />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* CUSTOM PAGINATION: 
            - Disamakan dengan bagian prestasi (bulat standar).
            - Warna biru SMAN 14 Samarinda (#00B4D8).
          */}
          <style jsx global>{`
            .testimoni-slider-container .swiper-pagination {
              bottom: 10px !important;
            }
            .testimoni-slider-container .swiper-pagination-bullet {
              width: 14px;
              height: 14px;
              background: #587F93;
              opacity: 0.2;
              margin: 0 8px !important;
              transition: all 0.3s ease;
            }
            .testimoni-slider-container .swiper-pagination-bullet-active {
              background: #587F93 !important;
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

export default Testimoni;