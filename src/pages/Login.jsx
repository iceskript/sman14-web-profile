import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Lock, Eye, EyeOff, LogIn, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { client } from '../client'; 

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [error, setError] = useState(''); 
  
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // 1. Query ke Sanity mencari dokumen admin berdasarkan username
      const query = `*[_type == "admin" && username == $username][0]`;
      const params = { username: username };
      const admin = await client.fetch(query, params);

      // 2. Validasi kecocokan data
      if (admin && admin.password === password) {
        setIsLoading(false);

        // LOGIKA SMART REDIRECT:
        // Jika sedang di localhost, arahkan ke port 3333
        // Jika sudah online (Vercel), arahkan ke Sanity Studio yang sudah dideploy
        const studioUrl = window.location.hostname === 'localhost' 
          ? 'http://localhost:3333' 
          : 'https://www.sanity.io/@o0E0wSMrR/studio/akrnc8fvvm7nlcn2kmneu402/default/structure'; 

        window.location.replace(studioUrl);
      } else {
        setIsLoading(false);
        setError('Username atau Password salah!');
      }
    } catch (err) {
      console.error("Login Error:", err);
      setIsLoading(false);
      setError('Gagal terhubung ke Sanity CMS. Cek koneksi atau CORS!');
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F2F5] flex items-center justify-center p-4 sm:p-6 font-urbanist overflow-hidden">
      
      <motion.div 
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 1.5, 
          ease: [0.16, 1, 0.3, 1] 
        }}
        className="flex flex-col items-center w-full max-w-[905px]"
      >
        
        <div className="bg-white rounded-[25px] shadow-2xl overflow-hidden flex flex-col md:flex-row w-full md:h-[417px]">
          
          {/* SISI KIRI: ILUSTRASI */}
          <div className="w-full md:w-1/2 h-[250px] md:h-full bg-white flex items-center justify-center p-6 overflow-hidden">
            <img 
              src="/login-visual.webp" 
              alt="Visual SMAN 14" 
              className="w-full h-full object-contain"
            />
          </div>

          {/* SISI KANAN: FORM LOGIN */}
          <div className="w-full md:w-1/2 bg-[#587F93] p-8 md:p-12 flex flex-col justify-center text-white">
            <h2 className="text-[32px] md:text-[36px] font-black text-center mb-8 md:mb-10 tracking-[0.2em] uppercase leading-none">
              LOGIN
            </h2>

            <form onSubmit={handleLogin} className="space-y-6 w-full max-w-[340px] mx-auto">
              {/* Pesan Error Animatif */}
              <AnimatePresence>
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-red-500/20 border border-red-500 text-red-100 text-[11px] p-2 rounded-md text-center font-bold"
                  >
                    {error}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-bold opacity-80 ml-14 uppercase">Username / Email</span>
                <div className="relative flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-lg shrink-0">
                    <User size={20} className="text-[#587F93]" />
                  </div>
                  <input 
                    type="text" 
                    required
                    value={username}
                    onChange={(e) => {
                        setUsername(e.target.value);
                        if(error) setError('');
                    }}
                    placeholder="admin@smapas.sch.id"
                    className="flex-grow bg-transparent border-b border-white/50 py-2 outline-none text-[13px] placeholder:text-white/30 focus:border-white transition-all font-bold"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-bold opacity-80 ml-14 uppercase">Password</span>
                <div className="relative flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-lg shrink-0">
                    <Lock size={20} className="text-[#587F93]" />
                  </div>
                  <div className="relative flex-grow">
                    <input 
                      type={showPassword ? "text" : "password"} 
                      required
                      value={password}
                      onChange={(e) => {
                          setPassword(e.target.value);
                          if(error) setError('');
                      }}
                      placeholder="••••••••••••••••"
                      className="w-full bg-transparent border-b border-white/50 py-2 outline-none text-[13px] placeholder:text-white/30 pr-8 focus:border-white transition-all font-bold"
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-0 top-1/2 -translate-y-1/2 text-white/50 hover:text-white"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-center pt-2">
                <motion.button 
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: 1.05, backgroundColor: "#FFFFFF", color: "#587F93" }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-[110px] h-[38px] rounded-lg font-black text-[12px] flex items-center justify-center gap-2 shadow-xl transition-all
                    ${isLoading ? 'bg-gray-400 cursor-not-allowed shadow-none' : 'bg-[#D1D9E0] text-[#587F93]'}`}
                >
                  <AnimatePresence mode="wait">
                    {isLoading ? (
                      <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <Loader2 size={18} className="animate-spin" />
                      </motion.div>
                    ) : (
                      <motion.div key="text" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                        <LogIn size={15} /> LOGIN
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </form>
          </div>
        </div>

        <motion.p 
          className="mt-8 text-[11px] font-bold text-[#587F93]/60 uppercase tracking-[0.2em] text-center"
        >
          @Managed by TIM IT SMAN 14 Samarinda
        </motion.p>

      </motion.div>
    </div>
  );
};

export default Login;