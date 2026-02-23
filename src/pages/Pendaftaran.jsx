import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, FileText, Download, Calendar, Info, AlertCircle, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { fetchPendaftaran, urlFor, client } from '../lib/sanity';

const Pendaftaran = () => {
  const navigate = useNavigate();
  const [pendaftaranData, setPendaftaranData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Menggunakan query langsung agar file URL ter-dereference dengan benar dari Sanity
        const query = `*[_type == "pendaftaran"]{
          ...,
          berkasInformasi[]{
            ...,
            "fileUrl": file.asset->url
          }
        }`;
        const data = await client.fetch(query);
        setPendaftaranData(data);
      } catch (error) {
        console.error('Gagal memuat data pendaftaran:', error);
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

  const getStatusBadge = (status) => {
    const statusConfig = {
      'segera': { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Segera Dibuka' },
      'dibuka': { bg: 'bg-green-100', text: 'text-green-700', label: 'Pendaftaran Dibuka' },
      'ditutup': { bg: 'bg-red-100', text: 'text-red-700', label: 'Pendaftaran Ditutup' },
    };
    const config = statusConfig[status] || statusConfig['ditutup'];
    return config;
  };

  if (isLoading) {
    return (
      <div className="pt-32 lg:pt-44 pb-24 font-urbanist bg-[#FDFDFD] min-h-screen">
        <div className="max-w-[1440px] mx-auto px-5 lg:px-[60px] text-center">
          <p className="text-gray-500 font-medium">Memuat informasi pendaftaran...</p>
        </div>
      </div>
    );
  }

  const pInfo = pendaftaranData[0];

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
            {pInfo?.judul || 'Pendaftaran'} <span className="text-[#587F93]">{pInfo?.tahunAjaran}</span>
          </h1>
          <div className="w-20 h-1.5 bg-[#587F93] mt-6 rounded-full"></div>
          <p className="mt-8 text-gray-500 max-w-3xl font-medium text-lg leading-relaxed">
            {pInfo?.deskripsi || 'Informasi lengkap mengenai Penerimaan Peserta Didik Baru (PPDB) SMAN 14 Samarinda. Silakan unduh dokumen terkait di bawah ini.'}
          </p>
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col lg:flex-row gap-12 lg:gap-16"
        >
          
          {/* KOLOM KIRI: POSTER / VISUAL */}
          {pInfo?.posterNilai && (
            <motion.div variants={itemVariants} className="w-full lg:w-5/12">
              <div className="bg-white p-4 rounded-[32px] shadow-2xl border border-gray-100 hover:shadow-3xl transition-all duration-500">
                <div className="relative aspect-[3/4] rounded-[24px] overflow-hidden bg-gray-100">
                  <img 
                    src={urlFor(pInfo.posterNilai).width(600).height(800).url()} 
                    alt="Poster Pendaftaran" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="mt-6 text-center pb-2">
                  <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Poster Resmi Pendaftaran</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* KOLOM KANAN: LIST DOKUMEN & INFO */}
          <motion.div variants={itemVariants} className="w-full lg:w-7/12 space-y-10">
            
            {/* Status Box */}
            <div className={`${getStatusBadge(pInfo?.status).bg} border-l-4 border-current p-6 rounded-r-xl`}>
              <div className="flex items-start gap-4">
                <AlertCircle className={`${getStatusBadge(pInfo?.status).text} shrink-0 mt-1`} size={24} />
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">Status Pendaftaran</h3>
                  <p className={`${getStatusBadge(pInfo?.status).text} leading-relaxed font-semibold`}>
                    {getStatusBadge(pInfo?.status).label}
                  </p>
                </div>
              </div>
            </div>

            {/* Jadwal Info Box */}
            {pInfo && (
              <div className="bg-[#587F93]/5 border-l-4 border-[#587F93] p-6 rounded-r-xl">
                <div className="flex items-start gap-4">
                  <Calendar className="text-[#587F93] shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Jadwal Pelaksanaan</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Pendaftaran dibuka mulai tanggal <span className="font-bold text-gray-900">
                        {pInfo.tglMulai ? new Date(pInfo.tglMulai).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '-'}
                      </span> hingga <span className="font-bold text-gray-900">
                        {pInfo.tglSelesai ? new Date(pInfo.tglSelesai).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : '-'}
                      </span>. Pastikan melengkapi berkas sebelum batas waktu berakhir.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Link Pendaftaran Online */}
            {pInfo?.linkPendaftaran && (
              <a 
                href={pInfo.linkPendaftaran}
                target="_blank"
                rel="noopener noreferrer"
                className="block bg-gradient-to-r from-[#587F93] to-[#2c4958] text-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold mb-1">Form Pendaftaran Online</h3>
                    <p className="text-blue-100 text-sm">Klik untuk mengakses form pendaftaran</p>
                  </div>
                  <ExternalLink size={28} />
                </div>
              </a>
            )}

            {/* Document List */}
            {pInfo?.berkasInformasi && pInfo.berkasInformasi.length > 0 && (
              <div>
                <h3 className="text-2xl font-[900] text-gray-900 mb-6 flex items-center gap-3">
                  <FileText className="text-[#587F93]" />
                  Dokumen & Unduhan
                </h3>
                <div className="grid gap-4">
                  {pInfo.berkasInformasi.map((doc, idx) => (
                    <a
                      key={idx}
                      href={doc.fileUrl ? `${doc.fileUrl}?dl=` : '#'}
                      download={doc.nama || 'dokumen-juknis'}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group bg-white p-3 sm:p-4 lg:p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-[#587F93]/30 transition-all flex items-center justify-between gap-3 sm:gap-4 ${!doc.fileUrl ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}
                    >
                      <div className="flex-1 flex items-center gap-3 overflow-hidden">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-50 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-[#587F93] transition-colors">
                          <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-gray-400 group-hover:text-white transition-colors" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <h4 className="font-bold text-gray-800 truncate group-hover:text-[#587F93] transition-colors text-sm sm:text-base">{doc.nama}</h4>
                          <div className="flex flex-wrap items-center gap-x-2 sm:gap-x-3 gap-y-1 text-[10px] sm:text-xs text-gray-400 font-medium mt-1">
                            <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-500">PDF</span>
                          </div>
                        </div>
                      </div>
                      <div className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-200 text-gray-400 group-hover:bg-[#587F93] group-hover:text-white group-hover:border-[#587F93] transition-all shrink-0">
                        <Download size={20} />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}

          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Pendaftaran;