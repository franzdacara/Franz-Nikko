import React, { useState, useEffect } from 'react';
import { Terminal } from 'lucide-react';

interface PreloaderProps {
    onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [textIndex, setTextIndex] = useState(0);
    const [isFading, setIsFading] = useState(false);

    const loadingTexts = [
        "INITIALIZING SYSTEM...",
        "LOADING ASSETS...",
        "COMPILING SHADERS...",
        "ESTABLISHING CONNECTION...",
        "ACCESS GRANTED."
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    return 100;
                }
                // Randomize increment for more natural "loading" feel
                return prev + Math.floor(Math.random() * 5) + 1;
            });
        }, 50);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        // Switch text based on progress milestones
        const newIndex = Math.min(
            Math.floor((progress / 100) * loadingTexts.length),
            loadingTexts.length - 1
        );
        setTextIndex(newIndex);

        if (progress === 100) {
            setTimeout(() => {
                setIsFading(true);
                setTimeout(onComplete, 500); // Wait for fade out transition
            }, 800);
        }
    }, [progress, onComplete]);

    return (
        <div
            className={`fixed inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-center transition-opacity duration-500 ${isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}
        >
            {/* Scanline Effect Overlay */}
            <div className="absolute inset-0 pointer-events-none scanline z-20"></div>

            <div className="relative z-10 w-80 md:w-96 font-mono text-neon-blue">
                {/* Header */}
                <div className="flex items-center gap-2 mb-8 animate-pulse">
                    <Terminal size={24} />
                    <span className="text-xl font-bold tracking-widest">SYSTEM BOOT</span>
                </div>

                {/* Terminal Output */}
                <div className="h-32 flex flex-col justify-end mb-8 text-sm md:text-base text-slate-400 border-l-2 border-slate-800 pl-4">
                    {loadingTexts.map((text, idx) => (
                        <div
                            key={idx}
                            className={`${idx === textIndex ? 'text-neon-blue font-bold' : 'text-slate-600'} ${idx > textIndex ? 'hidden' : 'block'}`}
                        >
                            <span className="mr-2">{'>'}</span>
                            {text}
                        </div>
                    ))}
                    <div className="animate-pulse text-neon-blue mt-1">_</div>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-1 bg-slate-800 mb-2 relative overflow-hidden">
                    <div
                        className="h-full bg-neon-blue shadow-[0_0_10px_#00f3ff]"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                {/* Percentage */}
                <div className="flex justify-between text-xs text-slate-500 font-mono">
                    <span>MEMORY: 64TB</span>
                    <span>{progress}%</span>
                </div>
            </div>
        </div>
    );
};

export default Preloader;