import { useEffect, useRef, useState } from "react";

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

export default function useCountOnView(targets, options = {}) {
  const { durationMs = 1200, threshold = 1 } = options;
  const numberRefs = useRef([]);
  const hasAnimated = useRef(new Set());
  const [values, setValues] = useState(() =>
    targets.map(() => 0)
  );

  useEffect(() => {
    setValues((prev) => {
      if (prev.length === targets.length) return prev;
      return targets.map((_, index) => prev[index] ?? 0);
    });
  }, [targets]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = Number(entry.target.dataset.index);
          if (hasAnimated.current.has(index)) return;
          hasAnimated.current.add(index);

          const endValue = Number(targets[index]) || 0;
          const startTime = performance.now();

          const step = (now) => {
            const progress = Math.min((now - startTime) / durationMs, 1);
            const eased = easeOutCubic(progress);
            const current = Math.round(endValue * eased);

            setValues((prev) => {
              if (prev[index] === current) return prev;
              const next = [...prev];
              next[index] = current;
              return next;
            });

            if (progress < 1) {
              requestAnimationFrame(step);
            }
          };

          requestAnimationFrame(step);
        });
      },
      { threshold }
    );

    numberRefs.current.forEach((node) => {
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, [targets, durationMs, threshold]);

  const getRef = (index) => (el) => {
    numberRefs.current[index] = el;
  };

  return { values, getRef };
}
