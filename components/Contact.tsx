import React from 'react';
import { Mail, MapPin, ArrowUpRight } from 'lucide-react';
import { SITE_CONTENT } from '../constants';

const Contact: React.FC = () => {
  const { contact } = SITE_CONTENT;

  return (
    <section id="contact" className="py-24 relative border-t border-border">
      <div className="max-w-7xl mx-auto px-6">

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">

          {/* Left column */}
          <div className="lg:col-span-5">
            <span className="section-label block mb-3">Contact</span>
            <h2 className="text-heading text-text-primary mb-6">
              {contact.title}
            </h2>
            <p className="text-text-secondary leading-relaxed mb-8">
              {contact.description}
            </p>

            {/* Email — prominent CTA */}
            <a
              href={`mailto:${contact.email}`}
              className="inline-flex items-center gap-3 px-6 py-3 bg-accent text-surface font-semibold text-sm hover:bg-accent-hover transition-colors duration-150 mb-8"
            >
              <Mail size={16} />
              {contact.email}
            </a>
          </div>

          {/* Right column — contact details + socials */}
          <div className="lg:col-span-7 lg:pl-16 lg:border-l lg:border-border">

            {/* Info grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12">
              <div>
                <span className="font-mono text-[11px] text-text-muted tracking-wider uppercase block mb-2">Email</span>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-sm text-text-primary hover:text-accent transition-colors"
                >
                  {contact.email}
                </a>
              </div>

              <div>
                <span className="font-mono text-[11px] text-text-muted tracking-wider uppercase block mb-2">Location</span>
                <div className="flex items-center gap-1.5 text-sm text-text-primary">
                  <MapPin size={13} className="text-text-muted" />
                  {contact.location}
                </div>
              </div>

              <div>
                <span className="font-mono text-[11px] text-text-muted tracking-wider uppercase block mb-2">Socials</span>
                <span className="text-sm text-text-primary font-mono">{contact.socialHandle}</span>
              </div>

              <div>
                <span className="font-mono text-[11px] text-text-muted tracking-wider uppercase block mb-2">Availability</span>
                <span className="text-sm text-accent font-mono">Open to Work</span>
              </div>
            </div>

            {/* Social links — row */}
            <div className="border-t border-border pt-8">
              <span className="font-mono text-[11px] text-text-muted tracking-wider uppercase block mb-4">Links</span>
              <div className="flex flex-wrap gap-3">
                {contact.socialLinks.map((social) => (
                  <a
                    key={social.platform}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 border border-border text-sm text-text-secondary font-mono hover:text-accent hover:border-accent transition-all duration-150"
                    aria-label={social.platform}
                  >
                    <social.icon size={14} />
                    {social.platform}
                    <ArrowUpRight size={12} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;