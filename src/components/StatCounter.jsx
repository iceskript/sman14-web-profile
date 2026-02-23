import React from 'react';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, Presentation, School } from 'lucide-react';

const StatCounter = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, 
    threshold: 0.8, 
  });

  const stats = [
    {
      id: 1,
      label: "Siswa Aktif",
      value: 711,
      suffix: "+",
      icon: <GraduationCap size={36} className="text-[#587F93]" strokeWidth={1.2} />,
      // Menambah min-width agar kontainer tidak berubah ukuran saat angka bergulir
      minWidth: "min-w-[120px] lg:min-w-[150px]" 
    },
    {
      id: 2,
      label: "Guru & Staff",
      value: 48,
      suffix: "",
      icon: <Presentation size={36} className="text-[#587F93]" strokeWidth={1.2} />,
      minWidth: "min-w-[80px] lg:min-w-[100px]"
    },
    {
      id: 3,
      label: "Ruang Kelas",
      value: 20,
      suffix: "",
      icon: <School size={36} className="text-[#587F93]" strokeWidth={1.2} />,
      minWidth: "min-w-[60px] lg:min-w-[80px]"
    },
  ];

  return (
    <div className="relative w-full flex justify-center z-20 -mt-10 lg:-mt-12 px-5 font-urbanist">
      <div 
        ref={ref}
        className="bg-white rounded-2xl py-8 lg:py-10 px-10 lg:px-20 flex flex-wrap justify-center gap-10 lg:gap-32 border border-white/50 shadow-[0_30px_60px_rgba(0,0,0,0.12)] backdrop-blur-sm"
      >
        {stats.map((stat) => (
          <div key={stat.id} className="flex items-center gap-6">
            <div className="flex-shrink-0 opacity-90">
              {stat.icon}
            </div>
            
            <div className={`flex flex-col ${stat.minWidth}`}>
              <span className="text-[11px] lg:text-[12px] font-semibold text-gray-400 tracking-[0.2em] uppercase mb-1">
                {stat.label}
              </span>
              
              {/* tabular-nums memastikan setiap karakter angka punya lebar yang sama */}
              <span className="text-[28px] lg:text-[36px] font-bold text-[#1A1A1A] leading-none tabular-nums">
                {inView ? (
                  <CountUp end={stat.value} duration={2.5} suffix={stat.suffix} separator="." />
                ) : (
                  `0${stat.suffix}`
                )}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatCounter;