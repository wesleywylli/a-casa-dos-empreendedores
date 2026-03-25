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

export default function Testimonials() {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section className="py-32 bg-anthracite overflow-hidden">
      <div className="container mx-auto px-6 mb-20">
        <span className="font-mono text-xs uppercase tracking-[0.4em] text-cognac mb-4 block">Depoimentos</span>
        <h2 className="font-sans text-5xl md:text-7xl font-bold text-white uppercase tracking-tighter">
          Vozes da <span className="text-concrete/30 font-normal lowercase">Elite</span>
        </h2>
      </div>

      <div
        className="relative flex overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <motion.div
          className="flex whitespace-nowrap gap-8 py-4"
          animate={isPaused ? { x: -1035 } : { x: [0, -1035] }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {[...testimonials, ...testimonials].map((t, i) => (
            <div
              key={`${t.id}-${i}`}
              className="inline-block w-[450px] bg-white/5 border border-concrete/10 p-10 rounded-[1rem] backdrop-blur-sm"
            >
              <div className="flex items-center gap-6 mb-8">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-cognac/30">
                  <img src={t.image} alt={t.name} className="w-full h-full object-cover grayscale" referrerPolicy="no-referrer" loading="lazy" />
                </div>
                <div>
                  <h4 className="font-sans font-bold text-white text-lg">{t.name}</h4>
                  <p className="font-mono text-[10px] text-cognac uppercase tracking-widest">{t.company}</p>
                </div>
              </div>
              <p className="font-sans text-concrete/80 text-lg leading-relaxed italic whitespace-normal">
                "{t.text}"
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
