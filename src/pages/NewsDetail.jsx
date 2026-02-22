import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  User, 
  ChevronRight, 
  ArrowLeft, 
  Facebook, 
  MessageCircle, 
  Link as LinkIcon,
  ArrowRight
} from 'lucide-react';
import { fetchBeritaById, fetchRelatedBerita, urlFor } from '../lib/sanity';
import { PortableText } from '@portabletext/react';

const NewsDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [relatedNews, setRelatedNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadArticle = async () => {
      try {
        const berita = await fetchBeritaById(id);
        setArticle(berita);
        
        if (berita?.kategori) {
          const related = await fetchRelatedBerita(berita.kategori, id);
          setRelatedNews(related);
        }
      } catch (error) {
        console.error('Gagal memuat berita:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadArticle();
  }, [id]);

  // Komponen PortableText standar untuk konten utama
  const portableTextComponents = useMemo(() => ({
    types: {
      image: ({ value }) => (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="my-10 clear-both"
        >
          <img
            src={urlFor(value).width(800).url()}
            alt={value.alt || 'Article image'}
            className="w-full rounded-2xl shadow-xl border-4 border-white"
          />
        </motion.div>
      ),
    },
    block: {
      h1: ({ children }) => <h1 className="text-3xl font-black text-gray-900 my-8">{children}</h1>,
      h2: ({ children }) => <h2 className="text-2xl font-black text-gray-900 my-6">{children}</h2>,
      h3: ({ children }) => <h3 className="text-xl font-black text-gray-900 my-5">{children}</h3>,
      blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-[#587F93] pl-6 my-8 italic text-gray-600 text-lg bg-gray-50 py-4 pr-4">
          {children}
        </blockquote>
      ),
      normal: ({ children }) => <p className="text-gray-700 text-lg leading-[1.8] mb-6 font-medium text-justify">{children}</p>,
    },
    marks: {
      strong: ({ children }) => <strong className="font-bold text-gray-900">{children}</strong>,
      em: ({ children }) => <em className="italic text-gray-600">{children}</em>,
      link: ({ value, children }) => (
        <a href={value?.href} className="text-[#587F93] font-bold hover:underline" target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      ),
    },
  }), []);

  /**
   * Fungsi untuk menyisipkan foto dari galeri ke dalam array konten Portable Text
   * agar muncul berselang-seling di antara paragraf.
   */
  const interspersedContent = useMemo(() => {
    if (!article?.konten) return [];
    const gallery = article?.galeri || [];
    
    if (gallery.length === 0) return article.konten;

    const result = [];
    // Salin array galeri agar bisa dimanipulasi (diambil itemnya)
    const pendingGallery = [...gallery];
    
    // Fungsi untuk mengambil item galeri berdasarkan posisi
    const popImagesForPosition = (pos) => {
      const matches = [];
      // Loop backwards agar aman saat splice
      for (let i = pendingGallery.length - 1; i >= 0; i--) {
        if (pendingGallery[i].posisi === pos) {
          matches.unshift(pendingGallery[i]);
          pendingGallery.splice(i, 1);
        }
      }
      return matches;
    };

    // 1. Sisipkan posisi 'top' (Sebelum teks utama)
    const topImages = popImagesForPosition('top');
    topImages.forEach((img, idx) => {
      result.push({
        _type: 'injectedGalleryImage',
        _key: img._key || `injected-top-${idx}`,
        ...img
      });
    });

    let pCount = 0;
    article.konten.forEach((block) => {
      result.push(block);
      
      // 2. Sisipkan di antara blok konten teks (paragraf, heading, list, dll.)
      // Kondisi ini memastikan pCount bertambah untuk setiap blok yang mengandung teks,
      // bukan hanya paragraf 'normal', sehingga lebih akurat.
      if (block._type === 'block' && block.children && block.children.length > 0) {
        pCount++;
        const pImages = popImagesForPosition(`p${pCount}`);
        pImages.forEach((img, idx) => {
          result.push({
            _type: 'injectedGalleryImage',
            _key: img._key || `injected-p${pCount}-${idx}`,
            ...img
          });
        });
      }
    });

    // 3. Final Pass: Sisipkan sisa foto (posisi 'bottom' atau yang slot paragrafnya tidak tersedia)
    pendingGallery.forEach((img, idx) => {
      result.push({
        _type: 'injectedGalleryImage',
        _key: img._key || `injected-bottom-${idx}`,
        ...img
      });
    });

    return result;
  }, [article?.konten, article?.galeri]);

  // Komponen tambahan untuk merender gambar yang disisipkan
  const extendedComponents = useMemo(() => ({
    ...portableTextComponents,
    types: {
      ...portableTextComponents.types,
      injectedGalleryImage: ({ value }) => {
        // Pastikan mengambil field 'image' dari objek galeri
        const imageData = value.image;
        if (!imageData || !imageData.asset) return null;

        // Logika CSS berdasarkan layout (Full, Left, Right)
        let containerClass = "my-10 clear-both";
        if (value.layout === 'left') {
          containerClass = "md:float-left md:mr-8 mb-6 mt-2 w-full md:w-1/2 lg:w-2/5 clear-none";
        } else if (value.layout === 'right') {
          containerClass = "md:float-right md:ml-8 mb-6 mt-2 w-full md:w-1/2 lg:w-2/5 clear-none";
        }

        return (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={containerClass}
          >
            <img
              src={urlFor(imageData).width(800).url()}
              alt={value.caption || "Gambar Berita"}
              className="w-full rounded-2xl shadow-xl border-4 border-white"
            />
            {value.caption && (
              <p className="mt-3 text-sm text-gray-500 italic text-center font-medium">
                {value.caption}
              </p>
            )}
          </motion.div>
        );
      },
    }
  }), [portableTextComponents]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (isLoading) {
    return (
      <div className="pt-32 lg:pt-44 pb-24 font-urbanist bg-white min-h-screen flex items-center justify-center">
        <p className="text-gray-500 font-medium text-lg">Memuat berita...</p>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="pt-32 lg:pt-44 pb-24 font-urbanist bg-white min-h-screen">
        <div className="max-w-[1440px] mx-auto px-5 lg:px-[60px] text-center">
          <h2 className="text-3xl font-black text-gray-900 mb-4">Berita Tidak Ditemukan</h2>
          <button
            onClick={() => navigate('/berita')}
            className="inline-flex items-center gap-2 text-[#587F93] font-bold hover:gap-4 transition-all"
          >
            Kembali ke Berita <ArrowRight size={20} />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 lg:pt-44 pb-24 font-urbanist bg-white min-h-screen">
      <div className="max-w-[1440px] mx-auto px-5 lg:px-[60px]">
        
          {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm font-bold text-gray-400 uppercase tracking-widest mb-8">
          <span className="hover:text-[#587F93] cursor-pointer" onClick={() => navigate('/')}>Beranda</span>
          <ChevronRight size={14} />
          <span className="hover:text-[#587F93] cursor-pointer" onClick={() => navigate('/berita')}>Berita</span>
          <ChevronRight size={14} />
          <span className="text-[#587F93] truncate max-w-[200px] lg:max-w-none">{article?.judul}</span>
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
              {article?.kategori}
            </span>
            <h1 className="text-[32px] lg:text-[48px] font-[900] text-gray-900 leading-tight mb-8">
              {article?.judul}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 py-6 border-y border-gray-100 mb-10 text-gray-500 text-sm font-bold uppercase tracking-wide">
              <div className="flex items-center gap-2">
                <User size={16} className="text-[#587F93]" />
                <span>Oleh: {article?.author || 'Admin SMAN 14'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-[#587F93]" />
                <span>{new Date(article?.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-4 ml-auto">
                <span className="text-gray-400">Bagikan:</span>
                <a 
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#1877F2] cursor-pointer transition-colors"
                  title="Bagikan ke Facebook"
                >
                  <Facebook size={18} />
                </a>
                <a 
                  href={`https://api.whatsapp.com/send?text=${encodeURIComponent(article?.judul + " - Baca selengkapnya di: " + window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#25D366] cursor-pointer transition-colors"
                  title="Bagikan ke WhatsApp"
                >
                  <MessageCircle size={18} />
                </a>
                <LinkIcon 
                  size={18} 
                  className="hover:text-[#587F93] cursor-pointer transition-colors" 
                  title="Salin Link"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Link disalin!');
                  }}
                />
              </div>
            </div>

            {/* Featured Image */}
            <div className="w-full aspect-video rounded-3xl overflow-hidden mb-12 shadow-2xl">
              {article?.foto ? (
                <img 
                  src={urlFor(article.foto).width(1200).height(800).url()} 
                  alt={article.judul} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-400">Foto Berita</span>
                </div>
              )}
            </div>

            {/* Article Body */}
            {article?.konten && (
              <div className="text-gray-700 leading-[1.8] font-medium">
                <PortableText value={interspersedContent} components={extendedComponents} />
              </div>
            )}

            {/* Hashtag */}
            {article?.hashtag && article.hashtag.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-100">
                <div className="flex flex-wrap gap-2">
                  {article.hashtag.map((tag, idx) => (
                    <motion.a
                      key={idx}
                      href={`/berita?search=${tag.replace('#', '')}`}
                      whileHover={{ scale: 1.05 }}
                      className="px-4 py-2 bg-[#587F93]/10 text-[#587F93] rounded-full text-sm font-bold hover:bg-[#587F93] hover:text-white transition-all"
                    >
                      {tag.startsWith('#') ? tag : `#${tag}`}
                    </motion.a>
                  ))}
                </div>
              </div>
            )}

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
            
            {/* Related News Widget */}
            {relatedNews.length > 0 && (
              <div>
                <h3 className="text-xl font-black text-gray-900 mb-8 uppercase tracking-tight">Berita Terkait</h3>
                <div className="space-y-6">
                  {relatedNews.map((news) => (
                    <motion.div
                      key={news._id}
                      whileHover={{ y: -5 }}
                      onClick={() => navigate(`/berita/${news._id}`)}
                      className="p-5 rounded-2xl border border-gray-100 hover:border-[#587F93] hover:shadow-lg transition-all cursor-pointer group"
                    >
                      <div className="flex gap-4">
                        {news.foto && (
                          <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                            <img 
                              src={urlFor(news.foto).width(200).height(200).url()} 
                              alt={news.judul}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                          </div>
                        )}
                        <div className="flex-1 flex flex-col">
                          <span className="text-[10px] font-black text-[#587F93] uppercase tracking-widest mb-1">
                            {news.kategori}
                          </span>
                          <h4 className="font-black text-gray-900 group-hover:text-[#587F93] transition-colors line-clamp-2 mb-2">
                            {news.judul}
                          </h4>
                          <span className="text-xs text-gray-400 font-bold">
                            {new Date(news.tanggal).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Newsletter / Info Widget */}
            <div className="bg-[#587F93] rounded-[32px] p-8 text-white relative overflow-hidden group">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700"></div>
              <h3 className="text-xl font-black mb-4 relative z-10">Info Pendaftaran</h3>
              <p className="text-white/80 text-sm leading-relaxed mb-8 relative z-10">
                Dapatkan informasi terbaru mengenai PPDB SMAN 14 Samarinda tahun ajaran 2026/2027.
              </p>
              <button 
                onClick={() => navigate('/pendaftaran')}
                className="w-full bg-white text-[#587F93] py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-gray-100 transition-all relative z-10"
              >
                Cek Jadwal PPDB
              </button>
            </div>

          </aside>

        </div>
      </div>
    </div>
  );
};

export default NewsDetail;