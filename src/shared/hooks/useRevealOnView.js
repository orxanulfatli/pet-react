import { useEffect, useRef, useState } from "react";

export default function useRevealOnView(count, options = {}) {
  const { threshold = 1 } = options;
  const elementRefs = useRef([]);
  const [visible, setVisible] = useState(() =>
    Array.from({ length: count }, () => false)
  );

  useEffect(() => {
    setVisible((prev) => {
      if (prev.length === count) return prev;
      return Array.from({ length: count }, (_, index) => prev[index] || false);
    });
  }, [count]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const index = Number(entry.target.dataset.index);
          setVisible((prev) => {
            if (prev[index]) return prev;
            const next = [...prev];
            next[index] = true;
            return next;
          });
        });
      },
      { threshold }
    );

    elementRefs.current.forEach((node) => {
      if (node) observer.observe(node);
    });

    return () => observer.disconnect();
  }, [threshold]);

  const getRef = (index) => (el) => {
    elementRefs.current[index] = el;
  };

  return { visible, getRef };
}
