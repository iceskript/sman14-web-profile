import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  User, 
  Share2, 
  ChevronRight, 
  ArrowLeft, 
  Facebook, 
  MessageCircle, 
  Link as LinkIcon 
} from 'lucide-react';

const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - Dalam aplikasi nyata, ini akan diambil dari API berdasarkan ID
  const article = {
    title: "Pelaksanaan Ujian Praktik Kelas XII Tahun Ajaran 2025/2026",
    category: "Kegiatan Sekolah",
    author: "Admin SMAN 14",
    date: "12 Februari 2026",
    image: "/news1.png",
    content: `
      <p>Samarinda - Siswa kelas XII SMAN 14 Samarinda mulai melaksanakan rangkaian ujian praktik sebagai salah satu syarat kelulusan utama. Kegiatan yang berlangsung sejak Senin pagi ini diikuti oleh seluruh siswa dengan antusiasme tinggi dan persiapan yang matang.</p>
      
      <p>Kepala Sekolah SMAN 14 Samarinda menyatakan bahwa ujian praktik tahun ini difokuskan pada implementasi keterampilan nyata yang telah dipelajari selama tiga tahun terakhir. "Kami ingin memastikan lulusan kami tidak hanya kuat secara teori, tetapi juga kompeten dalam praktik lapangan," ujarnya saat meninjau laboratorium seni.</p>
      
      <h3 class="text-2xl font-bold my-6 text-gray-900">Inovasi dalam Ujian Praktik</h3>
      <p>Berbeda dengan tahun sebelumnya, ujian praktik kali ini mengintegrasikan teknologi digital dalam beberapa mata pelajaran. Misalnya, pada mata pelajaran Bahasa Indonesia, siswa diminta untuk membuat konten podcast edukatif, sementara di mata pelajaran Biologi, pengamatan dilakukan menggunakan mikroskop digital terbaru.</p>
      
      <blockquote class="border-l-4 border-[#587F93] pl-6 my-8 italic text-gray-600 text-lg">
        "Ujian ini bukan sekadar formalitas, melainkan panggung bagi siswa untuk menunjukkan kreativitas dan dedikasi mereka terhadap ilmu pengetahuan."
      </blockquote>

      <p>Para guru penguji memberikan penilaian berdasarkan rubrik yang ketat namun tetap memberikan ruang bagi improvisasi siswa. Diharapkan melalui ujian ini, mentalitas siswa semakin terasah sebelum menghadapi ujian tertulis dan seleksi masuk perguruan tinggi negeri mendatang.</p>
    `
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <div className="pt-32 lg:pt-44 pb-24 font-urbanist bg-white min-h-screen">
      <div className="max-w-[1440px] mx-auto px-5 lg:px-[60px]">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest mb-8">
          <span className="hover:text-[#587F93] cursor-pointer" onClick={() => navigate('/')}>Beranda</span>
          <ChevronRight size={14} />
          <span className="hover:text-[#587F93] cursor-pointer" onClick={() => navigate('/berita')}>Berita</span>
          <ChevronRight size={14} />
          <span className="text-[#587F93] truncate max-w-[200px] lg:max-w-none">Detail Berita</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* MAIN CONTENT AREA */}
          <motion.article 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full lg:w-2/3"
          >
            {/* Category & Title */}
            <span className="inline-block bg-[#587F93]/10 text-[#587F93] px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest mb-6">
              {article.category}
            </span>
            <h1 className="text-[32px] lg:text-[48px] font-[900] text-gray-900 leading-tight mb-8">
              {article.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 py-6 border-y border-gray-100 mb-10 text-gray-500 text-sm font-bold uppercase tracking-wide">
              <div className="flex items-center gap-2">
                <User size={16} className="text-[#587F93]" />
                <span>Oleh: {article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-[#587F93]" />
                <span>{article.date}</span>
              </div>
              <div className="flex items-center gap-4 ml-auto">
                <span className="text-gray-400">Bagikan:</span>
                <Facebook 
                  size={18} 
                  className="hover:text-[#1877F2] cursor-pointer transition-colors" 
                  title="Bagikan ke Facebook"
                />
                <MessageCircle 
                  size={18} 
                  className="hover:text-[#25D366] cursor-pointer transition-colors" 
                  title="Bagikan ke WhatsApp"
                />
                <LinkIcon 
                  size={18} 
                  className="hover:text-[#587F93] cursor-pointer transition-colors" 
                  title="Salin Link"
                />
              </div>
            </div>

            {/* Featured Image */}
            <div className="w-full aspect-video rounded-3xl overflow-hidden mb-12 shadow-2xl">
              <img 
                src={article.image} 
                alt={article.title} 
                className="w-full h-full object-cover"
                onError={(e) => e.target.src = 'https://via.placeholder.com/1200x800?text=SMAN14+News'}
              />
            </div>

            {/* Article Body */}
            <div 
              className="prose prose-lg max-w-none text-gray-700 leading-[1.8] font-medium text-justify
                prose-headings:text-gray-900 prose-headings:font-black prose-headings:tracking-tight
                prose-p:mb-6 prose-blockquote:border-[#587F93] prose-blockquote:bg-gray-50 prose-blockquote:py-2"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />

            {/* Back Button */}
            <button 
              onClick={() => navigate('/berita')}
              className="mt-16 flex items-center gap-3 text-gray-900 font-black text-sm uppercase tracking-widest group"
            >
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-[#587F93] group-hover:text-white transition-all">
                <ArrowLeft size={18} />
              </div>
              Kembali ke Berita
            </button>
          </motion.article>

          {/* SIDEBAR */}
          <aside className="w-full lg:w-1/3 space-y-12">
            
            {/* Newsletter / Info Widget */}
            <div className="bg-[#587F93] rounded-[32px] p-8 text-white relative overflow-hidden group">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
              <h3 className="text-xl font-black mb-4 relative z-10">Info Pendaftaran</h3>
              <p className="text-white/80 text-sm leading-relaxed mb-8 relative z-10">
                Dapatkan informasi terbaru mengenai PPDB SMAN 14 Samarinda tahun ajaran 2026/2027.
              </p>
              <button className="w-full bg-white text-[#587F93] py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-100 transition-all relative z-10">
                Cek Jadwal PPDB
              </button>
            </div>

            {/* Tags Widget */}
            <div>
              <h3 className="text-xl font-black text-gray-900 mb-6 uppercase tracking-tight">Tag Terkait</h3>
              <div className="flex flex-wrap gap-2">
                {['Ujian', 'Siswa', 'Kurikulum', 'Prestasi', 'Samarinda', 'Pendidikan'].map(tag => (
                  <span key={tag} className="px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-500 hover:border-[#587F93] hover:text-[#587F93] cursor-pointer transition-all">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>

          </aside>

        </div>
      </div>
      
      <style jsx global>{`
        .prose h3 { margin-top: 2rem; margin-bottom: 1rem; }
        .prose p { margin-bottom: 1.5rem; }
      `}</style>
    </div>
  );
};

export default NewsDetail;