import React from 'react';
import { SKILLS_DATA } from '../constants';

const Skills: React.FC = () => {
  return (
    <section id="skills" className="py-24 relative border-t border-border bg-surface-raised">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* Left label */}
          <div className="lg:col-span-3">
            <div className="lg:sticky lg:top-24">
              <span className="section-label block mb-3">Stack</span>
              <h2 className="text-heading text-text-primary mb-4">
                Technical Skills
              </h2>
              <p className="text-sm text-text-muted leading-relaxed">
                Tools and frameworks used in production across {SKILLS_DATA.reduce((acc, cat) => acc + cat.skills.length, 0)}+ technologies.
              </p>
            </div>
          </div>

          {/* Right content */}
          <div className="lg:col-span-9">
            <div className="space-y-12">
              {SKILLS_DATA.map((category, idx) => {
                const Icon = category.icon;
                return (
                  <div key={idx} className="group">
                    {/* Category header */}
                    <div className="flex items-center gap-3 mb-5">
                      <Icon size={16} className="text-accent" />
                      <h3 className="font-mono text-sm font-bold text-text-primary tracking-wide uppercase">
                        {category.title}
                      </h3>
                      <span className="flex-1 h-px bg-border" />
                      <span className="font-mono text-[11px] text-text-muted">
                        {category.skills.length}
                      </span>
                    </div>

                    {/* Skills grid */}
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="tag cursor-default"
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