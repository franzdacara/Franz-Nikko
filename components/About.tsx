import React from 'react';
import { SITE_CONTENT } from '../constants';

const About: React.FC = () => {
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Tilt the image container
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;

    card.style.setProperty('--rx', `${rotateX}deg`);
    card.style.setProperty('--ry', `${rotateY}deg`);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.setProperty('--rx', '0deg');
    card.style.setProperty('--ry', '0deg');
  };

  const { about } = SITE_CONTENT;

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center gap-16">

          {/* Image/Visual Side with 3D Tilt */}
          <div
            className="w-full md:w-1/2 relative group perspective-1000"
          >
            <div
              className="tilt-card"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-neon-blue to-neon-purple opacity-20 rounded-2xl blur-xl group-hover:opacity-30 transition-opacity duration-500 -z-10" />
              <div className="relative rounded-2xl overflow-hidden border border-slate-700 glass-panel p-2">
                <img
                  src={about.image}
                  alt="Developer Profile"
                  className="w-full h-auto rounded-xl filter grayscale hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute bottom-4 right-4 bg-black/80 backdrop-blur text-xs font-mono px-3 py-1 rounded text-neon-blue border border-neon-blue/20 tilt-card-content shadow-lg">
                  System.ready
                </div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
              {about.title.split(' ').map((word, i) =>
                i === 1 ? <span key={i} className="text-neon-blue"> {word} </span> : word + ' '
              )}
            </h2>
            {about.description.map((paragraph, idx) => (
              <p key={idx} className="text-slate-400 text-lg leading-relaxed mb-6">
                {paragraph}
              </p>
            ))}

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">
              {about.stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div key={idx} className="p-4 rounded-xl border border-slate-800 bg-slate-900/50 hover:border-neon-blue/50 transition-colors">
                    <Icon className="text-neon-purple mb-3" size={24} />
                    <h3 className="font-bold text-white mb-1">{stat.label}</h3>
                    <p className="text-sm text-slate-500">{stat.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;