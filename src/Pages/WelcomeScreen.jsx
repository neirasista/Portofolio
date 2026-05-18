import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Github, Globe, User } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

// TYPEWRITER FIX (lebih smooth)
const TypewriterEffect = ({ text }) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let index = 0;

    const timer = setInterval(() => {
      setDisplayText(text.slice(0, index));
      index++;

      if (index > text.length) {
        clearInterval(timer);
      }
    }, 140); // 🔥 FIX: dari 260 → 140ms (lebih smooth)

    return () => clearInterval(timer);
  }, [text]);

  return (
    <span className="inline-block">
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

// BACKGROUND
const BackgroundEffect = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 md:blur-3xl blur-xl animate-pulse" />
    <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/10 via-transparent to-purple-600/10 md:blur-2xl blur-lg" />
  </div>
);

// ICON
const IconButton = ({ Icon }) => (
  <div className="relative group hover:scale-110 transition-transform duration-300">
    <div className="absolute -inset-2 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full blur opacity-30 group-hover:opacity-75 transition duration-300" />
    <div className="relative p-2 sm:p-3 bg-black/50 backdrop-blur-sm rounded-full border border-white/10">
      <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" />
    </div>
  </div>
);

const WelcomeScreen = ({ onLoadingComplete }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
        AOS.init({
      duration: 800,
      once: true,
      disable: window.innerWidth < 768,
    });

    const timer = setTimeout(() => {
      setIsLoading(false);

      setTimeout(() => {
        onLoadingComplete?.();
      }, 1200);
    }, 2500); // 🔥 FIX: dari 3400 → 5000ms (biar gak terlalu cepat)

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 bg-[#030014]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.6 }}
        >
          <BackgroundEffect />

          <div className="relative min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-4xl mx-auto">

              {/* ICONS */}
              <div className="flex justify-center gap-6 mb-10">
                {[Code2, User, Github].map((Icon, i) => (
                  <div key={i} data-aos="fade-down" data-aos-delay={i * 200}>
                    <IconButton Icon={Icon} />
                  </div>
                ))}
              </div>

              {/* TEXT */}
              <div className="text-center mb-10">
                <h1 className="text-4xl md:text-6xl font-bold">
                  <div className="mb-4">
                    <span className="bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent">
                      Welcome To My
                    </span>
                  </div>

                  <div>
                    <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                      Portfolio Website
                    </span>
                  </div>
                </h1>
              </div>

              {/* NAME (NO LINK, TEXT ONLY) */}
              <div className="text-center" data-aos="fade-up" data-aos-delay="800">
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full relative">
                  
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600/20 to-purple-600/20 rounded-full blur-md" />

                  <div className="relative flex items-center gap-2 text-xl md:text-2xl">
                    <Globe className="w-5 h-5 text-indigo-500" />

                    <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
                      <TypewriterEffect text="Indira Sistamarien" />
                    </span>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeScreen;