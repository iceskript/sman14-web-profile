import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, Download, ZoomIn, ZoomOut, RotateCcw, FileText } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { client, urlFor } from '../lib/sanity';

const StrukturOrganisasiPage = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [scale, setScale] = useState(1);

  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.25, 0.5));
  const handleReset = () => setScale(1);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Mengambil dokumen strukturOrganisasiPage (single document)
        const query = `*[_type == "strukturOrganisasiPage"][0]{
          judul,
          deskripsiSingkat,
          keterangan,
          "pdfUrl": filePDF.asset->url,
          previewImage
        }`;
        const result = await client.fetch(query);
        setData(result);
      } catch (error) {
        console.error('Gagal memuat data struktur organisasi:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  if (isLoading) {
    return (
      <div className="pt-32 lg:pt-44 pb-24 font-urbanist bg-[#FDFDFD] min-h-screen text-center">
        <div className="max-w-[1440px] mx-auto px-5 lg:px-[60px]">
          <p className="text-gray-500 font-medium">Memuat data...</p>
        </div>
      </div>
    );
  }

  // Fallback jika data belum diisi di CMS
  const displayData = data || {
    judul: 'Struktur Organisasi',
    deskripsiSingkat: 'Informasi mengenai struktur organisasi sekolah.',
    keterangan: 'Belum ada data struktur organisasi yang diunggah.',
    pdfUrl: null,
    previewImage: null
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
            <span className="hover:text-[#587F93] cursor-pointer" onClick={() => navigate('/profil')}>Profil</span>
            <ChevronRight size={14} />
            <span className="text-[#587F93]">Struktur Organisasi</span>
          </div>
          <h1 className="text-[40px] lg:text-[56px] font-[900] text-black leading-none tracking-tight uppercase">
            {displayData.judul}
          </h1>
          <div className="w-20 h-1.5 bg-[#587F93] mt-6 rounded-full"></div>
          <p className="mt-8 text-gray-500 max-w-3xl font-medium text-lg leading-relaxed">
            {displayData.deskripsiSingkat}
          </p>
        </motion.div>

        {/* Content Section */}
        <div className="flex flex-col gap-10">
          
          {/* Keterangan Text */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="prose prose-lg max-w-none text-gray-600 whitespace-pre-line"
          >
            {displayData.keterangan}
          </motion.div>

          {/* Image Viewer Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="w-full bg-gray-100 rounded-[32px] overflow-hidden border border-gray-200 shadow-lg relative group"
          >
            {displayData.previewImage ? (
              <>
                {/* Toolbar Controls */}
                <div className="absolute top-6 right-6 flex items-center gap-2 bg-white/90 backdrop-blur-sm p-2 rounded-xl shadow-lg z-20 border border-gray-100">
                  <button onClick={handleZoomOut} className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors" title="Zoom Out">
                    <ZoomOut size={20} />
                  </button>
                  <span className="text-xs font-bold text-gray-400 w-12 text-center">{Math.round(scale * 100)}%</span>
                  <button onClick={handleZoomIn} className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors" title="Zoom In">
                    <ZoomIn size={20} />
                  </button>
                  <div className="w-px h-6 bg-gray-200 mx-1"></div>
                  <button onClick={handleReset} className="p-2 hover:bg-gray-100 rounded-lg text-gray-600 transition-colors" title="Reset">
                    <RotateCcw size={20} />
                  </button>
                  {displayData.pdfUrl && (
                    <>
                      <div className="w-px h-6 bg-gray-200 mx-1"></div>
                      <a href={`${displayData.pdfUrl}?dl=`} target="_blank" rel="noopener noreferrer" className="p-2 hover:bg-[#587F93] hover:text-white rounded-lg text-gray-600 transition-colors" title="Download PDF">
                        <Download size={20} />
                      </a>
                    </>
                  )}
                </div>

                {/* Scrollable Image Container */}
                <div className="overflow-auto h-[80vh] w-full flex items-start justify-center p-10 bg-[#F5F7FA]">
                  <img 
                    src={urlFor(displayData.previewImage).url()} 
                    alt="Struktur Organisasi" 
                    style={{ width: `${scale * 100}%`, maxWidth: 'none', transition: 'width 0.3s ease-out' }}
                    className="shadow-2xl rounded-lg"
                  />
                </div>
              </>
            ) : displayData.pdfUrl ? (
              <iframe src={displayData.pdfUrl} className="w-full h-[80vh]" title="PDF Viewer"></iframe>
            ) : (
              <div className="h-[400px] flex flex-col items-center justify-center text-gray-400">
                <FileText size={48} className="mb-4 opacity-50" />
                <p className="font-bold">Belum ada gambar struktur organisasi</p>
              </div>
            )}
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default StrukturOrganisasiPage;