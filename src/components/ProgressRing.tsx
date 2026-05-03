import { useEffect, useState } from "react";

interface ProgressRingProps {
  value: number;
  size?: number;
  strokeWidth?: number;
}

export function ProgressRing({
  value,
  size = 120,
  strokeWidth = 8,
}: ProgressRingProps) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animatedValue / 100) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedValue(value), 150);
    return () => clearTimeout(timer);
  }, [value]);

  const isComplete = value === 100;

  return (
    <div className="relative inline-flex items-center justify-center" role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100} aria-label={`${value}% complete`}>
      <svg width={size} height={size} className="-rotate-90" aria-hidden="true">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          className="text-surface-overlay"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#progressGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-700 ease-out"
        />
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop
              offset="0%"
              stopColor={isComplete ? "#059669" : "#6366f1"}
            />
            <stop
              offset="100%"
              stopColor={isComplete ? "#34d399" : "#818cf8"}
            />
          </linearGradient>
        </defs>
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-display font-bold tracking-tight">
          {value}%
        </span>
        <span className="text-[10px] uppercase tracking-widest text-muted mt-0.5">
          {isComplete ? "Done!" : "Complete"}
        </span>
      </div>
    </div>
  );
}
