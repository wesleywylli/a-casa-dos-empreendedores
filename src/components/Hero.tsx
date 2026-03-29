import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import MagneticButton from './MagneticButton';
import { Play, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Add Wistia type to window
  useEffect(() => {
    (window as any)._wq = (window as any)._wq || [];
  }, []);

  // Scroll locking when modal is open
  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  // Wistia API integration for "close on end"
  useEffect(() => {
    if (isModalOpen) {
      const script = document.createElement('script');
      script.src = "https://fast.wistia.com/assets/external/E-v1.js";
      script.async = true;
      document.body.appendChild(script);

      (window as any)._wq = (window as any)._wq || [];
      (window as any)._wq.push({
        id: "v5998t2rqw",
        onReady: (video: any) => {
          video.bind("end", () => {
            handleCloseAndScroll();
          });
        }
      });

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [isModalOpen]);

  const handleCloseAndScroll = () => {
    setIsModalOpen(false);
    // Smooth scroll to the next section
    const nextSection = document.getElementById('founders');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* 
      // Comentado para evitar que o conteúdo suma no scroll
      gsap.to(titleRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        },
        y: 200,
        opacity: 0,
        scale: 0.9,
        ease: "none"
      });
      */

      // Video scale effect
      gsap.to(videoContainerRef.current, {
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        },
        scale: 1.1,
        ease: "none"
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative h-[100dvh] w-full overflow-hidden"
    >
      {/* Background Video */}
      <div ref={videoContainerRef} className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-anthracite/70 z-10" />
        <div className="absolute inset-0 w-full h-full scale-110">
          <iframe
            src="https://fast.wistia.net/embed/iframe/s6a5yu4aem?seo=false&videoFoam=false&autoplay=1&muted=1&playsinline=1&endVideoBehavior=loop&controlsVisibleOnLoad=false&fullscreenButton=false&playbackRateControl=false&playButton=false&playbar=false&settingsControl=false"
            title="Background Video"
            allow="autoplay; fullscreen"
            frameBorder="0"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto object-cover grayscale"
            style={{ width: '177.78vh', height: '100vh', minWidth: '100vw', minHeight: '56.25vw' }}
          />
        </div>
        {/* Subtle glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-amber-glow/5 blur-[120px] rounded-full pointer-events-none" />

        {/* Bottom gradient for seamless transition */}
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-anthracite to-transparent z-10" />
      </div>

      <div className="container relative z-20 mx-auto px-4 sm:px-6 h-full flex flex-col items-center justify-end pb-12 sm:pb-20">
        {/* Center Content */}
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.2 }}
          className="flex flex-col items-center text-center max-w-5xl w-full px-2 mb-12"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 0.8, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.4em] sm:tracking-[0.5em] text-cognac mb-4 sm:mb-8"
          >
            A Casa dos Empreendedores
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="font-sans text-[clamp(2.5rem,12vw,7.5rem)] font-bold uppercase tracking-tighter text-white leading-[0.85] mb-6 sm:mb-10"
          >
            Epicentro do <br />
            <span className="text-cognac font-normal lowercase block sm:inline">Empreendedorismo</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 0.6, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="font-sans text-concrete text-sm sm:text-base md:text-lg max-w-xl mb-8 leading-relaxed"
          >
            Transformando o estado através de conexões de alto impacto,{' '}
            <span className="hidden md:inline"><br /></span>
            conhecimento estratégico e escala para o próximo nível.
          </motion.p>
        </motion.div>

        {/* Bottom Action */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          onClick={() => setIsModalOpen(true)}
          className="group flex flex-col items-center gap-4 sm:gap-6 interactive"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-cognac/30 flex items-center justify-center group-hover:bg-cognac transition-all duration-500 animate-pulse-subtle">
              <Play className="w-3 h-3 text-cognac group-hover:text-white fill-current" />
            </div>
            <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.3em] sm:tracking-[0.4em] text-concrete/50 group-hover:text-white transition-colors">
              Assistir Manifesto
            </span>
          </div>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-[1px] h-10 sm:h-16 bg-gradient-to-b from-cognac/50 to-transparent"
          />
        </motion.button>
      </div>

      {/* GPS Location Tag */}
      <div className="absolute top-12 left-12 hidden md:flex items-center gap-2">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">
          Cuiabá, MT
        </span>
      </div>

      {/* Manifesto Video Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-6 md:p-12 bg-anthracite/95 backdrop-blur-xl"
          >
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              onClick={handleCloseAndScroll}
              className="absolute top-8 right-8 w-12 h-12 bg-white/10 hover:bg-cognac text-white rounded-full flex items-center justify-center transition-colors z-[210] interactive"
            >
              <X className="w-6 h-6" />
            </motion.button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-6xl aspect-video rounded-3xl overflow-hidden border border-concrete/20 shadow-2xl"
            >
              <iframe
                src="https://fast.wistia.net/embed/iframe/v5998t2rqw?seo=false&videoFoam=true&autoplay=0"
                title="Manifesto Video"
                allow="autoplay; fullscreen"
                frameBorder="0"
                className="w-full h-full"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
