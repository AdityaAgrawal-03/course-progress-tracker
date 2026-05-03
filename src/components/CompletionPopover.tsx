import { useEffect, useRef, useState } from "react";

interface CompletionPopoverProps {
  courseName: string;
  show: boolean;
  onClose: () => void;
}

const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  emoji: ["\u{1F389}", "✨", "\u{1F31F}", "\u{1F4AB}", "\u{1F38A}", "⭐"][i % 6],
  angle: (i / 20) * 360,
  distance: 80 + Math.random() * 60,
  delay: Math.random() * 0.3,
  size: 14 + Math.random() * 10,
}));

export function CompletionPopover({ courseName, show, onClose }: CompletionPopoverProps) {
  const [visible, setVisible] = useState(false);
  const [animating, setAnimating] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (show) {
      setVisible(true);
      requestAnimationFrame(() => setAnimating(true));
      setTimeout(() => buttonRef.current?.focus(), 400);
    } else {
      setAnimating(false);
      const t = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(t);
    }
  }, [show]);

  useEffect(() => {
    if (!show) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [show, onClose]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300 ${
          animating ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Popover */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Course completed"
        className={`relative w-full max-w-sm rounded-3xl border border-success/20 bg-surface-raised p-8 text-center overflow-hidden transition-all duration-500 ${
          animating
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-75 translate-y-6"
        }`}
        style={{ transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)" }}
      >
        {/* Glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-success/10 blur-3xl" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 rounded-full bg-accent/5 blur-3xl" />
        </div>

        {/* Particles */}
        <div className="absolute top-1/3 left-1/2 pointer-events-none">
          {PARTICLES.map((p) => (
            <span
              key={p.id}
              className={`absolute transition-all ${
                animating ? "opacity-0" : "opacity-0"
              }`}
              style={{
                fontSize: p.size,
                transform: animating
                  ? `translate(${Math.cos((p.angle * Math.PI) / 180) * p.distance}px, ${Math.sin((p.angle * Math.PI) / 180) * p.distance}px) scale(0.5)`
                  : "translate(0, 0) scale(0)",
                opacity: animating ? 0 : 0,
                animation: animating
                  ? `particle-burst 1.2s ${0.3 + p.delay}s ease-out forwards`
                  : "none",
              }}
            >
              {p.emoji}
            </span>
          ))}
        </div>

        {/* Trophy */}
        <div
          className={`relative mx-auto mb-5 w-20 h-20 rounded-full bg-success/15 border-2 border-success/30 flex items-center justify-center transition-all duration-500 ${
            animating ? "scale-100 rotate-0" : "scale-0 -rotate-45"
          }`}
          style={{
            transitionDelay: "150ms",
            transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          <span
            className="text-4xl"
            style={{
              animation: animating ? "trophy-pulse 2s 0.8s ease-in-out infinite" : "none",
            }}
          >
            🏆
          </span>
        </div>

        {/* Heading */}
        <h2
          className={`relative text-2xl font-display font-bold text-gray-100 mb-2 transition-all duration-400 ${
            animating ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
          style={{ transitionDelay: "250ms" }}
        >
          Congratulations!
        </h2>

        {/* Subtext */}
        <p
          className={`relative text-sm text-muted mb-2 leading-relaxed transition-all duration-400 ${
            animating ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
          style={{ transitionDelay: "350ms" }}
        >
          You've completed every lesson in
        </p>
        <p
          className={`relative text-base font-semibold text-success mb-6 transition-all duration-400 ${
            animating ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
          style={{ transitionDelay: "400ms" }}
        >
          {courseName}
        </p>

        {/* Stats pill */}
        <div
          className={`relative inline-flex items-center gap-2 bg-success/10 border border-success/20 rounded-full px-4 py-2 mb-6 transition-all duration-400 ${
            animating ? "opacity-100 scale-100" : "opacity-0 scale-80"
          }`}
          style={{ transitionDelay: "500ms" }}
        >
          <span className="text-success text-sm font-mono font-bold">100%</span>
          <span className="text-muted text-xs">Course Mastered</span>
        </div>

        {/* Close button */}
        <button
          ref={buttonRef}
          onClick={onClose}
          className={`relative block w-full py-3 rounded-xl bg-success/20 border border-success/30 text-success font-semibold text-sm hover:bg-success/30 transition-all duration-400 ${
            animating ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
          style={{ transitionDelay: "550ms" }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
