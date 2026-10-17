import React, { useState, useEffect } from 'react';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.floor(Math.random() * 4) + 1;
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      setTimeout(() => {
        setIsFading(true);
        setTimeout(onComplete, 400);
      }, 600);
    }
  }, [progress, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-surface flex flex-col items-center justify-center transition-opacity duration-400 ${isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
    >
      <div className="w-64 md:w-80 font-mono text-text-primary">
        {/* Brand */}
        <div className="mb-8">
          <span className="text-sm font-bold tracking-tight">NIKKO</span>
          <span className="text-sm font-bold text-accent">.DEV</span>
        </div>

        {/* Progress bar */}
        <div className="w-full h-px bg-border mb-3 relative overflow-hidden">
          <div
            className="h-full bg-accent transition-all duration-75"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>

        {/* Status */}
        <div className="flex justify-between text-[11px] text-text-muted tracking-wider uppercase">
          <span>{progress >= 100 ? 'Ready' : 'Loading'}</span>
          <span>{Math.min(progress, 100)}%</span>
        </div>
      </div>
    </div>
  );
};

export default Preloader;