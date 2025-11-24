import React from 'react';
import { SKILLS_DATA } from '../constants';

const Skills: React.FC = () => {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Subtler tilt for skills
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    
    card.style.setProperty('--rx', `${rotateX}deg`);
    card.style.setProperty('--ry', `${rotateY}deg`);
    card.style.setProperty('--s', '1.02');
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.setProperty('--rx', '0deg');
    card.style.setProperty('--ry', '0deg');
    card.style.setProperty('--s', '1');
  };

  return (
    <section id="skills" className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-700 to-transparent opacity-50" />
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="text-neon-purple font-mono text-sm tracking-wider uppercase mb-2 block">My Arsenal</span>
          <h2 className="text-3xl md:text-5xl font-bold text-white">Technical <span className="text-neon-blue">Skills</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 perspective-1000">
          {SKILLS_DATA.map((category, idx) => {
            const Icon = category.icon;
            return (
              <div 
                key={idx} 
                className="glass-panel p-8 rounded-2xl border border-slate-800 hover:border-neon-blue/30 transition-all duration-300 group tilt-card"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <div className="flex items-center gap-4 mb-8 tilt-card-content">
                  <div className="p-3 rounded-lg bg-slate-900 border border-slate-700 group-hover:border-neon-blue/50 transition-colors shadow-lg">
                    <Icon className="text-neon-blue w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">{category.title}</h3>
                </div>
                
                <div className="flex flex-wrap gap-3 tilt-card-content">
                  {category.skills.map((skill, sIdx) => (
                    <span 
                      key={sIdx} 
                      className="px-3 py-1 text-sm text-slate-300 bg-slate-800/50 border border-slate-700 rounded-full hover:text-neon-blue hover:border-neon-blue/30 transition-colors cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Decorative running code background */}
        <div className="mt-20 border-t border-slate-800 pt-10 relative overflow-hidden opacity-30 pointer-events-none">
             <div className="flex gap-12 animate-marquee whitespace-nowrap font-mono text-xs text-slate-600">
                <span>const init = () =&gt; &#123; return "Awesome"; &#125;;</span>
                <span>import &#123; Future &#125; from 'reality';</span>
                <span>while(alive) &#123; code(); &#125;</span>
                <span>git commit -m "Fixed universe bug"</span>
                <span>sudo rm -rf /bad-vibes</span>
                <span>npm install success-matrix</span>
             </div>
        </div>
      </div>
      
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Skills;