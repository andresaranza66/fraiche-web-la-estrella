"use client";

import { useEffect, useMemo, useState } from "react";

type RotatingBackgroundProps = {
  images: string[];
  intervalMs?: number;
  startDelayMs?: number;
  className?: string;
};

export default function RotatingBackground({
  images,
  intervalMs = 9000,
  startDelayMs = 20,
  className,
}: RotatingBackgroundProps) {
  const normalized = useMemo(
    () => images.filter((img) => typeof img === "string" && img.trim().length > 0),
    [images],
  );

  const [index, setIndex] = useState<number>(0);

  useEffect(() => {
    if (normalized.length <= 1) return;

    let intervalId: number | undefined;
    const timeoutId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        setIndex((prev) => (prev + 1) % normalized.length);
      }, intervalMs);
    }, Math.max(0, startDelayMs));

    return () => {
      window.clearTimeout(timeoutId);
      if (intervalId !== undefined) window.clearInterval(intervalId);
    };
  }, [intervalMs, normalized.length, startDelayMs]);

  if (normalized.length === 0) return null;

  return (
    <div className={className} aria-hidden>
      {normalized.map((src, i) => (
        <div
          key={`${src}-${i}`}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ease-in-out ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url('${src}')` }}
        />
      ))}
    </div>
  );
}
