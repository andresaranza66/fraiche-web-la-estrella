"use client";

type PerfumeGridSkeletonProps = {
  count?: number;
};

export default function PerfumeGridSkeleton({ count = 6 }: PerfumeGridSkeletonProps) {
  return (
    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="flex h-full flex-col rounded-2xl border border-[color:var(--color-neutral-200)] bg-white p-6"
        >
          {/* Top row: image + name/tags (horizontal, like the real card) */}
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 shrink-0 rounded-xl bg-[color:var(--color-neutral-200)] animate-pulse" />
            <div className="min-w-0 flex-1">
              <div className="h-5 w-3/4 rounded-lg bg-[color:var(--color-neutral-200)] animate-pulse" />
              <div className="mt-3 flex flex-wrap gap-2">
                <div className="h-6 w-14 rounded-full bg-[color:var(--color-neutral-200)] animate-pulse" />
                <div className="h-6 w-16 rounded-full bg-[color:var(--color-neutral-200)] animate-pulse" />
              </div>
            </div>
          </div>

          {/* Footer row: price + badge, pinned to the bottom */}
          <div className="mt-auto flex items-center justify-between pt-6">
            <div className="h-4 w-24 rounded-lg bg-[color:var(--color-neutral-200)] animate-pulse" />
            <div className="h-7 w-20 rounded-full bg-[color:var(--color-neutral-200)] animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}