import React from 'react';
import { motion } from 'framer-motion';

const ProgramUnggulan = () => {
  const programData = [
    {
      id: 1,
      title: "Pembelajaran berbasis Teknologi",
      desc: "Proses pembelajaran berbasis teknologi dapat menciptakan siswa yang mampu bereksplorasi, berkreatifitas, menyesuaikan diri dengan perkembangan zaman, dan tentunya menambah wawasan dan ilmu pengetahuan.",
      img: "/program-1.webp", 
    },
    {
      id: 2,
      title: "Ekstrakurikuler",
      desc: "Sebagai wadah untuk mengembangkan minat dan bakat, memperluas pengalaman bersosialisasi, praktik keterampilan berkomunikasi, dan internalisasi nilai-nilai karakter.",
      img: "/basket1.webp",
    },
    {
      id: 3,
      title: "Life Skills",
      desc: "Meningkatkan keterampilan, pengetahuan dan sikap belajar di bidang pekerjaan/usaha tertentu sesuai dengan minat dan bakat. perkembangan fisik dan jiwa serta potensi lingkungannya, sehingga diharapkan siswa memiliki bekal dimasa depan.",
      img: "/lab1.webp",
    },
    {
      id: 4,
      title: "Green House",
      desc: "Mengembangkan kesadaran lingkungan melalui praktik langsung budidaya tanaman dan pelestarian alam, menciptakan ekosistem sekolah yang asri dan edukatif.",
      img: "/greenhouse.webp",
    },
    {
      id: 5,
      title: "Bilingual Class",
      desc: "Mempersiapkan siswa menghadapi tantangan global melalui penguasaan bahasa asing dalam interaksi pembelajaran sehari-hari di kelas.",
      img: "/billingual.webp",
    },
  ];

  return (
    <section className="py-24 bg-white font-urbanist overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-5 lg:px-[100px]">
        
        {/* --- HEADER SECTION --- (DISAMAKAN DENGAN ACHIEVEMENT) */}
        <div className="flex flex-col items-start mb-16">
          <div className="flex items-center gap-6 mb-2">
            <span className="text-[#888888] font-[900] tracking-[0.3em] uppercase text-[18px] lg:text-[20px] whitespace-nowrap">
              Our Program
            </span>
            <div className="w-24 lg:w-32 h-[3px] bg-[#BCBCBC] rounded-full" />
          </div>
          
          <h2 className="text-[28px] lg:text-[36px] font-[900] text-black uppercase tracking-tight -ml-[1px] lg:-ml-[2px]">
            Program Unggulan
          </h2>
        </div>

        {/* --- GRID KARTU --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {programData.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -10 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-[10px] overflow-hidden flex flex-col h-full border border-gray-100 shadow-lg"
            >
              {/* Image Container */}
              <div className="relative h-[250px] overflow-hidden group">
                <img 
                  src={item.img} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => { e.target.src = 'https://via.placeholder.com/600x400?text=SMAPAS+Program'; }}
                />
              </div>

              {/* Content Layer */}
              <div className="p-8 flex flex-col flex-grow">
                <div className="bg-[#587F93] text-white w-10 h-7 flex items-center justify-center font-bold text-sm mb-4">
                  #{item.id}
                </div>

                <h3 className="text-[22px] lg:text-[24px] font-bold text-[#334155] mb-4 leading-tight">
                  {item.title}
                </h3>
                
                <p className="text-[#64748b] font-normal leading-relaxed text-[15px] lg:text-[16px]">
                  {item.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramUnggulan;