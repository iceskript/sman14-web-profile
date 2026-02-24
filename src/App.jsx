import React, { useEffect } from 'react'; 
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
// Hapus atau abaikan import Lenis jika tidak digunakan lagi
// import Lenis from '@studio-freight/lenis'; 

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Login from './pages/Login';
import ProfilSekolah from './pages/ProfilSekolah';
import Hero from './components/Hero';
import Sambutan from './components/Sambutan';
import LatestNews from './components/LatestNews';
import VisiMisi from './components/VisiMisi';
import ProgramUnggulan from './components/ProgramUnggulan';
import PrestasiSiswa from './components/PrestasiSiswa';
import Testimoni from './components/Testimoni';
import DewanGuru from './components/DewanGuru';
import StatCounter from './components/StatCounter';
import BeritaTerbaru from './pages/BeritaTerbaru';
import NewsDetail from './pages/NewsDetail';
import TenagaKependidikanPage from './pages/TenagaKependidikanPage';
import DewanGuruPage from './pages/DewanGuruPage';
import Ekstrakurikuler from './pages/Ekstrakurikuler';
import Galeri from './pages/Galeri';
import Pendaftaran from './pages/Pendaftaran';
import StrukturOrganisasiPage from './pages/StrukturOrganisasiPage';
import Kontak from './pages/Kontak';
import ChatCS from './components/ChatCS';

const AppContent = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  // Global Scroll to Top: Reset scroll setiap kali pindah halaman (kecuali jika ada hash/anchor)
  useEffect(() => {
    // Matikan restorasi scroll otomatis browser agar tidak bentrok dengan manual scroll
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    if (!location.hash) {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  return (
    // 'scroll-auto' memastikan perilaku scroll kembali ke standar browser yang stabil
    <div className="flex flex-col min-h-screen bg-white font-urbanist overflow-x-hidden scroll-auto">
      {!isLoginPage && <Navbar />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <StatCounter />
              <Sambutan />
              <LatestNews />
              <VisiMisi />
              <ProgramUnggulan />
              <PrestasiSiswa />
              <Testimoni />
              <DewanGuru />
            </>
          } />
          <Route path="/profil" element={<ProfilSekolah />} />
          <Route path="/berita" element={<BeritaTerbaru />} />
          <Route path="/berita/:id" element={<NewsDetail />} />
          <Route path="/tenaga-kependidikan" element={<TenagaKependidikanPage />} />
          <Route path="/dewan-guru" element={<DewanGuruPage />} />
          <Route path="/struktur-organisasi" element={<StrukturOrganisasiPage />} />
          <Route path="/ekstrakurikuler" element={<Ekstrakurikuler />} />
          <Route path="/galeri" element={<Galeri />} />
          <Route path="/pendaftaran" element={<Pendaftaran />} />
          <Route path="/kontak" element={<Kontak />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {!isLoginPage && <Footer />}
      {!isLoginPage && <ChatCS />}
      <ScrollToTop />
    </div>
  );
};

function App() {
  return <AppContent />;
}

export default App;