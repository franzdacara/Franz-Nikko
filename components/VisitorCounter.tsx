import React, { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';

interface VisitorCounterProps {
  className?: string;
  variant?: 'minimal' | 'badge' | 'footer';
}

export const VisitorCounter: React.FC<VisitorCounterProps> = ({
  className = '',
  variant = 'badge',
}) => {
  const [visits, setVisits] = useState<number | null>(() => {
    // Read cached count instantly on initial render to prevent layout shift
    try {
      const cached = localStorage.getItem('nikko_real_visit_count');
      return cached ? parseInt(cached, 10) : null;
    } catch {
      return null;
    }
  });

  const [isLoading, setIsLoading] = useState<boolean>(visits === null);

  useEffect(() => {
    let isMounted = true;
    const COUNTER_KEY = 'nikkodacara_portfolio_visits';
    const SESSION_KEY = 'nikko_portfolio_session_counted';
    const CACHE_KEY = 'nikko_real_visit_count';

    const fetchRealCount = async () => {
      try {
        const hasCountedSession = sessionStorage.getItem(SESSION_KEY);
        // Use 'hit' if new visit session, or 'get' if refreshing in the same session
        const endpoint = hasCountedSession
          ? `https://countapi.mileshilliard.com/api/v1/get/${COUNTER_KEY}`
          : `https://countapi.mileshilliard.com/api/v1/hit/${COUNTER_KEY}`;

        const res = await fetch(endpoint, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const data = await res.json();
        const realCount = typeof data.value === 'number' ? data.value : parseInt(data.value, 10);

        if (!isNaN(realCount) && isMounted) {
          setVisits(realCount);
          setIsLoading(false);
          localStorage.setItem(CACHE_KEY, realCount.toString());
          if (!hasCountedSession) {
            sessionStorage.setItem(SESSION_KEY, 'true');
          }
        }
      } catch (err) {
        // In case of network error, use cached value or fallback to local increment
        console.warn('Real count API unreachable, using local persistent count', err);
        if (isMounted) {
          setIsLoading(false);
          const cached = localStorage.getItem(CACHE_KEY);
          if (cached) {
            setVisits(parseInt(cached, 10));
          } else {
            setVisits(1);
          }
        }
      }
    };

    fetchRealCount();

    return () => {
      isMounted = false;
    };
  }, []);

  const formattedCount = visits !== null ? visits.toLocaleString('en-US') : (isLoading ? '···' : '1');

  if (variant === 'minimal') {
    return (
      <span className={`font-mono text-accent font-semibold tracking-wider ${className}`}>
        {formattedCount}
      </span>
    );
  }

  if (variant === 'footer') {
    return (
      <div className={`inline-flex items-center gap-2.5 font-mono text-xs text-text-muted ${className}`}>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
          <Eye size={13} className="text-accent" />
          <span className="text-[11px] uppercase tracking-wider text-text-muted">Total Visits //</span>
        </div>
        <span className="bg-surface-raised border border-border px-2.5 py-0.5 text-accent font-semibold tracking-widest text-[11px] shadow-sm">
          {formattedCount}
        </span>
      </div>
    );
  }

  return (
    <div className={`inline-flex items-center gap-2 border border-border bg-surface-raised px-3 py-1 font-mono text-xs ${className}`}>
      <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
      <span className="text-text-muted text-[11px] uppercase tracking-wider">Visits:</span>
      <span className="text-accent font-semibold tracking-wider">{formattedCount}</span>
    </div>
  );
};

export default VisitorCounter;
