import { RefObject, useEffect, useState } from "react";

const MAX_WAIT_MS = 2500;

type IdleWindow = Window & {
  requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
  cancelIdleCallback?: (handle: number) => void;
};

// Becomes true (and stays true) once the element is near the viewport and the
// page has loaded (or MAX_WAIT_MS passed, so slow third-party scripts can't
// hold it back) and gone idle, so demo videos never compete with the first
// render for network and main thread. With respectReducedMotion it stays false
// for visitors who prefer reduced motion, they keep the poster.
export default function useDeferredInView(
  ref: RefObject<Element>,
  { rootMargin = "0px", respectReducedMotion = false } = {}
): boolean {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (ready) return;
    if (
      respectReducedMotion &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const w = window as IdleWindow;
    let cancelled = false;
    let observer: IntersectionObserver | undefined;
    let idleHandle: number | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let maxWait: ReturnType<typeof setTimeout> | undefined;
    let started = false;

    const observe = () => {
      if (cancelled || !ref.current) return;
      if (!("IntersectionObserver" in window)) {
        setReady(true);
        return;
      }
      observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            observer?.disconnect();
            setReady(true);
          }
        },
        { rootMargin }
      );
      observer.observe(ref.current);
    };

    const afterIdle = () => {
      if (started) return;
      started = true;
      window.removeEventListener("load", afterIdle);
      if (maxWait) clearTimeout(maxWait);
      if (w.requestIdleCallback) {
        idleHandle = w.requestIdleCallback(observe, { timeout: 2000 });
      } else {
        timer = setTimeout(observe, 200);
      }
    };

    if (document.readyState === "complete") {
      afterIdle();
    } else {
      window.addEventListener("load", afterIdle, { once: true });
      maxWait = setTimeout(afterIdle, MAX_WAIT_MS);
    }

    return () => {
      cancelled = true;
      window.removeEventListener("load", afterIdle);
      observer?.disconnect();
      if (idleHandle !== undefined) w.cancelIdleCallback?.(idleHandle);
      if (timer) clearTimeout(timer);
      if (maxWait) clearTimeout(maxWait);
    };
  }, [ready, ref, rootMargin, respectReducedMotion]);

  return ready;
}
