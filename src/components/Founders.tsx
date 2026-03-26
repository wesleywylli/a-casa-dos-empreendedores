import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';

const founders = [
  {
    id: 'eder',
    name: 'Eder Rodrigues',
    role: 'Mestre em Operações',
    description: 'O arquiteto da eficiência. Eder transforma processos complexos em máquinas de lucro.',
    image: '/src/assets/img-eder.jpg',
    color: 'rgba(184, 176, 165, 0.15)'
  },
  {
    id: 'matheus',
    name: 'Matheus Borges',
    role: 'Visionário & Estrategista',
    description: 'Especialista em escala e novos mercados, Matheus traz a visão de futuro para a Casa.',
    image: '/src/assets/img-matheus.jpg',
    color: 'rgba(255, 179, 71, 0.15)'
  },
  {
    id: 'paulo',
    name: 'Paulo Lemes',
    role: 'Líder de Comunidade',
    description: 'Conector nato. Paulo é o coração pulsante do networking na Casa dos Empreendedores.',
    image: '/src/assets/img-paulo.jpg',
    color: 'rgba(204, 161, 84, 0.15)'
  }
];

export default function Founders() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <section id="founders" className="relative py-32 bg-anthracite overflow-hidden">
      {/* Dynamic Background Glow */}
      <AnimatePresence>
        {hoveredId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none z-0 transition-colors duration-700"
            style={{
              background: `radial-gradient(circle at center, ${founders.find(f => f.id === hoveredId)?.color}, transparent 70%)`
            }}
          />
        )}
      </AnimatePresence>

      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-20">
          <span className="font-mono text-xs uppercase tracking-[0.4em] text-cognac mb-4 block">A Tríade</span>
          <h2 className="font-sans text-5xl md:text-7xl font-bold text-white uppercase tracking-tighter">
            Os Fundadores
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-4 sm:gap-6 h-auto md:h-[600px]">
          {founders.map((founder) => (
            <motion.div
              key={founder.id}
              onMouseEnter={() => setHoveredId(founder.id)}
              onMouseLeave={() => setHoveredId(null)}
              className={cn(
                "relative group cursor-pointer overflow-hidden rounded-[1rem] border border-concrete/10 bg-white/5 transition-all duration-700 h-[280px] sm:h-[360px] md:h-full",
                hoveredId === founder.id ? "md:flex-[2]" : "md:flex-1"
              )}
              layout
            >
              <img
                src={founder.image}
                alt={founder.name}
                className="absolute inset-0 h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-110 group-hover:scale-100"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-anthracite via-anthracite/20 to-transparent opacity-80" />

              <div className="absolute bottom-0 left-0 p-6 sm:p-10 w-full">
                <div className="overflow-hidden">
                  <motion.p
                    className="font-mono text-[10px] uppercase tracking-widest text-cognac mb-2"
                    animate={{ y: hoveredId === founder.id ? 0 : 20 }}
                  >
                    {founder.role}
                  </motion.p>
                </div>
                <h3 className="font-sans text-3xl font-bold text-white mb-4">{founder.name}</h3>

                <motion.div
                  initial={false}
                  animate={{
                    height: hoveredId === founder.id ? 'auto' : 0,
                    opacity: hoveredId === founder.id ? 1 : 0
                  }}
                  className="overflow-hidden"
                >
                  <p className="font-sans text-concrete/70 text-sm leading-relaxed max-w-xs">
                    {founder.description}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
