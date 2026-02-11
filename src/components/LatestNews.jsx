import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';

import 'swiper/css';
import 'swiper/css/pagination';

const LatestNews = () => {
  const navigate = useNavigate();
  const newsData = [
    {
      id: 1,
      date: 'Monday 31 August 2021',
      title: 'Lorem ipsum dolor sit amet consectetur adipiscing elit...',
      image: '/news1.png' 
    },
    {
      id: 2,
      date: 'Tuesday 01 September 2021',
      title: 'Quisque faucibus ex sapien vitae pellentesque sem placerat...',
      image: '/news2.png'
    },
    {
      id: 3,
      date: 'Wednesday 02 September 2021',
      title: 'In id cursus mi. Donec efficitur, urna a pelentesque...',
      image: '/news3.png'
    },
    {
      id: 4,
      date: 'Thursday 03 September 2021',
      title: 'Maecenas nec sem quis magna efficitur vulputate...',
      image: '/news4.png'
    },
    {
      id: 5,
      date: 'Friday 04 September 2021',
      title: 'Persiapan Ujian Sekolah SMAN 14 Samarinda Tahun Ajaran 2026...',
      image: '/news5.png'
    }
  ];

  return (
    <section className="py-16 bg-white font-urbanist overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-5 lg:px-[60px]">
        
        <div className="text-center mb-12">
          <h2 className="text-[28px] lg:text-[36px] font-[900] text-black uppercase tracking-tight">
            SMAPAS Latest News
          </h2>
          <div className="w-[80px] h-[3px] bg-[#587F93] mx-auto mt-2"></div>
        </div>

        <div className="relative news-slider-container">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30} 
            slidesPerView={1}
            /* PERBAIKAN ANIMASI GESER: speed diturunkan agar lebih cepat (default biasanya 300ms) */
            speed={400} 
            autoplay={{ 
              delay: 4000, 
              disableOnInteraction: false,
              /* Memastikan transisi selesai dengan cepat sebelum memulai delay berikutnya */
              waitForTransition: true 
            }}
            pagination={{ clickable: true }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="!pb-20" 
          >
            {newsData.map((news) => (
              <SwiperSlide key={news.id} className="h-auto">
                <div className="bg-white rounded-[20px] overflow-hidden shadow-xl border border-gray-100 flex flex-col h-full mb-8 mx-2">
                  
                  <div className="h-[240px] bg-[#E5E7EB] relative group overflow-hidden">
                    <img 
                      src={news.image} 
                      alt="News" 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                      onError={(e) => e.target.src = 'https://via.placeholder.com/400x300?text=News+Image'}
                    />
                  </div>

                  <div className="p-7 flex flex-col flex-grow text-left">
                    <span className="text-[12px] text-gray-400 italic font-semibold mb-3 block">
                      ~{news.date}
                    </span>
                    <h3 className="text-[15px] lg:text-[16px] font-bold text-gray-800 leading-relaxed mb-6 line-clamp-3">
                      {news.title}
                    </h3>
                    
                    <button 
                      onClick={() => navigate(`/berita/${news.id}`)}
                      className="mt-auto w-fit bg-[#587F93] text-white px-7 py-2.5 rounded-full text-[12px] font-[900] hover:bg-[#587F93] transition-all active:scale-95 shadow-sm"
                    >
                      Lanjutkan Baca
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          
          <style jsx global>{`
            .news-slider-container .swiper-pagination {
              bottom: 10px !important;
            }
            .news-slider-container .swiper-pagination-bullet {
              width: 10px;
              height: 10px;
              background: #D1D5DB;
              opacity: 1;
              margin: 0 6px !important;
            }
            .news-slider-container .swiper-pagination-bullet-active {
              background: #00B4D8;
              width: 25px;
              border-radius: 5px;
            }
          `}</style>
        </div>

        <div className="text-center mt-4">
          <button 
            onClick={() => navigate('/berita')}
            className="bg-[#587F93] text-white px-12 py-3.5 rounded-full text-[16px] font-[900] shadow-md hover:shadow-lg hover:bg-[#587F93] transition-all active:scale-95"
          >
            Berita Selengkapnya
          </button>
        </div>

      </div>
    </section>
  );
};

export default LatestNews;