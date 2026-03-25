import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react'; // AnimatePresence mantido para o shuffler de cards
import { cn } from '@/src/lib/utils';
import { Target, TrendingUp, Users } from 'lucide-react';

const programs = [
  {
    id: 1,
    title: 'Mentoria Elite',
    category: 'Estratégia',
    description: 'Acompanhamento direto com os fundadores para escalar seu faturamento.',
    icon: Target,
    stats: '12 Vagas Restantes'
  },
  {
    id: 2,
    title: 'Mastermind Cuiabá',
    category: 'Networking',
    description: 'O círculo interno dos maiores empresários da região.',
    icon: Users,
    stats: 'Membros Ativos: 48'
  },
  {
    id: 3,
    title: 'Imersão Escala',
    category: 'Performance',
    description: '3 dias intensivos de reestruturação operacional e financeira.',
    icon: TrendingUp,
    stats: 'Próxima: Abril 2026'
  }
];


export default function Programs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);


  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % programs.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const nextProgram = () => setActiveIndex((prev) => (prev + 1) % programs.length);

  return (
    <section
      id="programs"
      className="py-32 bg-anthracite relative overflow-hidden"
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* Diagnostic Shuffler */}
          <div className="relative h-[500px] flex items-center justify-center">

            <div className="absolute inset-0 bg-amber-glow/5 blur-[100px] rounded-full" />

            <div className="relative w-full max-w-md h-[400px]">
              <AnimatePresence mode="popLayout" initial={true}>
                <motion.div
                  key={programs[activeIndex].id}
                  initial={{ y: 50, opacity: 0, scale: 0.9, rotate: 2 }}
                  animate={{ y: 0, opacity: 1, scale: 1, rotate: 0, zIndex: 10 }}
                  exit={{ y: -20, opacity: 0, scale: 1.05, rotate: -2, zIndex: 0 }}
                  transition={{
                    type: 'spring',
                    damping: 25,
                    stiffness: 120,
                    opacity: { duration: 0.4 }
                  }}
                  className="absolute inset-0 bg-white/5 border border-concrete/20 p-12 rounded-[1rem] backdrop-blur-xl shadow-2xl cursor-pointer"
                  onClick={nextProgram}
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                >
                  <div className="w-16 h-16 bg-cognac/20 rounded-2xl flex items-center justify-center mb-8">
                    {React.createElement(programs[activeIndex].icon, { className: "w-8 h-8 text-cognac" })}
                  </div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-concrete/50 mb-2 block">
                    {programs[activeIndex].category}
                  </span>
                  <h3 className="font-sans text-4xl font-bold text-white mb-6">{programs[activeIndex].title}</h3>
                  <p className="font-sans text-concrete/70 mb-8 leading-relaxed">
                    {programs[activeIndex].description}
                  </p>
                  <div className="pt-6 border-t border-concrete/10 flex items-center justify-between">
                    <span className="font-mono text-[10px] text-cognac uppercase tracking-wider">{programs[activeIndex].stats}</span>
                    <div className="flex gap-1">
                      {programs.map((_, i) => (
                        <div
                          key={i}
                          className={cn(
                            "w-1.5 h-1.5 rounded-full transition-colors",
                            i === activeIndex ? "bg-cognac" : "bg-concrete/20"
                          )}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-12">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.4em] text-cognac mb-4 block">Programas & Imersões</span>
              <h2 className="font-sans text-5xl md:text-7xl font-bold text-white uppercase tracking-tighter mb-8">
                Arquitetura de <br /> <span className="text-concrete/30 font-normal lowercase">Performance</span>
              </h2>
              <p className="font-sans text-concrete/70 text-lg max-w-xl leading-relaxed">
                Nossos programas não são cursos. São artefatos funcionais desenhados para diagnosticar e resolver os gargalos que impedem sua empresa de chegar ao próximo nível.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
