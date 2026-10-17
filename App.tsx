import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Preloader from './components/Preloader';
import ChatBot from './components/ChatBot';
import ArchitecturalBackground from './components/ArchitecturalBackground';
import VisitorCounter from './components/VisitorCounter';
import { ArrowUp } from 'lucide-react';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <ChatBot />

      <div className={`relative min-h-screen bg-surface transition-opacity duration-700 ${loading ? 'opacity-0 overflow-hidden h-screen' : 'opacity-100'}`}>

        {/* Global Hardware-Accelerated Architectural Parallax Background */}
        <ArchitecturalBackground />

        <Navbar />

        <main className="relative z-10 flex flex-col gap-0">
          <Hero />
          <About />
          <Experience />
          <Skills />
          <Projects />
          <Contact />
        </main>

        {/* Footer */}
        <footer className="relative z-10 py-6 border-t border-border">
          <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-mono text-xs text-text-muted tracking-wide">
              © {new Date().getFullYear()} Nikko Dacara
            </p>
            <VisitorCounter variant="footer" />
            <p className="font-mono text-xs text-text-muted tracking-wide">
              React · TypeScript · Tailwind
            </p>
          </div>
        </footer>

        {/* Scroll to top */}
        <button
          onClick={scrollToTop}
          className={`fixed bottom-6 right-6 z-50 w-10 h-10 flex items-center justify-center border border-border bg-surface-raised text-text-secondary hover:text-accent hover:border-accent transition-all duration-200 ${showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0 pointer-events-none'
            }`}
          aria-label="Scroll to top"
        >
          <ArrowUp size={16} />
        </button>
      </div>
    </>
  );
};

export default App;