import React from 'react';
import MagneticButton from './MagneticButton';
import { Instagram, Linkedin, Youtube, MessageCircle } from 'lucide-react';

const socialLinks = [
  { name: 'Instagram', icon: Instagram, href: '#' },
  { name: 'LinkedIn', icon: Linkedin, href: '#' },
  { name: 'YouTube', icon: Youtube, href: '#' },
  { name: 'WhatsApp', icon: MessageCircle, href: '#' },
];

export default function Footer() {
  return (
    <footer className="bg-anthracite pt-32 pb-12 border-t border-concrete/10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-32">
          <div>
            <h2 className="font-sans text-5xl md:text-8xl font-extrabold text-white uppercase tracking-tighter mb-12 leading-[0.85]">
              Pronto para o <br /> <span className="text-cognac font-normal lowercase">Próximo Nível?</span>
            </h2>
            <p className="font-sans text-concrete/70 text-xl max-w-md mb-12">
              A Casa dos Empreendedores não é para todos. É para quem busca a excelência e o topo do mercado.
            </p>
            <MagneticButton className="px-12 py-6 text-lg">Candidatar-se ao Clube</MagneticButton>
          </div>

          <div className="grid grid-cols-2 gap-12">
            <div className="space-y-8">
              <h4 className="font-mono text-[10px] uppercase tracking-[0.4em] text-concrete/40">Navegação</h4>
              <ul className="space-y-4">
                {['A Casa', 'Programas', 'Eventos', 'Membros', 'Contato'].map((item) => (
                  <li key={item}>
                    <a href="#" className="font-sans text-concrete/70 hover:text-white transition-colors text-lg">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-8">
              <h4 className="font-mono text-[10px] uppercase tracking-[0.4em] text-concrete/40">Social</h4>
              <ul className="space-y-6">
                {socialLinks.map((item) => (
                  <li key={item.name}>
                    <a href={item.href} className="group flex items-center gap-4 font-sans text-concrete/70 hover:text-white transition-colors text-lg">
                      <div className="w-10 h-10 rounded-full border border-concrete/10 flex items-center justify-center group-hover:border-cognac group-hover:bg-cognac/10 transition-all">
                        <item.icon className="w-4 h-4" />
                      </div>
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-concrete/10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <span className="font-sans font-black text-2xl text-white tracking-tighter uppercase">A Casa</span>
            <span className="font-mono text-[10px] text-concrete/40 uppercase tracking-widest">© 2026 Cuiabá, Mato Grosso</span>
          </div>
          
          <div className="flex gap-8">
            <a href="#" className="font-mono text-[10px] text-concrete/40 uppercase tracking-widest hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="font-mono text-[10px] text-concrete/40 uppercase tracking-widest hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
