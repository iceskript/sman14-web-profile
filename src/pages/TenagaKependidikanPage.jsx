import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { fetchTenagaKependidikan, urlFor } from '../lib/sanity';

const TenagaKependidikanPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const fetchedData = await fetchTenagaKependidikan();
        setData(fetchedData);
      } catch (error) {
        console.error('Gagal memuat data tenaga kependidikan:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  if (isLoading) {
    return (
      <div className="pt-32 lg:pt-44 pb-24 font-urbanist bg-[#FDFDFD] min-h-screen">
        <div className="max-w-[1440px] mx-auto px-5 lg:px-[60px] text-center">
          <p className="text-gray-500 font-medium">Memuat data tenaga kependidikan...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 lg:pt-44 pb-24 font-urbanist bg-[#FDFDFD] min-h-screen">
      <div className="max-w-[1440px] mx-auto px-5 lg:px-[60px]">
        
        {/* Header & Breadcrumbs */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-16"
        >
          <div className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">
            <span className="hover:text-[#587F93] cursor-pointer" onClick={() => navigate('/')}>Beranda</span>
            <ChevronRight size={14} />
            <span className="text-[#587F93]">Tenaga Kependidikan</span>
          </div>
          <h1 className="text-[40px] lg:text-[56px] font-[900] text-black leading-none tracking-tight">
            Tenaga <span className="text-[#587F93]">Kependidikan</span>
          </h1>
          <div className="w-20 h-1.5 bg-[#587F93] mt-6 rounded-full"></div>
          <p className="mt-8 text-gray-500 max-w-2xl font-medium text-lg">
            Mengenal lebih dekat tenaga kependidikan profesional SMAN 14 Samarinda yang berdedikasi dalam pengelolaan dan pengembangan sekolah.
          </p>
        </motion.div>

        {/* Data Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6"
        >
          {data.map((item) => (
            <motion.div 
              key={item._id}
              variants={cardVariants}
              whileHover={{ y: -12 }}
              className="group bg-white rounded-[24px] overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.03)] border border-gray-100 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(88,127,147,0.15)]"
            >
              {/* Image Container */}
              <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
                {item.foto ? (
                  <img 
                    src={urlFor(item.foto).width(300).height(400).url()} 
                    alt={item.nama} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <span className="text-gray-400">Foto</span>
                  </div>
                )}
                {/* Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#587F93]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-8">
                  {item.email && (
                    <a 
                      href={`mailto:${item.email}`}
                      className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#587F93] hover:bg-[#587F93] hover:text-white transition-all shadow-lg"
                      title={`Email: ${item.email}`}
                    >
                      <Mail size={18} />
                    </a>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-5 text-center flex flex-col items-center">
                {/* Jabatan - Fixed Height untuk 2 baris agar tidak terpotong */}
                <div className="h-[48px] flex items-center justify-center mb-2">
                  <span className="text-[15px] lg:text-[16px] font-black text-[#587F93] uppercase tracking-normal opacity-80 leading-tight">
                    {item.posisi 
                      ? item.posisi
                          .replace(/admSarana|Adm\. Sarana & Prasarana/gi, 'Admin Sarpras')
                          .replace(/wakaSarana|Waka Sarana & Prasarana/gi, 'Waka Sarpras')
                          .replace(/([a-z])([A-Z])/g, '$1 $2')
                          .trim() 
                      : '-'}
                  </span>
                </div>

                {/* Nama - Fixed Height untuk 2 baris tanpa titik-titik */}
                <div className="h-[52px] flex items-center justify-center w-full mb-1">
                  <h3 className="text-[18px] lg:text-[20px] font-[800] text-gray-900 leading-tight group-hover:text-[#587F93] transition-colors">
                    {item.nama}
                  </h3>
                </div>

                {/* NIP - Tepat di bawah nama */}
                <div className="h-[24px] mb-1">
                  <p className="text-gray-400 text-[13px] lg:text-[14px] font-bold uppercase tracking-normal">
                    {item.nip ? `NIP: ${item.nip}` : ""}
                  </p>
                </div>

                {/* Gelar */}
                <div className="h-[24px] mb-3">
                  <p className="text-[13px] text-gray-500">
                    {item.gelar || ""}
                  </p>
                </div>

                <div className="w-6 h-[2px] bg-gray-200 mx-auto group-hover:w-12 group-hover:bg-[#587F93] transition-all duration-500"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default TenagaKependidikanPage;
