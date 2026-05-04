interface PageHeaderProps {
  children: React.ReactNode;
  compact?: boolean;
}

export function PageHeader({ children, compact = false }: PageHeaderProps) {
  return (
    <header className="border-b border-surface-border bg-surface/80 backdrop-blur-md sticky top-0 z-30">
      <div
        className={`max-w-6xl mx-auto px-6 ${compact ? "py-3" : "py-4"} flex items-center justify-between`}
      >
        {children}
      </div>
    </header>
  );
}
