import React, { useEffect, useState } from 'react';

const ArchitecturalBackground: React.FC = () => {
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
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Parallax offsets (subtle speeds to prevent disorientation and maintain 60fps)
  const parallaxOffsetSlow = scrollY * 0.08;
  const parallaxOffsetMid = scrollY * 0.16;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none" aria-hidden="true">

      {/* Layer 1: Structural Vertical Guidelines aligned with max-w-7xl layout */}
      <div className="max-w-7xl mx-auto h-full px-6 relative">
        {/* Left column guide */}
        <div className="absolute left-6 top-0 bottom-0 w-px bg-white/[0.02]" />
        {/* 25% column guide */}
        <div className="absolute left-1/4 top-0 bottom-0 w-px bg-white/[0.015] hidden md:block" />
        {/* Center column guide */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-white/[0.02]" />
        {/* 75% column guide */}
        <div className="absolute left-3/4 top-0 bottom-0 w-px bg-white/[0.015] hidden md:block" />
        {/* Right column guide */}
        <div className="absolute right-6 top-0 bottom-0 w-px bg-white/[0.02]" />
      </div>

      {/* Layer 2: Parallax Fine Architectural Grid (Translates at 0.08x) */}
      <div
        className="absolute inset-0 opacity-[0.035] will-change-transform"
        style={{
          transform: `translate3d(0, ${parallaxOffsetSlow}px, 0)`,
          backgroundSize: '80px 80px',
          backgroundImage: 'linear-gradient(to right, #e4e4e7 1px, transparent 1px), linear-gradient(to bottom, #e4e4e7 1px, transparent 1px)',
        }}
      />

      {/* Layer 3: Parallax Technical Crosshairs and Blueprint Coordinates (Translates at 0.16x) */}
      <div
        className="absolute inset-0 will-change-transform"
        style={{
          transform: `translate3d(0, ${-parallaxOffsetMid}px, 0)`,
        }}
      >
        <div className="max-w-7xl mx-auto h-full px-6 relative">
          {/* Top-left marker */}
          <div className="absolute top-[20%] left-6 -translate-x-1/2 font-mono text-[10px] text-zinc-700/60 select-none">
            +
          </div>
          {/* Top-right marker */}
          <div className="absolute top-[35%] right-6 translate-x-1/2 font-mono text-[10px] text-zinc-700/60 select-none">
            +
          </div>
          {/* Mid-left marker with coordinates */}
          <div className="absolute top-[50%] left-6 -translate-x-1/2 font-mono text-[10px] text-zinc-700/60 flex items-center gap-2 select-none">
            <span>+</span>
            <span className="hidden xl:inline text-[9px] text-zinc-700/40 tracking-widest pl-1">07°04'N // 125°36'E</span>
          </div>
          {/* Mid-right marker */}
          <div className="absolute top-[65%] right-6 translate-x-1/2 font-mono text-[10px] text-zinc-700/60 select-none">
            +
          </div>
          {/* Lower-left marker */}
          <div className="absolute top-[80%] left-6 -translate-x-1/2 font-mono text-[10px] text-zinc-700/60 select-none">
            +
          </div>
          {/* Lower-right marker with system tag */}
          <div className="absolute top-[90%] right-6 translate-x-1/2 font-mono text-[10px] text-zinc-700/60 flex items-center gap-2 select-none">
            <span className="hidden xl:inline text-[9px] text-zinc-700/40 tracking-widest pr-1">SYS // 60FPS.PARALLAX</span>
            <span>+</span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ArchitecturalBackground;
