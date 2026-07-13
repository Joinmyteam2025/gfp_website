import { useEffect, useRef, type ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/* Speed multipliers — mobile gets near-zero delays */
const DELAY_SCALE_DESKTOP = 0.3;
const MAX_DELAY_DESKTOP = 120; /* ms */
const DELAY_SCALE_MOBILE = 0.1;
const MAX_DELAY_MOBILE = 40; /* ms — almost instant on mobile */
const MOBILE_BREAKPOINT = 768;

export function ScrollReveal({ children, className = "", delay = 0 }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const isMobile = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`).matches;
    const scale = isMobile ? DELAY_SCALE_MOBILE : DELAY_SCALE_DESKTOP;
    const cap = isMobile ? MAX_DELAY_MOBILE : MAX_DELAY_DESKTOP;
    const scaledDelay = Math.min(Math.round(delay * scale), cap);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (scaledDelay > 0) {
            setTimeout(() => {
              el.classList.add("visible");
            }, scaledDelay);
          } else {
            el.classList.add("visible");
          }
          observer.unobserve(el);
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px 40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}
