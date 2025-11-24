import React, { useEffect, useState } from 'react';
import { ChevronDown, Terminal, Code2, Globe, Cpu } from 'lucide-react';
import { SITE_CONTENT } from '../constants';

const Hero: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      const x = (clientX / innerWidth - 0.5) * 2;
      const y = (clientY / innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const { hero, contact } = SITE_CONTENT;

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 perspective-1000">
      {/* Layer 0: Deep Background Grid (Moves opposite to mouse, slow) */}
      <div 
        className="absolute inset-0 z-0 opacity-20 transform-gpu transition-transform duration-100 ease-out"
        style={{ 
          transform: `perspective(1000px) rotateX(${60 + mousePos.y * 2}deg) rotateY(${mousePos.x * 2}deg) scale(2)`
        }}
      >
        <div className="absolute inset-0 bg-neon-blue/5 grid-bg" />
      </div>

      {/* Layer 1: Floating Tech Particles (Moves opposite to mouse, fast) */}
      <div 
        className="absolute inset-0 z-0 pointer-events-none"
        style={{ 
          transform: `translate(${mousePos.x * -40}px, ${mousePos.y * -40}px)`,
          transition: 'transform 0.1s ease-out'
        }}
      >
         <Terminal className="absolute top-1/4 left-1/4 text-neon-purple/20 w-16 h-16 animate-float" />
         <Code2 className="absolute bottom-1/3 right-1/4 text-neon-blue/20 w-24 h-24 animate-float delay-1000" />
         <Cpu className="absolute top-1/3 right-10 text-emerald-500/10 w-20 h-20 animate-float delay-500" />
         <Globe className="absolute bottom-20 left-20 text-cyan-500/10 w-12 h-12 animate-float delay-200" />
         <div className="absolute top-1/3 right-1/4 w-4 h-4 bg-neon-blue/30 rounded-full blur-sm" />
         <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-neon-purple/30 rounded-full blur-sm" />
      </div>

      {/* Layer 2: Main Content (Moves slightly opposite to mouse) */}
      <div 
        className="relative z-10 container mx-auto px-6 md:px-12 flex flex-col items-center text-center transform-gpu"
        style={{ 
          transform: `translate(${mousePos.x * -15}px, ${mousePos.y * -15}px)`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-neon-blue/30 bg-neon-blue/5 backdrop-blur-sm shadow-[0_0_15px_rgba(0,243,255,0.2)]">
          <span className="text-neon-blue text-xs font-mono tracking-widest uppercase">{hero.status}</span>
        </div>

        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-6 neon-glow">
          <span className="block text-slate-400 text-2xl md:text-4xl font-normal mb-2 tracking-normal font-mono">{hero.greeting}</span>
          {hero.name}
        </h1>

        <p className="max-w-2xl text-lg md:text-xl text-slate-400 mb-10 leading-relaxed backdrop-blur-sm">
          A <span className="text-neon-purple font-semibold">{hero.title}</span> {hero.subtitle}
          <br className="hidden md:block"/>
          {hero.description}
        </p>

        <div className="flex items-center gap-4 mb-12">
          <a href="#projects" className="px-8 py-3 bg-neon-blue text-neon-dark font-bold rounded-lg hover:bg-cyan-300 transition-all shadow-[0_0_20px_rgba(0,243,255,0.3)] hover:shadow-[0_0_30px_rgba(0,243,255,0.5)] transform hover:-translate-y-1">
            {hero.cta.primary}
          </a>
          <a href="#contact" className="px-8 py-3 glass-panel text-white font-semibold rounded-lg hover:bg-white/10 transition-all border border-white/10 hover:border-white/30">
            {hero.cta.secondary}
          </a>
        </div>

        {/* Social Links */}
        <div className="flex gap-6 text-slate-400">
          {contact.socialLinks.map((link, idx) => {
            const Icon = link.icon;
            return (
              <a key={idx} href={link.url} className="hover:text-neon-blue transition-colors hover:scale-110 transform duration-200" aria-label={link.platform}>
                <Icon size={24} />
              </a>
            );
          })}
        </div>
      </div>

      {/* Layer 3: Foreground Elements (Moves with mouse, very fast) */}
      <div 
        className="absolute inset-0 pointer-events-none z-20"
        style={{ 
          transform: `translate(${mousePos.x * 20}px, ${mousePos.y * 20}px)`,
          transition: 'transform 0.1s ease-out'
        }}
      >
        {/* Decorative geometrical shapes */}
        <div className="absolute top-1/4 left-10 md:left-20 w-20 h-20 border border-neon-purple/20 rounded-xl animate-float opacity-50 rotate-12 backdrop-blur-[2px]" />
        <div className="absolute bottom-1/3 right-10 md:right-20 w-32 h-32 border border-neon-blue/20 rounded-full animate-float opacity-50 delay-700 backdrop-blur-[2px]" />
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-slate-500 z-30">
        <ChevronDown size={24} />
      </div>
    </section>
  );
};

export default Hero;