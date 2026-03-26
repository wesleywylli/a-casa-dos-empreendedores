import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Instagram, Linkedin, Youtube, MessageCircle } from 'lucide-react';
import MagneticButton from './MagneticButton';

/**
 * FooterV2 — Background full-bleed com img-hall.jpg.
 * Estrutura:
 *   • Área superior: imagem à mostra + CTA centralizado (headline, subhead, botão)
 *   • Área inferior: gradiente escuro → grid de links (logo / nav / social) + copyright
 */

const socialLinks = [
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'LinkedIn', icon: Linkedin, href: '#' },
  { name: 'YouTube', icon: Youtube, href: '#' },
  { name: 'WhatsApp', icon: MessageCircle, href: '#' },
];

const navLinks = ['A Casa', 'Programas', 'Eventos', 'Membros', 'Contato'];

export default function FooterV2() {
  return (
    <footer
      id="footer-v2"
      className="relative overflow-hidden"
      style={{ minHeight: '100vh' }}
    >

      {/* ─────────────── Background ─────────────── */}
      <div className="absolute inset-0">
        <img
          src="/src/assets/img-hall.jpg"
          alt="Hall da Casa dos Empreendedores"
          className="w-full h-full object-cover object-center"
        />

        {/* Gradiente: transparente no topo → escuro no final */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(20,20,20,0.15) 0%, transparent 15%, transparent 40%, rgba(20,20,20,0.65) 62%, #141414 80%)',
          }}
        />

        {/* Vinheta lateral */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, rgba(20,20,20,0.4) 0%, transparent 22%, transparent 78%, rgba(20,20,20,0.4) 100%)',
          }}
        />
      </div>

      {/* ─────────────── Layout em flex column ─────────────── */}
      <div
        className="relative z-10 flex flex-col justify-between"
        style={{ minHeight: '100vh' }}
      >

        {/* ── CTA: posicionado no centro-baixo da imagem ── */}
        <div className="flex-1 flex items-end justify-center pb-16 px-6">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-center max-w-3xl"
          >


            {/* Subhead */}
            <p className="font-sans text-white/60 text-lg md:text-xl leading-relaxed mb-10 max-w-xl mx-auto">
              Junte-se ao ecossistema de líderes e fundadores que estão
              redefinindo o empreendedorismo em Mato Grosso.
            </p>

            {/* Botão */}
            <MagneticButton className="inline-flex items-center gap-3 px-16 py-5 text-base">
              Quero Fazer Parte
            </MagneticButton>
          </motion.div>
        </div>

        {/* ── Área de links (bottom escuro) ── */}
        <div className="container mx-auto px-6">

          {/* Separador */}
          <div className="border-t border-white/15 mb-10" />

          {/* Grid: Logo / Navegação / Social */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pb-6">

            {/* Col 1: Logo + descrição */}
            <div className="space-y-5">
              <img
                src="/src/assets/img-logo.png"
                alt="A Casa dos Empreendedores"
                className="w-auto object-contain brightness-0 invert"
                style={{ height: '6rem' }}
              />
              <p className="font-sans text-white/50 text-sm leading-relaxed max-w-xs">
                O ecossistema de alto desempenho para líderes e fundadores que
                buscam a excelência em Mato Grosso.
              </p>
            </div>

            {/* Col 2: Navegação */}
            <div className="space-y-5">
              <h4 className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/35">
                Navegação
              </h4>
              <ul className="space-y-3">
                {navLinks.map((item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="font-sans text-white/65 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Social */}
            <div className="space-y-5">
              <h4 className="font-mono text-[10px] uppercase tracking-[0.4em] text-white/35">
                Social
              </h4>
              <ul className="space-y-3">
                {socialLinks.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.href}
                      className="group flex items-center gap-3 font-sans text-white/65 hover:text-white transition-colors duration-200 text-sm"
                    >
                      <div className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center group-hover:border-cognac group-hover:bg-cognac/10 transition-all duration-300 shrink-0">
                        <item.icon className="w-3.5 h-3.5" />
                      </div>
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Copyright + links legais */}
          <div className="border-t border-white/10 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="font-mono text-[10px] text-white/25 uppercase tracking-widest">
              © 2026 A Casa dos Empreendedores · Cuiabá, MT
            </span>
            <div className="flex gap-6">
              {['Privacy Policy', 'Terms of Service'].map((label) => (
                <a
                  key={label}
                  href="#"
                  className="font-mono text-[10px] text-white/25 uppercase tracking-widest hover:text-white transition-colors"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
}
