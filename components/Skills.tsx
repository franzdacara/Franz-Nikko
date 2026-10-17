import React from 'react';
import { SKILLS_DATA } from '../constants';
import { useScrollReveal } from '../hooks/useScrollReveal';

const Skills: React.FC = () => {
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <section id="skills" ref={sectionRef} className="py-24 relative border-t border-border bg-surface">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* Left label */}
          <div className="lg:col-span-3">
            <div className={`lg:sticky lg:top-24 reveal-init delay-75 ${isVisible ? 'reveal-visible' : ''}`}>
              <span className="section-label block mb-3">Capabilities</span>
              <h2 className="text-heading text-text-primary mb-4">
                Technical Stack
              </h2>
              <p className="text-sm text-text-muted leading-relaxed">
                Tools, frameworks, and deployment environments verified in active production systems.
              </p>
              <div className="mt-6 font-mono text-[11px] text-text-muted">
                <span className="text-accent">{SKILLS_DATA.reduce((acc, cat) => acc + cat.skills.length, 0)}</span> VERIFIED TECHNOLOGIES
              </div>
            </div>
          </div>

          {/* Right content */}
          <div className="lg:col-span-9">
            <div className="space-y-10">
              {SKILLS_DATA.map((category, idx) => {
                const Icon = category.icon;
                const delayClasses = ['delay-150', 'delay-225', 'delay-300'];
                const delayClass = delayClasses[idx % delayClasses.length];

                return (
                  <div
                    key={idx}
                    className={`border border-border p-6 bg-surface-raised/40 hover:border-zinc-700 transition-colors duration-200 relative corner-crosshair reveal-init ${delayClass} ${isVisible ? 'reveal-visible' : ''}`}
                  >
                    {/* Category header */}
                    <div className="flex items-center gap-3 mb-6">
                      <Icon size={16} className="text-accent" />
                      <h3 className="font-mono text-sm font-bold text-text-primary tracking-wide uppercase">
                        {category.title}
                      </h3>
                      <span className="flex-1 h-px bg-border" />
                      <span className="font-mono text-[11px] text-text-muted">
                        [{category.skills.length}]
                      </span>
                    </div>

                    {/* Skills grid */}
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="tag cursor-default hover:border-accent hover:text-accent hover:-translate-y-0.5 transition-all duration-150"
                        >
                          {skill}
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

export default Skills;