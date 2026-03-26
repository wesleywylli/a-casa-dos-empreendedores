import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import MagneticButton from './MagneticButton';
import { cn } from '@/src/lib/utils';

const navLinks = [
  { name: 'A Casa', href: '#hero' },
  { name: 'Fundadores', href: '#founders' },
  { name: 'Programas', href: '#programs' },
  { name: 'Eventos', href: '#events' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAtFooter, setIsAtFooter] = useState(false);

  // Esconde navbar quando o footer entra na viewport
  useEffect(() => {
    const footer = document.getElementById('footer-v2');
    if (!footer) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsAtFooter(entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > window.innerHeight * 0.4);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-[100] transition-all duration-700 px-6 py-6 md:px-12",
        isScrolled && !isAtFooter
          ? "py-4 bg-anthracite/80 backdrop-blur-md border-b border-concrete/10 translate-y-0 opacity-100"
          : "-translate-y-full opacity-0 pointer-events-none"
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <a href="#hero" className="group flex items-center">
          <img
            src="/src/assets/img-logo.png"
            alt="A Casa dos Empreendedores"
            className="h-9 w-auto object-contain transition-opacity duration-300 group-hover:opacity-80"
          />
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-12">
          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="font-mono text-[10px] uppercase tracking-widest text-concrete/60 hover:text-white transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-cognac transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>
          <MagneticButton className="px-6 py-2 text-[10px]">Membro</MagneticButton>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-white p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-anthracite border-b border-concrete/10 p-8 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="font-sans text-2xl font-bold text-white uppercase tracking-tighter"
                >
                  {link.name}
                </a>
              ))}
              <MagneticButton className="w-full py-4">Seja um Membro</MagneticButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
