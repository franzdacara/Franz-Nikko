import React, { useEffect, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { SITE_CONTENT } from '../constants';
import { useScrollReveal } from '../hooks/useScrollReveal';
import StarfieldBackground from './StarfieldBackground';
import VisitorCounter from './VisitorCounter';

const Hero: React.FC = () => {
  const { hero, contact } = SITE_CONTENT;
  const { ref: heroRef, isVisible } = useScrollReveal({ threshold: 0.05 });
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-end pb-24 pt-32 overflow-hidden"
    >
      {/* 3D Moving Stars Background */}
      <StarfieldBackground speed={1.2} starCount={320} />

      {/* Accent vertical line with subtle parallax gradient */}
      <div
        className="absolute left-6 md:left-12 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-accent/25 to-transparent z-0 will-change-transform"
        style={{ transform: `translate3d(0, ${scrollY * 0.05}px, 0)` }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">

          {/* Main content — left-weighted */}
          <div className="lg:col-span-8">

            {/* Heading */}
            <h1 className={`text-display text-text-primary mb-6 reveal-init delay-150 ${isVisible ? 'reveal-visible' : ''}`}>
              <span className="block text-text-muted text-lg md:text-xl font-normal font-mono tracking-wide mb-3">
                {hero.greeting}
              </span>
              {hero.name}
              <span className="text-accent">.</span>
            </h1>

            {/* Subtitle */}
            <p className={`text-lg md:text-xl text-text-secondary max-w-2xl mb-4 leading-relaxed reveal-init delay-225 ${isVisible ? 'reveal-visible' : ''}`}>
              {hero.subtitle}
            </p>

            {/* Description */}
            <p className={`font-mono text-sm text-text-muted max-w-xl mb-10 leading-relaxed reveal-init delay-300 ${isVisible ? 'reveal-visible' : ''}`}>
              {hero.description}
            </p>

            {/* CTA row — Tactile anti-AI buttons */}
            <div className={`flex flex-wrap items-center gap-4 mb-12 reveal-init delay-375 ${isVisible ? 'reveal-visible' : ''}`}>
              <a
                href="#projects"
                className="btn-tactile-primary inline-flex items-center gap-2 px-6 py-3 font-semibold text-sm font-mono tracking-wide"
              >
                {hero.cta.primary}
              </a>
              <a
                href={SITE_CONTENT.brand.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-tactile-secondary inline-flex items-center gap-2 px-6 py-3 text-sm font-mono tracking-wide"
              >
                {hero.cta.secondary}
              </a>
            </div>

            {/* Social links */}
            <div className={`flex items-center gap-6 reveal-init delay-450 ${isVisible ? 'reveal-visible' : ''}`}>
              {contact.socialLinks.map((link, idx) => {
                const Icon = link.icon;
                return (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-muted hover:text-accent transition-colors duration-150 p-1"
                    aria-label={link.platform}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
              <span className="w-12 h-px bg-border" />
              <span className="font-mono text-xs text-text-muted">Davao City, PH</span>
            </div>
          </div>

          {/* Right column — metadata sidebar with subtle parallax float */}
          <div
            className={`lg:col-span-4 hidden lg:flex flex-col gap-6 items-end text-right will-change-transform reveal-init delay-300 ${isVisible ? 'reveal-visible' : ''}`}
            style={{ transform: isVisible ? `translate3d(0, ${-scrollY * 0.08}px, 0)` : undefined }}
          >
            <div className="border-r border-border pr-6 space-y-6 relative corner-crosshair">
              <div>
                <span className="font-mono text-[11px] text-text-muted tracking-wider uppercase block mb-1">Role</span>
                <span className="text-sm text-text-primary font-medium">{hero.title}</span>
              </div>
              <div>
                <span className="font-mono text-[11px] text-text-muted tracking-wider uppercase block mb-1">Stack</span>
                <span className="text-sm text-text-primary font-mono">Laravel · Python · React</span>
              </div>
              <div>
                <span className="font-mono text-[11px] text-text-muted tracking-wider uppercase block mb-1">Availability</span>
                <span className="text-sm text-accent font-mono flex items-center justify-end gap-1.5">
                  <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
                  {hero.status}
                </span>
              </div>
              <div>
                <span className="font-mono text-[11px] text-text-muted tracking-wider uppercase block mb-1">Timezone</span>
                <span className="text-xs text-text-muted font-mono">UTC+08:00 (PHT)</span>
              </div>
              <div className="pt-2 border-t border-border/50">
                <span className="font-mono text-[11px] text-text-muted tracking-wider uppercase block mb-1">Telemetry</span>
                <span className="text-xs font-mono text-text-muted flex items-center justify-end gap-1.5">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                  <VisitorCounter variant="minimal" />
                  <span className="text-[10px] text-text-muted tracking-wider">VISITS</span>
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <a href="#about" aria-label="Scroll to About section" className="block p-2 text-text-muted hover:text-accent transition-colors">
          <ArrowDown size={16} className="animate-bounce" />
        </a>
      </div>
    </section>
  );
};

export default Hero;