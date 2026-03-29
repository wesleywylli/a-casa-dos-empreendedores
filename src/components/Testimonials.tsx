import React, { useState } from 'react';
import { motion } from 'motion/react';

const testimonials = [
  {
    id: 1,
    name: "Ricardo Silva",
    company: "TechMT",
    text: "A Casa mudou minha percepção de networking. Aqui não trocamos cartões, trocamos estratégias de milhões.",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: 2,
    name: "Ana Oliveira",
    company: "AgroCuiabá",
    text: "O ambiente exala autoridade. Estar aqui é um posicionamento de mercado por si só.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: 3,
    name: "Marcos Pontes",
    company: "Logística Pantanal",
    text: "As imersões são o divisor de águas que todo empresário de Mato Grosso precisa.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: 4,
    name: "Juliana Costa",
    company: "Retail Group",
    text: "Networking de altíssimo nível. O retorno sobre o investimento é imediato através das conexões.",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200"
  }
];

// Infinite scroll handled via CSS animation (animate-scroll-x) defined in index.css

export default function Testimonials() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section className="py-20 bg-anthracite overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 mb-12">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono text-xs uppercase tracking-[0.4em] text-cognac mb-4 block"
        >
          Depoimentos
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-sans text-5xl md:text-7xl font-bold text-white uppercase tracking-tighter"
        >
          Vozes da <span className="text-concrete/30 font-normal lowercase">Elite</span>
        </motion.h2>
      </div>

      <div
        className="relative flex overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className="flex gap-8 py-4 animate-scroll-x"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          style={{ animationPlayState: isPaused ? 'paused' : 'running' }}
        >
          {/* Duplicate cards for seamless loop */}
          {[...testimonials, ...testimonials].map((t, i) => (
            <div
              key={`${t.id}-${i}`}
              className="shrink-0 w-[320px] sm:w-[380px] bg-white/5 border border-concrete/10 p-8 sm:p-10 rounded-[1rem] backdrop-blur-sm"
            >
              <div className="flex items-center gap-4 sm:gap-6 mb-6 sm:mb-8">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-cognac/30 shrink-0">
                  <img src={t.image} alt={t.name} className="w-full h-full object-cover grayscale" referrerPolicy="no-referrer" loading="lazy" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-white text-base sm:text-lg">{t.name}</h4>
                  <p className="font-mono text-[10px] text-cognac uppercase tracking-widest">{t.company}</p>
                </div>
              </div>
              <p className="font-sans text-concrete/80 text-base sm:text-lg leading-relaxed italic whitespace-normal">
                "{t.text}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
