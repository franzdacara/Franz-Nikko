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
import { ArrowUp } from 'lucide-react';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
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

      <div className={`relative min-h-screen bg-neon-dark selection:bg-neon-blue selection:text-neon-dark overflow-x-hidden transition-opacity duration-700 ${loading ? 'opacity-0 overflow-hidden h-screen' : 'opacity-100'}`}>
        {/* Dynamic Parallax Background */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          {/* Deep Space Background */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-slate-900/50 via-neon-dark to-neon-dark" />

          {/* Floating Orbs with Scroll Parallax */}
          <div
            className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-neon-purple/10 rounded-full blur-[120px] animate-pulse-slow"
            style={{ transform: `translateY(${scrollY * 0.2}px)` }}
          />
          <div
            className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-neon-blue/10 rounded-full blur-[120px] animate-pulse-slow delay-1000"
            style={{ transform: `translateY(${-scrollY * 0.2}px)` }}
          />

          {/* Subtle Binary/Code Texture Overlay */}
          <div className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300f3ff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              transform: `translateY(${scrollY * 0.05}px)`
            }}
          />
        </div>

        <Navbar />

        <main className="relative z-10 flex flex-col gap-0">
          <Hero />
          <About />
          <Experience />
          <Skills />
          <Projects />
          <Contact />
        </main>

        <footer className="relative z-10 py-8 text-center text-slate-500 border-t border-slate-800 glass-panel">
          <p className="font-mono text-sm">© {new Date().getFullYear()} Nikko. Built with React & Tailwind.</p>
        </footer>

        {/* Scroll to top button */}
        <button
          onClick={scrollToTop}
          className={`fixed bottom-8 right-8 z-50 p-3 rounded-full glass-panel text-neon-blue border-neon-blue/30 hover:bg-neon-blue hover:text-neon-dark transition-all duration-300 transform ${showScrollTop ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            }`}
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </button>
      </div>
    </>
  );
};

export default App;