import React from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, FileText, Download, Calendar, Info, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Pendaftaran = () => {
  const navigate = useNavigate();

  // Mock Data Dokumen (Nanti bisa dari Database Admin)
  const documents = [
    { id: 1, title: "Brosur PPDB Tahun 2026/2027", type: "PDF", size: "2.5 MB", date: "15 Feb 2026" },
    { id: 2, title: "Petunjuk Teknis (Juknis) Jalur Zonasi", type: "PDF", size: "1.8 MB", date: "10 Feb 2026" },
    { id: 3, title: "Petunjuk Teknis (Juknis) Jalur Prestasi", type: "PDF", size: "1.8 MB", date: "10 Feb 2026" },
    { id: 4, title: "Surat Pernyataan Tanggung Jawab Mutlak", type: "DOCX", size: "500 KB", date: "01 Feb 2026" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className="pt-32 lg:pt-44 pb-24 font-urbanist bg-[#FDFDFD] min-h-screen">
      <div className="max-w-[1440px] mx-auto px-5 lg:px-[60px]">
        
        {/* Header & Breadcrumbs */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">
            <span className="hover:text-[#587F93] cursor-pointer" onClick={() => navigate('/')}>Beranda</span>
            <ChevronRight size={14} />
            <span className="text-[#587F93]">Informasi Pendaftaran</span>
          </div>
          <h1 className="text-[40px] lg:text-[56px] font-[900] text-black leading-none tracking-tight">
            Pendaftaran <span className="text-[#587F93]">PPDB</span>
          </h1>
          <div className="w-20 h-1.5 bg-[#587F93] mt-6 rounded-full"></div>
          <p className="mt-8 text-gray-500 max-w-3xl font-medium text-lg leading-relaxed">
            Informasi lengkap mengenai Penerimaan Peserta Didik Baru (PPDB) SMAN 14 Samarinda Tahun Ajaran 2026/2027. Silakan unduh dokumen terkait di bawah ini.
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col lg:flex-row gap-12 lg:gap-16"
        >
          
          {/* KOLOM KIRI: POSTER / VISUAL */}
          <motion.div variants={itemVariants} className="w-full lg:w-5/12">
            <div className="bg-white p-4 rounded-[32px] shadow-2xl border border-gray-100 rotate-1 hover:rotate-0 transition-transform duration-500">
              <div className="relative aspect-[3/4] rounded-[24px] overflow-hidden bg-gray-100">
                <img 
                  src="/poster-ppdb.jpg" 
                  alt="Poster PPDB" 
                  className="w-full h-full object-cover"
                  onError={(e) => e.target.src = 'https://via.placeholder.com/600x800?text=Poster+PPDB+SMAN14'}
                />
              </div>
              <div className="mt-6 text-center pb-2">
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Poster Resmi PPDB 2026</p>
              </div>
            </div>
          </motion.div>

          {/* KOLOM KANAN: LIST DOKUMEN & INFO */}
          <motion.div variants={itemVariants} className="w-full lg:w-7/12 space-y-10">
            
            {/* Info Box */}
            <div className="bg-[#587F93]/5 border-l-4 border-[#587F93] p-6 rounded-r-xl">
              <div className="flex items-start gap-4">
                <Info className="text-[#587F93] shrink-0 mt-1" size={24} />
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Jadwal Pelaksanaan</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Pendaftaran dibuka mulai tanggal <span className="font-bold text-gray-900">1 Juni 2026</span> hingga <span className="font-bold text-gray-900">30 Juni 2026</span>. Pastikan Anda melengkapi berkas sebelum batas waktu berakhir.
                  </p>
                </div>
              </div>
            </div>

            {/* Document List */}
            <div>
              <h3 className="text-2xl font-[900] text-gray-900 mb-6 flex items-center gap-3">
                <FileText className="text-[#587F93]" />
                Dokumen & Unduhan
              </h3>
              <div className="grid gap-4">
                {documents.map((doc) => (
                  <div key={doc.id} className="group bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#587F93]/30 transition-all flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4 overflow-hidden">
                      <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-[#587F93] transition-colors">
                        <FileText size={24} className="text-gray-400 group-hover:text-white transition-colors" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-gray-800 truncate group-hover:text-[#587F93] transition-colors">{doc.title}</h4>
                        <div className="flex items-center gap-3 text-xs text-gray-400 font-medium mt-1">
                          <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-500">{doc.type}</span>
                          <span>{doc.size}</span>
                          <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                          <span>{doc.date}</span>
                        </div>
                      </div>
                    </div>
                    <button className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 hover:bg-[#587F93] hover:text-white hover:border-[#587F93] transition-all shrink-0">
                      <Download size={20} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Pendaftaran;