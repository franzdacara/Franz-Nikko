import React from 'react';
import { ArrowDown } from 'lucide-react';
import { SITE_CONTENT } from '../constants';

const Hero: React.FC = () => {
  const { hero, contact } = SITE_CONTENT;

  return (
    <section id="home" className="relative min-h-screen flex items-end pb-24 pt-32 overflow-hidden">

      {/* Minimal grid background */}
      <div className="absolute inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundSize: '60px 60px',
          backgroundImage: 'linear-gradient(to right, #e4e4e7 1px, transparent 1px), linear-gradient(to bottom, #e4e4e7 1px, transparent 1px)',
        }}
      />

      {/* Accent line — vertical, left-aligned */}
      <div className="absolute left-6 md:left-12 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-accent/20 to-transparent z-0" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end">

          {/* Main content — left-weighted */}
          <div className="lg:col-span-8">

            {/* Status badge */}
            <div className="inline-flex items-center gap-2 mb-8">
              <span className="w-2 h-2 bg-accent rounded-full" />
              <span className="section-label">{hero.status}</span>
            </div>

            <h1 className="text-display text-text-primary mb-6">
              <span className="block text-text-muted text-lg md:text-xl font-normal font-mono tracking-wide mb-3">{hero.greeting}</span>
              {hero.name}
              <span className="text-accent">.</span>
            </h1>

            <p className="text-lg md:text-xl text-text-secondary max-w-2xl mb-4 leading-relaxed">
              {hero.subtitle}
            </p>

            <p className="font-mono text-sm text-text-muted max-w-xl mb-10 leading-relaxed">
              {hero.description}
            </p>

            {/* CTA row */}
            <div className="flex flex-wrap items-center gap-4 mb-12">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-surface font-semibold text-sm hover:bg-accent-hover transition-colors duration-150"
              >
                {hero.cta.primary}
              </a>
              <a
                href={SITE_CONTENT.brand.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border border-border text-text-secondary text-sm font-medium hover:border-text-muted hover:text-text-primary transition-all duration-150"
              >
                {hero.cta.secondary}
              </a>
            </div>

            {/* Social links — horizontal, minimal */}
            <div className="flex items-center gap-6">
              {contact.socialLinks.map((link, idx) => {
                const Icon = link.icon;
                return (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-text-muted hover:text-accent transition-colors duration-150"
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

          {/* Right column — metadata sidebar */}
          <div className="lg:col-span-4 hidden lg:flex flex-col gap-6 items-end text-right">
            <div className="border-r border-border pr-6 space-y-6">
              <div>
                <span className="font-mono text-[11px] text-text-muted tracking-wider uppercase block mb-1">Role</span>
                <span className="text-sm text-text-primary">{hero.title}</span>
              </div>
              <div>
                <span className="font-mono text-[11px] text-text-muted tracking-wider uppercase block mb-1">Stack</span>
                <span className="text-sm text-text-primary font-mono">Laravel · React · PHP</span>
              </div>
              <div>
                <span className="font-mono text-[11px] text-text-muted tracking-wider uppercase block mb-1">Availability</span>
                <span className="text-sm text-accent">{hero.status}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <ArrowDown size={16} className="text-text-muted animate-bounce" />
      </div>
    </section>
  );
};

export default Hero;