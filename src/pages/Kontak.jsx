import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Phone, Mail, MapPin, Clock, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Kontak = () => {
  const navigate = useNavigate();

  const contactInfo = [
    {
      icon: <Phone size={24} />,
      title: "WhatsApp / Telepon",
      value: "0812-2995-9922",
      link: "https://wa.me/6281229959922",
      action: "Chat Sekarang",
      color: "bg-[#25D366]"
    },
    {
      icon: <Mail size={24} />,
      title: "Email Sekolah",
      value: "sman14.smapas@gmail.com",
      link: "mailto:sman14.smapas@gmail.com",
      action: "Kirim Email",
      color: "bg-[#EA4335]"
    },
    {
      icon: <MapPin size={24} />,
      title: "Alamat Sekolah",
      value: "Jl. Rapak Indah, Karang Asam Ilir, Kec. Sungai Kunjang, Kota Samarinda",
      link: "https://maps.app.goo.gl/4uyT7mwYh8j7eT3q9",
      action: "Lihat di Maps",
      color: "bg-[#587F93]"
    }
  ];

  return (
    <div className="pt-32 lg:pt-44 pb-24 font-urbanist bg-[#FDFDFD] min-h-screen">
      <div className="max-w-[1440px] mx-auto px-5 lg:px-[60px]">
        
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-16"
        >
          <div className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">
            <span className="hover:text-[#587F93] cursor-pointer" onClick={() => navigate('/')}>Beranda</span>
            <ChevronRight size={14} />
            <span className="text-[#587F93]">Kontak</span>
          </div>
          <h1 className="text-[40px] lg:text-[56px] font-[900] text-black leading-none tracking-tight">
            Hubungi <span className="text-[#587F93]">Kami</span>
          </h1>
          <div className="w-20 h-1.5 bg-[#587F93] mt-6 rounded-full"></div>
          <p className="mt-8 text-gray-500 max-w-2xl font-medium text-lg">
            Kami siap melayani informasi dan pertanyaan Anda. Silakan hubungi kami melalui saluran resmi berikut untuk respon cepat.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Contact Cards & Info */}
          <div className="lg:col-span-5 space-y-6">
            {contactInfo.map((item, index) => (
              <motion.a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group flex items-center gap-6 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg hover:border-[#587F93]/30 transition-all duration-300"
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg ${item.color} group-hover:scale-110 transition-transform duration-300`}>
                  {item.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{item.title}</h3>
                  <p className="text-base lg:text-lg font-bold text-gray-900 leading-tight mb-2 line-clamp-2">{item.value}</p>
                  <span className="text-xs font-bold text-[#587F93] flex items-center gap-1 group-hover:gap-2 transition-all">
                    {item.action} <ExternalLink size={12} />
                  </span>
                </div>
              </motion.a>
            ))}

            {/* Jam Operasional Box */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="p-8 bg-[#587F93] rounded-2xl text-white relative overflow-hidden shadow-xl"
            >
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              <div className="flex items-start gap-4 relative z-10">
                <Clock size={28} className="mt-1 flex-shrink-0" />
                <div className="w-full">
                  <h3 className="text-xl font-black mb-4 uppercase tracking-tight">Jam Operasional</h3>
                  <ul className="space-y-3 text-white/90 text-sm font-medium">
                    <li className="flex justify-between border-b border-white/20 pb-2">
                      <span>Senin - Kamis</span>
                      <span className="font-bold">07:15 - 15:30 WITA</span>
                    </li>
                    <li className="flex justify-between border-b border-white/20 pb-2">
                      <span>Jumat</span>
                      <span className="font-bold">07:15 - 11:30 WITA</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Sabtu - Minggu</span>
                      <span className="font-bold text-red-200">Libur</span>
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Google Maps Embed */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-7 h-[500px] lg:h-auto min-h-[400px] bg-gray-100 rounded-3xl overflow-hidden shadow-2xl border border-gray-200 relative group"
          >
            <iframe 
              src="https://maps.google.com/maps?q=SMA%20Negeri%2014%20Samarinda&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700"
              title="Peta Lokasi SMAN 14 Samarinda"
            ></iframe>
            
            {/* Floating Location Label */}
            <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md px-6 py-4 rounded-2xl shadow-lg border border-gray-100 max-w-[280px]">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Lokasi Kami</p>
              </div>
              <p className="text-sm font-black text-gray-900 leading-tight">SMA Negeri 14 Samarinda</p>
              <p className="text-xs text-gray-500 mt-1">Jl. Rapak Indah, Sungai Kunjang</p>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Kontak;