import React from 'react';
import { ExternalLink, Github, ArrowRight } from 'lucide-react';
import { PROJECTS_DATA } from '../constants';

const Projects: React.FC = () => {

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate rotation based on cursor position relative to center
    // Max rotation: 10 degrees
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    card.style.setProperty('--rx', `${rotateX}deg`);
    card.style.setProperty('--ry', `${rotateY}deg`);
    card.style.setProperty('--s', '1.02'); // Scale up slightly
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.setProperty('--rx', '0deg');
    card.style.setProperty('--ry', '0deg');
    card.style.setProperty('--s', '1');
  };

  return (
    <section id="projects" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-16">
          <div>
            <span className="text-neon-blue font-mono text-sm tracking-wider uppercase mb-2 block">Portfolio</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white">Featured <span className="text-neon-purple">Work</span></h2>
          </div>
          <a href="#" className="hidden md:flex items-center gap-2 text-slate-400 hover:text-white transition-colors group">
            View all projects <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 perspective-1000">
          {PROJECTS_DATA.map((project, idx) => (
            <div
              key={idx}
              className="group relative rounded-2xl overflow-hidden glass-panel border border-slate-800 hover:border-neon-blue/50 tilt-card"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >

              {/* Image Container with 3D Depth */}
              <div className="relative h-64 overflow-hidden tilt-card-content">
                <div className="absolute inset-0 bg-slate-900/20 group-hover:bg-transparent transition-colors z-10" />
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
              </div>

              {/* Content */}
              <div className="p-8 relative z-20 bg-slate-900/90 backdrop-blur-xl lg:translate-y-12 lg:group-hover:translate-y-0 transition-transform duration-500 h-full tilt-card-content">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-mono text-neon-blue px-2 py-1 rounded bg-neon-blue/10 border border-neon-blue/20">
                    {project.category}
                  </span>
                  <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transform hover:scale-125 transition-transform"><Github size={18} /></a>
                    <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transform hover:scale-125 transition-transform"><ExternalLink size={18} /></a>
                  </div>
                </div>

                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-neon-blue transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-400 mb-6 text-sm leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tIdx) => (
                    <span key={tIdx} className="text-xs font-medium text-slate-500">#{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center md:hidden">
          <a href="#" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
            View all projects <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;