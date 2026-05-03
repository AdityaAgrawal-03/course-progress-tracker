import { useEffect, useState } from "react";

interface ProgressBarProps {
  value: number;
  size?: "sm" | "md";
  showLabel?: boolean;
  className?: string;
}

export function ProgressBar({
  value,
  size = "md",
  showLabel = false,
  className = "",
}: ProgressBarProps) {
  const [animatedWidth, setAnimatedWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedWidth(value), 100);
    return () => clearTimeout(timer);
  }, [value]);

  const heightClass = size === "sm" ? "h-1.5" : "h-2.5";

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div
        className={`flex-1 ${heightClass} rounded-full bg-surface-overlay overflow-hidden`}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${value}% complete`}
      >
        <div
          className={`${heightClass} rounded-full transition-all duration-700 ease-out ${
            value === 100
              ? "bg-gradient-to-r from-success-dim to-success"
              : "bg-gradient-to-r from-accent-dim to-accent"
          }`}
          style={{ width: `${animatedWidth}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-xs font-mono text-muted min-w-[3ch] text-right">
          {value}%
        </span>
      )}
    </div>
  );
}
