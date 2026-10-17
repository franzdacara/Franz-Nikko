import React from 'react';
import { SITE_CONTENT } from '../constants';
import { useScrollReveal } from '../hooks/useScrollReveal';

const About: React.FC = () => {
  const { about } = SITE_CONTENT;
  const { ref: sectionRef, isVisible } = useScrollReveal({ threshold: 0.1 });

  return (
    <section id="about" ref={sectionRef} className="py-24 relative border-t border-border">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* Image & Quick Spec Card — left column */}
          <div className="lg:col-span-4">
            <div className={`sticky top-24 space-y-4 reveal-init delay-75 ${isVisible ? 'reveal-visible' : ''}`}>
              <div className="border border-border overflow-hidden bg-surface-raised relative corner-crosshair">
                <img
                  src={about.image}
                  alt="Franz Nikko Dacara"
                  className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <div className="flex justify-between items-center px-1 font-mono text-[11px] text-text-muted tracking-wider uppercase">
                <span>Franz Nikko Dacara</span>
                <span className="text-accent font-semibold">v2.0</span>
              </div>

              {/* Developer Spec / CV Quick Info Card */}
              <div className="border border-border p-4 bg-surface-raised space-y-3 font-mono text-xs relative corner-crosshair">
                <div className="flex justify-between items-center text-text-muted pb-2 border-b border-border">
                  <span className="text-[11px] uppercase tracking-wider">Role</span>
                  <span className="text-text-primary text-right font-sans font-medium">Full-Stack & DevOps</span>
                </div>
                <div className="flex justify-between items-center text-text-muted pb-2 border-b border-border">
                  <span className="text-[11px] uppercase tracking-wider">Location</span>
                  <span className="text-text-primary">Davao City, PH</span>
                </div>
                <div className="flex justify-between items-center text-text-muted pb-2 border-b border-border">
                  <span className="text-[11px] uppercase tracking-wider">Focus</span>
                  <span className="text-text-primary text-right">Full-Stack & Cloud</span>
                </div>
                <div className="flex justify-between items-center text-text-muted">
                  <span className="text-[11px] uppercase tracking-wider">Status</span>
                  <span className="text-accent flex items-center gap-1.5 font-semibold">
                    <span className="w-1.5 h-1.5 bg-accent inline-block rounded-full animate-pulse"></span>
                    Open to Work
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Content — right column */}
          <div className="lg:col-span-8">
            <span className={`section-label block mb-4 reveal-init delay-150 ${isVisible ? 'reveal-visible' : ''}`}>
              About
            </span>
            <h2 className={`text-heading text-text-primary mb-8 reveal-init delay-150 ${isVisible ? 'reveal-visible' : ''}`}>
              {about.title}
            </h2>

            <div className={`space-y-6 mb-12 reveal-init delay-225 ${isVisible ? 'reveal-visible' : ''}`}>
              {about.description.map((paragraph, idx) => (
                <p key={idx} className="text-text-secondary leading-relaxed text-[15px]">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Stats row — horizontal metrics with crisp hover states */}
            <div className={`border-t border-border pt-8 reveal-init delay-300 ${isVisible ? 'reveal-visible' : ''}`}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {about.stats.map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <div key={idx} className="group p-2 -m-2 rounded transition-colors duration-150">
                      <div className="flex items-center gap-3 mb-2">
                        <Icon size={16} className="text-accent group-hover:scale-110 transition-transform duration-150" />
                        <span className="font-mono text-lg font-bold text-text-primary group-hover:text-accent transition-colors duration-150">
                          {stat.label}
                        </span>
                      </div>
                      <p className="text-sm text-text-muted leading-relaxed pl-7">
                        {stat.description}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Engineering Profile & CV Action */}
            <div className={`mt-12 p-6 border border-border bg-surface-raised flex flex-col md:flex-row md:items-center justify-between gap-4 relative corner-crosshair reveal-init delay-375 ${isVisible ? 'reveal-visible' : ''}`}>
              <div>
                <span className="font-mono text-[11px] text-accent uppercase tracking-wider block mb-1">Engineering Profile</span>
                <h4 className="text-base font-semibold text-text-primary">Curriculum Vitae & Technical Specs</h4>
                <p className="text-xs text-text-muted mt-1">Production workflows, architecture diagrams, and comprehensive skill competencies.</p>
              </div>
              <a
                href={SITE_CONTENT.brand.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-tactile-secondary inline-flex items-center justify-center px-4 py-2 text-xs font-mono whitespace-nowrap self-start md:self-auto"
              >
                Download CV →
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default About;