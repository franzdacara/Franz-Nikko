import React, { useEffect, useRef } from 'react';

interface StarfieldBackgroundProps {
  className?: string;
  speed?: number;
  starCount?: number;
}

interface Star {
  x: number;
  y: number;
  z: number;
  pz: number;
  color: string;
  baseAlpha: number;
}

export const StarfieldBackground: React.FC<StarfieldBackgroundProps> = ({
  className = '',
  speed = 1.2,
  starCount = 280,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const isVisibleRef = useRef(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = container.clientWidth);
    let height = (canvas.height = container.clientHeight);

    // High DPI support
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const setupCanvas = () => {
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };
    setupCanvas();

    const maxDepth = 1200;
    const fov = 320;

    // Palette: crisp monochromatic stars with strategic amber highlights
    const starColors = [
      'rgba(255, 255, 255, ',
      'rgba(244, 244, 245, ',
      'rgba(212, 212, 216, ',
      'rgba(245, 158, 11, ', // amber-500
      'rgba(251, 191, 36, ', // amber-400
    ];

    // Initialize stars in 3D volume
    const stars: Star[] = [];
    for (let i = 0; i < starCount; i++) {
      const isAmber = Math.random() < 0.18;
      const color = isAmber ? (Math.random() < 0.5 ? starColors[3] : starColors[4]) : starColors[Math.floor(Math.random() * 3)];
      stars.push({
        x: (Math.random() - 0.5) * width * 2.5,
        y: (Math.random() - 0.5) * height * 2.5,
        z: Math.random() * maxDepth,
        pz: maxDepth,
        color,
        baseAlpha: 0.35 + Math.random() * 0.65,
      });
    }

    // Mouse movement listener for smooth 3D camera parallax
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / width - 0.5;
      const relY = (e.clientY - rect.top) / height - 0.5;
      mouseRef.current.targetX = relX * 60;
      mouseRef.current.targetY = relY * 60;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Resize listener
    const resizeObserver = new ResizeObserver(() => {
      setupCanvas();
    });
    resizeObserver.observe(container);

    // IntersectionObserver to pause loop when Hero is scrolled out of view
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    observer.observe(container);

    // Render loop
    const render = () => {
      if (isVisibleRef.current) {
        // Smooth mouse parallax lerp
        mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
        mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

        ctx.clearRect(0, 0, width, height);

        const cx = width / 2 + mouseRef.current.x;
        const cy = height / 2 + mouseRef.current.y;

        for (let i = 0; i < stars.length; i++) {
          const star = stars[i];

          // Save previous Z for trail
          star.pz = star.z;

          // Move star towards camera along Z
          star.z -= speed;

          // Recycle star when it passes the camera
          if (star.z <= 0) {
            star.z = maxDepth;
            star.pz = maxDepth;
            star.x = (Math.random() - 0.5) * width * 2.5;
            star.y = (Math.random() - 0.5) * height * 2.5;
          }

          // 3D Perspective Projection
          const k = fov / star.z;
          const px = star.x * k + cx;
          const py = star.y * k + cy;

          // Previous position for speed trail
          const pk = fov / star.pz;
          const prevPx = star.x * pk + cx;
          const prevPy = star.y * pk + cy;

          // Check if within visible bounds (with margin)
          if (px >= -20 && px <= width + 20 && py >= -20 && py <= height + 20) {
            const depthFactor = 1 - star.z / maxDepth;
            const alpha = Math.min(1, Math.max(0.1, depthFactor * star.baseAlpha));
            const size = Math.max(0.6, depthFactor * 2.2);

            // Draw motion trail
            ctx.beginPath();
            ctx.strokeStyle = `${star.color}${alpha * 0.7})`;
            ctx.lineWidth = size * 0.8;
            ctx.lineCap = 'round';
            ctx.moveTo(prevPx, prevPy);
            ctx.lineTo(px, py);
            ctx.stroke();

            // Draw core star particle
            ctx.beginPath();
            ctx.fillStyle = `${star.color}${alpha})`;
            ctx.arc(px, py, size, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
      observer.disconnect();
    };
  }, [speed, starCount]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none overflow-hidden z-0 ${className}`}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
      {/* Subtle bottom fade to seamlessly blend into subsequent sections */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background via-background/40 to-transparent pointer-events-none" />
    </div>
  );
};

export default StarfieldBackground;
