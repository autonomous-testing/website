import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export default function ReadingProgressBar() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = document.documentElement;
        const max = h.scrollHeight - h.clientHeight;
        const next = max > 0 ? (h.scrollTop / max) * 100 : 0;
        setPct(Math.min(100, Math.max(0, next)));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className={cn(
        "fixed left-0 right-0 z-[60] h-[3px] pointer-events-none",
        "top-[var(--ifm-navbar-height,80px)]",
      )}
    >
      <div
        className="h-full bg-primary-wopee shadow-[0_0_10px_rgba(255,204,0,0.6)] transition-[width] duration-75 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
