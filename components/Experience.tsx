import React from 'react';
import { Briefcase, Calendar, MapPin } from 'lucide-react';
import { EXPERIENCE_DATA } from '../constants';

const Experience: React.FC = () => {
    return (
        <section id="experience" className="py-24 relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Professional <span className="text-neon-blue">Journey</span>
                    </h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">
                        My career path and professional milestones.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="relative border-l border-slate-800 ml-4 md:ml-6 space-y-12">
                        {EXPERIENCE_DATA.map((job, index) => (
                            <div key={index} className="relative pl-8 md:pl-12 group">
                                {/* Timeline Dot */}
                                <div className="absolute -left-[5px] md:-left-[7px] top-0 w-3 h-3 md:w-4 md:h-4 rounded-full bg-neon-blue shadow-[0_0_10px_rgba(0,243,255,0.5)] group-hover:scale-125 transition-transform duration-300" />

                                <div className="glass-panel p-6 md:p-8 rounded-2xl border border-slate-800 hover:border-neon-blue/30 transition-all duration-300 group-hover:transform group-hover:translate-x-2">
                                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                                        <h3 className="text-xl font-bold text-white group-hover:text-neon-blue transition-colors">
                                            {job.role}
                                        </h3>
                                        <span className="text-neon-purple text-sm font-mono px-3 py-1 bg-neon-purple/10 rounded-full w-fit">
                                            {job.period}
                                        </span>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-4 text-sm text-slate-400 mb-6">
                                        <div className="flex items-center gap-1">
                                            <Briefcase size={16} className="text-neon-blue" />
                                            <span>{job.company}</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <MapPin size={16} className="text-neon-blue" />
                                            <span>{job.location || job.type}</span>
                                        </div>
                                    </div>

                                    <p className="text-slate-400 leading-relaxed mb-6">
                                        {job.description}
                                    </p>

                                    <div className="flex flex-wrap gap-2">
                                        {job.technologies.map((tech, i) => (
                                            <span key={i} className="text-xs font-medium px-3 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Experience;
