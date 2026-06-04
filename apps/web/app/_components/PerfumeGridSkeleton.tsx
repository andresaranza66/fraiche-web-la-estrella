"use client";

type PerfumeGridSkeletonProps = {
  count?: number;
};

export default function PerfumeGridSkeleton({ count = 12 }: PerfumeGridSkeletonProps) {
  return (
    <div className="mx-auto max-w-[1200px]">
      <div className="grid grid-cols-1 gap-10 rounded-2xl border border-[color:var(--color-neutral-200)] bg-white p-10 md:grid-cols-2 mt-5">
        <div className="flex max-w-[620px] flex-col items-start justify-center gap-4">
          <div className="h-5 w-56 rounded-lg bg-[color:var(--color-neutral-200)] animate-pulse" />
          <div className="h-10 w-80 rounded-xl bg-[color:var(--color-neutral-200)] animate-pulse" />
          <div className="h-5 w-full max-w-[520px] rounded-lg bg-[color:var(--color-neutral-200)] animate-pulse" />
          <div className="h-5 w-full max-w-[420px] rounded-lg bg-[color:var(--color-neutral-200)] animate-pulse" />
        </div>

        <div className="flex items-center justify-center">
          <div className="h-[260px] w-[260px] rounded-2xl bg-[color:var(--color-neutral-200)] animate-pulse" />
        </div>
      </div>

      <div className="mt-48 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 ">
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className=" rounded-2xl border border-[color:var(--color-neutral-200)] bg-white p-4"
          >
            <div className="h-12 w-full rounded-xl bg-[color:var(--color-neutral-200)] animate-pulse" />
            <div className="mt-4 h-5 w-3/4 rounded-lg bg-[color:var(--color-neutral-200)] animate-pulse" />
            <div className="mt-2 h-4 w-1/2 rounded-lg bg-[color:var(--color-neutral-200)] animate-pulse" />
            <div className="mt-4 flex gap-2">
              <div className="h-7 w-16 rounded-full bg-[color:var(--color-neutral-200)] animate-pulse" />
              <div className="h-7 w-20 rounded-full bg-[color:var(--color-neutral-200)] animate-pulse" />
              <div className="h-7 w-14 rounded-full bg-[color:var(--color-neutral-200)] animate-pulse" />
            </div>
            <div className="mt-5 h-10 w-full rounded-xl bg-[color:var(--color-neutral-200)] animate-pulse" />
          </div>
        ))}
      </div>
    </div>
  );
}