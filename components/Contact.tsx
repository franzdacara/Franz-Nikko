import React from 'react';
import { Mail, MapPin, MessageSquare, ExternalLink } from 'lucide-react';
import { SITE_CONTENT } from '../constants';

const Contact: React.FC = () => {
  const { contact } = SITE_CONTENT;

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1/2 bg-neon-purple/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto glass-panel rounded-3xl p-8 md:p-12 border border-slate-800 shadow-2xl text-center">

          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Let's <span className="text-neon-blue">Connect</span></h2>
          <p className="text-slate-400 mb-12 leading-relaxed max-w-2xl mx-auto">
            {contact.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="flex flex-col items-center p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50 hover:border-neon-purple/50 transition-all group">
              <div className="p-4 bg-slate-800 rounded-xl text-neon-purple mb-4 group-hover:scale-110 transition-transform">
                <Mail size={24} />
              </div>
              <h4 className="text-white font-medium mb-2">Email</h4>
              <a href={`mailto:${contact.email}`} className="text-slate-400 text-sm hover:text-neon-blue transition-colors">
                {contact.email}
              </a>
            </div>

            <div className="flex flex-col items-center p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50 hover:border-neon-blue/50 transition-all group">
              <div className="p-4 bg-slate-800 rounded-xl text-neon-blue mb-4 group-hover:scale-110 transition-transform">
                <MessageSquare size={24} />
              </div>
              <h4 className="text-white font-medium mb-2">Socials</h4>
              <p className="text-slate-400 text-sm">{contact.socialHandle}</p>
            </div>

            <div className="flex flex-col items-center p-6 bg-slate-800/50 rounded-2xl border border-slate-700/50 hover:border-pink-500/50 transition-all group">
              <div className="p-4 bg-slate-800 rounded-xl text-pink-500 mb-4 group-hover:scale-110 transition-transform">
                <MapPin size={24} />
              </div>
              <h4 className="text-white font-medium mb-2">Location</h4>
              <p className="text-slate-400 text-sm">{contact.location}</p>
            </div>
          </div>

          <div className="flex justify-center gap-6">
            {contact.socialLinks.map((social) => (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-slate-800 rounded-full text-slate-400 hover:text-white hover:bg-neon-blue hover:shadow-[0_0_20px_rgba(0,243,255,0.4)] transition-all duration-300 transform hover:-translate-y-1"
                aria-label={social.platform}
              >
                <social.icon size={24} />
              </a>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;