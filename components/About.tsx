import React from 'react';
import { SITE_CONTENT } from '../constants';

const About: React.FC = () => {
  const { about } = SITE_CONTENT;

  return (
    <section id="about" className="py-24 relative border-t border-border">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* Image & Quick Spec Card — left column */}
          <div className="lg:col-span-4">
            <div className="sticky top-24 space-y-4">
              <div className="border border-border overflow-hidden bg-surface-raised">
                <img
                  src={about.image}
                  alt="Franz Nikko Dacara"
                  className="w-full h-auto grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <div className="flex justify-between items-center px-1">
                <span className="font-mono text-[11px] text-text-muted tracking-wider uppercase">Franz Nikko Dacara</span>
                <span className="font-mono text-[11px] text-accent">v2.0</span>
              </div>

              {/* Developer Spec / CV Quick Info Card */}
              <div className="border border-border p-4 bg-surface-raised space-y-3 font-mono text-xs">
                <div className="flex justify-between items-center text-text-muted pb-2 border-b border-border">
                  <span className="text-[11px] uppercase tracking-wider">Role</span>
                  <span className="text-text-primary text-right font-sans font-medium">Full-Stack & DevOps</span>
                </div>
                <div className="flex justify-between items-center text-text-muted pb-2 border-b border-border">
                  <span className="text-[11px] uppercase tracking-wider">Location</span>
                  <span className="text-text-primary">Davao City, PH</span>
                </div>
                <div className="flex justify-between items-center text-text-muted pb-2 border-b border-border">
                  <span className="text-[11px] uppercase tracking-wider">Education</span>
                  <span className="text-text-primary text-right">BSIT · Honors</span>
                </div>
                <div className="flex justify-between items-center text-text-muted">
                  <span className="text-[11px] uppercase tracking-wider">Status</span>
                  <span className="text-accent flex items-center gap-1.5 font-semibold">
                    <span className="w-1.5 h-1.5 bg-accent inline-block"></span>
                    Open to Work
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Content — right column */}
          <div className="lg:col-span-8">
            <span className="section-label block mb-4">About</span>
            <h2 className="text-heading text-text-primary mb-8">
              {about.title}
            </h2>

            <div className="space-y-6 mb-12">
              {about.description.map((paragraph, idx) => (
                <p key={idx} className="text-text-secondary leading-relaxed text-[15px]">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Stats row — horizontal metrics */}
            <div className="border-t border-border pt-8">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
                {about.stats.map((stat, idx) => {
                  const Icon = stat.icon;
                  return (
                    <div key={idx} className="group">
                      <div className="flex items-center gap-3 mb-2">
                        <Icon size={16} className="text-accent" />
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

            {/* Education & Credentials Banner */}
            <div className="mt-12 p-6 border border-border bg-surface-raised flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="font-mono text-[11px] text-accent uppercase tracking-wider block mb-1">Education & Honors</span>
                <h4 className="text-base font-semibold text-text-primary">Bachelor of Science in Information Technology</h4>
                <p className="text-xs text-text-muted mt-1">Jose Maria College Foundation Inc. · Administrator's List (Honors) · Sep 2019 – Jun 2023</p>
              </div>
              <a
                href={SITE_CONTENT.brand.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 py-2 border border-border text-xs font-mono text-text-secondary hover:text-text-primary hover:border-text-muted transition-colors whitespace-nowrap self-start md:self-auto"
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