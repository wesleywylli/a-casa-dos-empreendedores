import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const events = [
  {
    id: 1,
    title: 'Entrepreneur Summit 2026',
    date: '15.MAI.2026',
    location: 'Centro de Eventos Pantanal',
    type: 'Summit',
    image: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 2,
    title: 'Mastermind: Scaling Up',
    date: '22.JUN.2026',
    location: 'Casa dos Empreendedores',
    type: 'Workshop',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200'
  },
  {
    id: 3,
    title: 'Networking Night: Noir',
    date: '08.JUL.2026',
    location: 'Exclusive Lounge',
    type: 'Networking',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1200'
  }
];

export default function Events() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        const isLast = index === events.length - 1;
        if (isLast) return;

        gsap.to(card, {
          scrollTrigger: {
            trigger: card,
            start: "top top",
            end: "bottom top",
            scrub: true,
            pin: true,
            pinSpacing: false
          },
          scale: 0.9,
          filter: "blur(20px)",
          opacity: 0.5,
          ease: "none"
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="events" className="bg-anthracite">
      <div className="container mx-auto px-6 py-32">
        <span className="font-mono text-xs uppercase tracking-[0.4em] text-cognac mb-4 block">Calendário</span>
        <h2 className="font-sans text-5xl md:text-7xl font-bold text-white uppercase tracking-tighter mb-20">
          Eventos <span className="text-concrete/30 font-normal lowercase">Exclusivos</span>
        </h2>
      </div>

      <div className="flex flex-col">
        {events.map((event, index) => (
          <div
            key={event.id}
            ref={el => cardsRef.current[index] = el}
            className="h-screen w-full flex items-center justify-center sticky top-0 overflow-hidden"
          >
            <div className="absolute inset-0 z-0">
              <img
                src={event.image}
                alt={event.title}
                className="h-full w-full object-cover grayscale brightness-[0.3]"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-anthracite via-transparent to-anthracite" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
              <div className="max-w-4xl">
                <div className="flex items-center gap-4 mb-8">
                  <span className="px-4 py-1 border border-cognac/50 rounded-full font-mono text-[10px] text-cognac uppercase tracking-widest">
                    {event.type}
                  </span>
                  <div className="h-[1px] w-12 bg-concrete/20" />
                  <span className="font-mono text-[10px] text-concrete/50 uppercase tracking-widest">
                    {event.date}
                  </span>
                </div>

                <h3 className="font-sans text-6xl md:text-9xl font-bold text-white uppercase tracking-tighter mb-12 leading-[0.9]">
                  {event.title}
                </h3>

                <div className="flex flex-wrap items-center gap-12">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-cognac" />
                    <span className="font-sans text-concrete/70 text-lg">{event.location}</span>
                  </div>

                  <button className="group flex items-center gap-4 font-mono text-xs uppercase tracking-[0.3em] text-white hover:text-cognac transition-colors">
                    Ver Detalhes <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </button>
                </div>
              </div>
            </div>

            {/* Architectural Border */}
            <div className="absolute inset-12 border border-concrete/10 rounded-[2.5rem] pointer-events-none" />
          </div>
        ))}
      </div>
    </section>
  );
}
