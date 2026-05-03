interface CompletionBannerProps {
  courseName: string;
}

export function CompletionBanner({ courseName }: CompletionBannerProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-success/20 bg-gradient-to-br from-success-glow to-surface-raised p-6 mb-6 animate-scale-in">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-success blur-3xl" />
        <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-success blur-3xl" />
      </div>

      <div className="relative flex items-center gap-4">
        <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-success/20 border border-success/30 flex items-center justify-center">
          <span className="text-2xl">🎉</span>
        </div>

        <div>
          <h3 className="text-lg font-display font-bold text-success">
            Course Completed!
          </h3>
          <p className="text-sm text-muted mt-0.5">
            You've finished all lessons in{" "}
            <span className="text-gray-200 font-medium">{courseName}</span>.
            Great work!
          </p>
        </div>
      </div>
    </div>
  );
}
