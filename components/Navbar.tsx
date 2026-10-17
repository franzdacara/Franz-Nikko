import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { SITE_CONTENT } from '../constants';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 40);
          const winScroll = document.documentElement.scrollTop;
          const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
          if (height > 0) {
            setScrollProgress((winScroll / height) * 100);
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');

    if (targetId === '' || href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsOpen(false);
      return;
    }

    const element = document.getElementById(targetId);
    if (element) {
      const navHeight = 72;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - navHeight;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-200 ${scrolled
        ? 'bg-surface/95 backdrop-blur-md border-border py-3 shadow-lg'
        : 'bg-transparent py-5'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center relative">
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => handleNavClick(e, '#')}
          className="flex items-center gap-0 group cursor-pointer"
        >
          <span className="font-mono font-bold text-sm tracking-tight text-text-primary group-hover:text-accent transition-colors duration-150">
            {SITE_CONTENT.brand.name}
          </span>
          <span className="font-mono font-bold text-sm text-accent">{SITE_CONTENT.brand.domain}</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-xs font-mono tracking-wide text-text-muted hover:text-text-primary px-3 py-2 transition-colors duration-150 relative group"
            >
              <span>{link.name}</span>
              <span className="absolute bottom-1 left-3 right-3 h-px bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-150 origin-left" />
            </a>
          ))}
          <a
            href={SITE_CONTENT.brand.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono tracking-wide text-text-muted hover:text-text-primary px-3 py-2 transition-colors duration-150"
          >
            Resume ↗
          </a>
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="btn-tactile-primary ml-4 text-xs font-mono tracking-wide px-4 py-2 font-semibold"
          >
            Contact
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-text-secondary hover:text-text-primary transition-colors p-1"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Hardware-Accelerated Scroll Progress Indicator */}
      <div
        className="absolute bottom-0 left-0 h-[1.5px] bg-accent transition-all duration-75 will-change-transform"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Mobile Drawer */}
      <div
        className={`md:hidden fixed inset-x-0 top-[100%] bg-surface-raised border-b border-border transition-all duration-200 overflow-hidden ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
          }`}
      >
        <div className="px-6 py-4 flex flex-col gap-3 font-mono text-xs">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-text-secondary hover:text-accent py-2 transition-colors border-b border-border/50"
            >
              {link.name}
            </a>
          ))}
          <a
            href={SITE_CONTENT.brand.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-secondary hover:text-accent py-2 transition-colors border-b border-border/50"
          >
            Resume ↗
          </a>
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="btn-tactile-primary text-center py-2.5 mt-2 font-semibold"
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;