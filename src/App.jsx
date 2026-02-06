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
import DataGuru from './components/DataGuru';
import StatCounter from './components/StatCounter';

const AppContent = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    // 'scroll-auto' memastikan perilaku scroll kembali ke standar browser yang stabil
    <div className="flex flex-col min-h-screen bg-white font-inter overflow-x-hidden select-none scroll-auto">
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
              <DataGuru />
            </>
          } />
          <Route path="/profil" element={<ProfilSekolah />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {!isLoginPage && <Footer />}
      <ScrollToTop />
    </div>
  );
};

function App() {
  return <AppContent />;
}

export default App;