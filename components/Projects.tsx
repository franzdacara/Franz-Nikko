import React, { useState, useEffect } from 'react';
import { ExternalLink, Github, ArrowUpRight, Eye, X, ChevronLeft, ChevronRight, CheckCircle2, Play } from 'lucide-react';
import { PROJECTS_DATA, ProjectItem } from '../constants';

const CATEGORIES = ['All', 'AI & Full-Stack', 'Web Applications', 'CMS & Client', '3D & Interactive'] as const;

const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [previewProject, setPreviewProject] = useState<ProjectItem | null>(null);

  const filteredProjects = selectedCategory === 'All'
    ? PROJECTS_DATA
    : PROJECTS_DATA.filter(p => p.filterCategory === selectedCategory);

  // Keyboard navigation for preview modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!previewProject) return;

      if (e.key === 'Escape') {
        setPreviewProject(null);
      } else if (e.key === 'ArrowLeft') {
        handlePrevProject();
      } else if (e.key === 'ArrowRight') {
        handleNextProject();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [previewProject]);

  // Lock body scroll when modal is active
  useEffect(() => {
    if (previewProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [previewProject]);

  const handlePrevProject = () => {
    if (!previewProject) return;
    const currentIndex = PROJECTS_DATA.findIndex(p => p.title === previewProject.title);
    const prevIndex = (currentIndex - 1 + PROJECTS_DATA.length) % PROJECTS_DATA.length;
    setPreviewProject(PROJECTS_DATA[prevIndex]);
  };

  const handleNextProject = () => {
    if (!previewProject) return;
    const currentIndex = PROJECTS_DATA.findIndex(p => p.title === previewProject.title);
    const nextIndex = (currentIndex + 1) % PROJECTS_DATA.length;
    setPreviewProject(PROJECTS_DATA[nextIndex]);
  };

  return (
    <section id="projects" className="py-24 relative border-t border-border">
      <div className="max-w-7xl mx-auto px-6">

        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12 items-end">
          <div className="lg:col-span-4">
            <span className="section-label block mb-3">Portfolio</span>
            <h2 className="text-heading text-text-primary">
              Selected Work
            </h2>
          </div>
          <div className="lg:col-span-8 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <p className="text-sm text-text-muted max-w-lg leading-relaxed">
              Production systems, local AI pipelines, and client deliverables. Click any project card to inspect the interactive preview and architectural specifications.
            </p>
            <div className="font-mono text-xs text-text-muted whitespace-nowrap">
              <span className="text-accent">{PROJECTS_DATA.length}</span> PROJECTS RECORDED
            </div>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-border">
          {CATEGORIES.map(category => {
            const count = category === 'All'
              ? PROJECTS_DATA.length
              : PROJECTS_DATA.filter(p => p.filterCategory === category).length;
            const isActive = selectedCategory === category;

            return (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3.5 py-1.5 font-mono text-xs transition-all duration-150 flex items-center gap-2 border ${isActive
                  ? 'border-accent bg-accent/10 text-accent font-semibold'
                  : 'border-border bg-surface-raised text-text-muted hover:text-text-primary hover:border-text-muted'
                  }`}
              >
                <span>{category}</span>
                <span className={`text-[10px] ${isActive ? 'text-accent' : 'text-text-muted'}`}>
                  [{count}]
                </span>
              </button>
            );
          })}
        </div>

        {/* Projects Grid — compact 3-column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project, idx) => {
            const globalIndex = PROJECTS_DATA.findIndex(p => p.title === project.title);

            return (
              <div
                key={project.title}
                className="group bg-surface border border-border hover:border-zinc-700 transition-all duration-200 flex flex-col overflow-hidden"
              >
                {/* Browser Window Chrome Top Bar — compact */}
                <div className="bg-surface-raised px-3 py-1.5 border-b border-border flex items-center justify-between font-mono text-[11px]">
                  {/* Window dots */}
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-zinc-700/80 group-hover:bg-red-500/70 transition-colors" />
                    <span className="w-2 h-2 rounded-full bg-zinc-700/80 group-hover:bg-amber-500/70 transition-colors" />
                    <span className="w-2 h-2 rounded-full bg-zinc-700/80 group-hover:bg-emerald-500/70 transition-colors" />
                  </div>

                  {/* Simulated URL Bar */}
                  <div className="flex items-center gap-1 px-2 py-0.5 bg-surface border border-border text-[10px] text-text-muted max-w-[130px] sm:max-w-[150px] truncate">
                    <span className="text-accent text-[9px]">https://</span>
                    <span className="truncate">{project.domain ? project.domain.replace(/^https?:\/\//, '').split('/')[0] : 'nikko.dev'}</span>
                  </div>

                  {/* Status Badge */}
                  <div className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[9px] text-text-muted uppercase tracking-wider">
                      {project.status ? project.status.split(' ')[0] : 'Active'}
                    </span>
                  </div>
                </div>

                {/* Card Media Preview Area */}
                <div
                  onClick={() => setPreviewProject(project)}
                  className="relative aspect-video overflow-hidden border-b border-border bg-black/40 cursor-pointer"
                >
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-[1.03]"
                  />

                  {/* Hover Overlay with Quick Preview CTA */}
                  <div className="absolute inset-0 bg-surface/80 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-2.5 p-4 text-center">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setPreviewProject(project);
                      }}
                      className="px-3.5 py-1.5 bg-accent text-surface font-semibold text-[11px] font-mono uppercase tracking-wider flex items-center gap-1.5 hover:bg-accent-hover transition-colors shadow-md"
                    >
                      <Eye size={13} />
                      Inspect Preview
                    </button>

                    <div className="flex items-center gap-2 mt-0.5">
                      {project.link && project.link !== '#' && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="px-2.5 py-1 bg-surface border border-border text-[11px] font-mono text-text-secondary hover:text-accent hover:border-accent transition-colors flex items-center gap-1"
                          aria-label={`Visit live site for ${project.title}`}
                        >
                          <ExternalLink size={11} />
                          Live
                        </a>
                      )}
                      {project.github && project.github !== '#' && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="px-2.5 py-1 bg-surface border border-border text-[11px] font-mono text-text-secondary hover:text-accent hover:border-accent transition-colors flex items-center gap-1"
                          aria-label={`View GitHub source for ${project.title}`}
                        >
                          <Github size={11} />
                          Source
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Information */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Category & Index Header */}
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-mono text-[10px] text-accent tracking-wider uppercase">
                        {project.category}
                      </span>
                      <span className="font-mono text-[10px] text-text-muted">
                        [{String(globalIndex + 1).padStart(2, '0')}]
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      onClick={() => setPreviewProject(project)}
                      className="text-base font-semibold text-text-primary mb-2 group-hover:text-accent transition-colors duration-150 flex items-center gap-1.5 cursor-pointer"
                    >
                      {project.title}
                      <ArrowUpRight size={14} className="text-text-muted group-hover:text-accent transition-colors" />
                    </h3>

                    {/* Description */}
                    <p className="text-xs text-text-muted mb-4 leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Tags */}
                  <div className="pt-3 border-t border-border flex flex-wrap gap-1">
                    {project.tags.slice(0, 4).map((tag, tIdx) => (
                      <span key={tIdx} className="tag text-[10px] py-0.5 px-2">
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="tag text-[9px] py-0.5 px-1.5 text-text-muted">
                        +{project.tags.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* ========================================================================= */}
      {/* INTERACTIVE FULL PROJECT PREVIEW MODAL                                   */}
      {/* ========================================================================= */}
      {previewProject && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-surface/90 backdrop-blur-md transition-opacity duration-200"
          onClick={() => setPreviewProject(null)}
        >
          <div
            className="max-w-2xl w-full max-h-[88vh] bg-surface-raised border border-border flex flex-col overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >

            {/* Modal Top Chrome Bar */}
            <div className="px-4 py-2.5 bg-surface border-b border-border flex items-center justify-between font-mono text-xs">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500/70" />
                  <span className="w-2 h-2 rounded-full bg-amber-500/70" />
                  <span className="w-2 h-2 rounded-full bg-emerald-500/70" />
                </div>
                <span className="text-text-muted text-[10px] uppercase tracking-wider hidden sm:inline">
                  INSPECT // {previewProject.title}
                </span>
              </div>

              {/* Cycling Navigation & Close */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={handlePrevProject}
                  className="px-2 py-0.5 border border-border text-text-muted hover:text-text-primary hover:border-text-muted transition-colors flex items-center gap-1 text-[10px]"
                  title="Previous Project (←)"
                >
                  <ChevronLeft size={12} />
                  <span className="hidden sm:inline">Prev</span>
                </button>
                <button
                  onClick={handleNextProject}
                  className="px-2 py-0.5 border border-border text-text-muted hover:text-text-primary hover:border-text-muted transition-colors flex items-center gap-1 text-[10px]"
                  title="Next Project (→)"
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight size={12} />
                </button>
                <button
                  onClick={() => setPreviewProject(null)}
                  className="w-6 h-6 border border-border text-text-muted hover:text-text-primary hover:border-accent hover:text-accent transition-colors flex items-center justify-center ml-1"
                  aria-label="Close Preview"
                >
                  <X size={13} />
                </button>
              </div>
            </div>

            {/* Modal Scrollable Body */}
            <div className="overflow-y-auto p-5 space-y-4">

              {/* Media Preview Box */}
              <div className="border border-border bg-black/60 overflow-hidden relative">
                {previewProject.videoEmbedUrl ? (
                  <div className="relative aspect-video w-full">
                    <iframe
                      src={previewProject.videoEmbedUrl}
                      title={`${previewProject.title} gameplay video`}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <div className="relative aspect-video w-full overflow-hidden">
                    <img
                      src={previewProject.image}
                      alt={previewProject.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Simulated live status bar on image */}
                    <div className="absolute bottom-0 inset-x-0 bg-surface/90 backdrop-blur-sm border-t border-border px-3 py-1.5 flex items-center justify-between text-[11px] font-mono">
                      <div className="flex items-center gap-1.5 text-text-secondary truncate">
                        <span className="text-accent text-[10px]">●</span>
                        <span className="truncate">{previewProject.domain || 'nikkodacara.tech'}</span>
                      </div>
                      {previewProject.link && previewProject.link !== '#' && (
                        <a
                          href={previewProject.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-accent hover:underline flex items-center gap-1 whitespace-nowrap text-[11px]"
                        >
                          Open Live View <ArrowUpRight size={11} />
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Title & Metadata Strip */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-4 border-b border-border">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-[11px] text-accent uppercase tracking-wider">
                      {previewProject.category}
                    </span>
                    <span className="text-border">•</span>
                    <span className="font-mono text-[11px] text-text-muted">
                      {previewProject.status || 'Active'}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-text-primary">
                    {previewProject.title}
                  </h3>
                </div>

                {/* External Action CTAs */}
                <div className="flex items-center gap-2">
                  {previewProject.github && previewProject.github !== '#' && (
                    <a
                      href={previewProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 border border-border bg-surface text-text-secondary hover:text-text-primary hover:border-text-muted transition-colors flex items-center gap-1.5 text-[11px] font-mono"
                    >
                      <Github size={13} />
                      Source
                    </a>
                  )}
                  {previewProject.link && previewProject.link !== '#' && (
                    <a
                      href={previewProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-1.5 bg-accent text-surface font-semibold hover:bg-accent-hover transition-colors flex items-center gap-1.5 text-[11px] font-mono"
                    >
                      {previewProject.videoEmbedUrl ? <Play size={13} /> : <ExternalLink size={13} />}
                      {previewProject.videoEmbedUrl ? 'Watch Demo' : 'Launch Site'}
                    </a>
                  )}
                </div>
              </div>

              {/* Overview & Highlights Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-2">
                {/* Left: Detailed Overview & Engineering Highlights */}
                <div className="md:col-span-8 space-y-4">
                  <div>
                    <h4 className="font-mono text-[11px] text-text-muted uppercase tracking-wider mb-1.5">
                      Project Overview
                    </h4>
                    <p className="text-xs text-text-secondary leading-relaxed">
                      {previewProject.longDescription || previewProject.description}
                    </p>
                  </div>

                  {previewProject.highlights && previewProject.highlights.length > 0 && (
                    <div>
                      <h4 className="font-mono text-[11px] text-text-muted uppercase tracking-wider mb-2">
                        Key Engineering Highlights & Architecture
                      </h4>
                      <div className="space-y-2">
                        {previewProject.highlights.map((highlight, hIdx) => (
                          <div key={hIdx} className="flex items-start gap-2 text-xs text-text-secondary leading-relaxed">
                            <CheckCircle2 size={13} className="text-accent shrink-0 mt-0.5" />
                            <span>{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Right: Technical Spec Sidebar */}
                <div className="md:col-span-4 space-y-4 md:border-l md:border-border md:pl-5">
                  <div>
                    <h4 className="font-mono text-[11px] text-text-muted uppercase tracking-wider mb-2">
                      Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {previewProject.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="tag text-[10px] py-0.5 px-2">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-mono text-[11px] text-text-muted uppercase tracking-wider mb-1.5">
                      Domain
                    </h4>
                    <span className="font-mono text-xs text-text-primary block truncate">
                      {previewProject.domain || 'Self-hosted'}
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* Modal Bottom Keyboard Navigation Tip */}
            <div className="px-6 py-2.5 bg-surface border-t border-border flex items-center justify-between text-[11px] font-mono text-text-muted">
              <span>Use <kbd className="px-1.5 py-0.5 border border-border bg-surface-raised text-text-secondary">ESC</kbd> to close</span>
              <span>Navigate with <kbd className="px-1.5 py-0.5 border border-border bg-surface-raised text-text-secondary">←</kbd> <kbd className="px-1.5 py-0.5 border border-border bg-surface-raised text-text-secondary">→</kbd> keys</span>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};

export default Projects;