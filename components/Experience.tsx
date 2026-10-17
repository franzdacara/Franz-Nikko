import React from 'react';
import { Briefcase, MapPin } from 'lucide-react';
import { EXPERIENCE_DATA } from '../constants';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="py-24 relative border-t border-border">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* Left label column */}
          <div className="lg:col-span-3">
            <div className="lg:sticky lg:top-24">
              <span className="section-label block mb-3">Experience</span>
              <h2 className="text-heading text-text-primary mb-4">
                Work History
              </h2>
              <p className="text-sm text-text-muted leading-relaxed">
                {EXPERIENCE_DATA.length} roles across enterprise healthcare, freelance, and startup environments.
              </p>
            </div>
          </div>

          {/* Right timeline column */}
          <div className="lg:col-span-9">
            <div className="space-y-0">
              {EXPERIENCE_DATA.map((job, index) => (
                <div
                  key={index}
                  className="group border-t border-border py-8 hover-shift"
                >
                  {/* Header row */}
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-text-primary group-hover:text-accent transition-colors duration-150">
                        {job.role}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-text-muted">
                        <span className="flex items-center gap-1.5">
                          <Briefcase size={13} />
                          {job.company}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <MapPin size={13} />
                          {job.location || job.type}
                        </span>
                      </div>
                    </div>
                    <span className="font-mono text-xs text-text-muted tracking-wide whitespace-nowrap mt-1 md:mt-0">
                      {job.period}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-text-secondary leading-relaxed mb-5 max-w-3xl">
                    {job.description}
                  </p>

                  {/* Tech tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {job.technologies.map((tech, i) => (
                      <span key={i} className="tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
