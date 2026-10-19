import React from 'react';
import { Briefcase, MapPin } from 'lucide-react';
import { EXPERIENCE_DATA } from '../constants';
import { useScrollReveal } from '../hooks/useScrollReveal';

const Experience: React.FC = () => {
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.05 });

  return (
    <section id="experience" ref={sectionRef} className="py-24 relative border-t border-border">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* Left label column */}
          <div className="lg:col-span-3">
            <div className={`lg:sticky lg:top-24 reveal-init delay-75 ${isVisible ? 'reveal-visible' : ''}`}>
              <span className="section-label block mb-3">Timeline</span>
              <h2 className="text-heading text-text-primary mb-4">
                Work History
              </h2>
              <p className="text-sm text-text-muted leading-relaxed">
                {EXPERIENCE_DATA.length} roles across healthcare systems, automated AI pipelines, and enterprise accounting platforms.
              </p>
            </div>
          </div>

          {/* Right timeline column */}
          <div className="lg:col-span-9">
            <div className="space-y-0">
              {EXPERIENCE_DATA.map((job, index) => {
                const staggerClasses = [
                  'delay-75',
                  'delay-150',
                  'delay-225',
                  'delay-300',
                  'delay-375'
                ];
                const delayClass = staggerClasses[index % staggerClasses.length];

                return (
                  <div
                    key={index}
                    className={`group border-t border-border py-8 relative pl-4 -ml-4 transition-all duration-200 hover:border-zinc-700 reveal-init ${delayClass} ${isVisible ? 'reveal-visible' : ''}`}
                  >
                    {/* Architectural left active highlight indicator */}
                    <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

                    {/* Header row */}
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-2 mb-3">
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="font-mono text-[11px] text-accent">
                            [{String(index + 1).padStart(2, '0')}]
                          </span>
                          <h3 className="text-lg font-semibold text-text-primary group-hover:text-accent transition-colors duration-150">
                            {job.role}
                          </h3>
                        </div>
                        <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-text-muted pl-7">
                          <span className="flex items-center gap-1.5 font-medium text-text-secondary">
                            <Briefcase size={13} className="text-accent" />
                            {job.company}
                          </span>
                          <span className="text-border">•</span>
                          <span className="flex items-center gap-1.5">
                            <MapPin size={13} />
                            {job.location || job.type}
                          </span>
                        </div>
                      </div>

                      <span className="font-mono text-xs text-text-muted tracking-wide whitespace-nowrap mt-1 md:mt-0 pl-7 md:pl-0">
                        {job.period}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-text-secondary leading-relaxed mb-5 max-w-3xl pl-7">
                      {job.description}
                    </p>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-1.5 pl-7">
                      {job.technologies.map((tech, i) => (
                        <span key={i} className="tag">
                          {tech}
                        </span>
                      ))}
                    </div>
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

export default Experience;
