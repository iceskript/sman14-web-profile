import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import { fetchBerita, urlFor } from '../lib/sanity';

import 'swiper/css';
import 'swiper/css/pagination';

const LatestNews = () => {
  const navigate = useNavigate();
  const [newsData, setNewsData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadNews = async () => {
      try {
        const data = await fetchBerita();
        setNewsData(data);
      } catch (error) {
        console.error('Gagal memuat berita:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadNews();
  }, []);

  if (isLoading) {
    return (
      <section className="py-16 bg-white font-urbanist overflow-hidden">
        <div className="text-center">
          <p className="text-gray-500 font-medium">Memuat berita terbaru...</p>
        </div>
      </section>
    );
  }

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
              <SwiperSlide key={news._id} className="h-auto flex">
                <div className="bg-white rounded-[20px] overflow-hidden shadow-xl border border-gray-100 flex flex-col flex-1 mb-8 mx-2">
                  
                  {/* Image Container */}
                  <div className="relative h-[200px] overflow-hidden bg-gray-100">
                    {news.foto ? (
                      <img 
                        src={urlFor(news.foto).width(400).height(300).url()}
                        alt={news.judul} 
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-gray-400">Foto Berita</span>
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-[#587F93]/90 text-white text-[10px] font-black uppercase tracking-widest rounded">
                        {news.kategori}
                      </span>
                    </div>
                  </div>

                  {/* Content Container */}
                  <div className="p-6 flex flex-col flex-grow">
                    <p className="text-[12px] text-gray-400 font-bold uppercase tracking-widest mb-3">
                      {new Date(news.tanggal).toLocaleDateString('id-ID', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                    <h3 className="text-[16px] lg:text-[18px] font-[800] text-gray-900 leading-tight mb-4 line-clamp-3">
                      {news.judul}
                    </h3>
                    <p className="text-gray-500 text-[14px] leading-relaxed mb-6 line-clamp-3 font-medium flex-grow">
                      {news.excerpt}
                    </p>
                    {/* Hashtags */}
                    {news.hashtag && news.hashtag.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {news.hashtag.slice(0, 2).map((tag, idx) => (
                          <span key={idx} className="text-[9px] px-2 py-0.5 bg-[#587F93]/10 text-[#587F93] rounded-full font-bold">
                            {tag.startsWith('#') ? tag : `#${tag}`}
                          </span>
                        ))}
                      </div>
                    )}
                    <button 
                      onClick={() => navigate(`/berita/${news._id}`)}
                      className="mt-auto w-fit bg-[#587F93] text-white px-7 py-2.5 rounded-full text-[12px] font-[900] hover:bg-[#466575] transition-all active:scale-95 shadow-sm"
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
              width: 14px;
              height: 14px;
              background: #587F93;
              opacity: 0.2;
              margin: 0 6px !important;
              transition: all 0.3s ease;
            }
            .news-slider-container .swiper-pagination-bullet-active {
              background: #587F93;
              width: 14px;
              border-radius: 50%;
              opacity: 1;
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