import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Headset } from 'lucide-react';

const ChatCS = () => {
  const [isVisible, setIsVisible] = useState(false);
  const phoneNumber = "6281229959922"; // Format internasional tanpa tanda +
  const message = "Halo Admin SMAN 14 Samarinda, saya ingin bertanya mengenai...";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  // Logika untuk memunculkan/menyembunyikan tombol berdasarkan scroll
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed bottom-20 right-4 z-[100] font-urbanist">
          <motion.div
            initial={{ opacity: 0, scale: 0.5, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.5, x: 20 }}
            transition={{ 
              type: "spring", 
              stiffness: 260, 
              damping: 20
            }}
            className="relative group"
          >
            {/* Tooltip Label */}
            <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 hidden group-hover:block">
              <div className="bg-white text-[#587F93] px-4 py-2 rounded-xl shadow-xl border border-gray-100 whitespace-nowrap text-sm font-bold">
                Chat Admin SMAPAS
                <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-white border-r border-t border-gray-100 rotate-45"></div>
              </div>
            </div>

            {/* Main Button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="relative flex items-center justify-center w-12 h-12 lg:w-14 lg:h-14 bg-[#587F93] text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 active:scale-90"
            >
              <Headset size={28} className="lg:w-8 lg:h-8" />
            </a>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ChatCS;