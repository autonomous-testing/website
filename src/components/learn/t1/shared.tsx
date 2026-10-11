import React, { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { codeSurface, focusRing } from "@/components/learn/styles";

const STORE = "wopee-learn-t1";

type Stored = Record<string, unknown>;

// Progress lives in this browser only. Storage can be blocked (private mode,
// cleared site data), so every read and write is wrapped and the page works without it.
function readAll(): Stored {
  try {
    const raw = window.localStorage.getItem(STORE);
    return raw ? (JSON.parse(raw) as Stored) : {};
  } catch {
    return {};
  }
}

function writeKey(key: string, value: unknown) {
  try {
    const all = readAll();
    all[key] = value;
    window.localStorage.setItem(STORE, JSON.stringify(all));
  } catch {
    /* storage unavailable */
  }
}

/** State that survives a reload. Starts from `initial` on the server and the first render. */
export function useStored<T>(
  key: string,
  initial: T,
  isValid: (v: unknown) => v is T,
): [T, (v: T) => void, boolean] {
  const [value, setValue] = useState<T>(initial);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const v = readAll()[key];
    if (isValid(v)) setValue(v);
    setLoaded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  const set = useCallback(
    (v: T) => {
      setValue(v);
      writeKey(key, v);
    },
    [key],
  );
  return [value, set, loaded];
}

/** Renders `code`, **bold** and _italic_ marks in short copy strings. */
export function Md({ text }: { text: string }) {
  const parts = text.split(/(`[^`]+`|\*\*[^*]+\*\*|\b_[^_]+_\b)/g);
  return (
    <>
      {parts.map((p, i) => {
        if (p.startsWith("`") && p.endsWith("`") && p.length > 1)
          return <code key={i}>{p.slice(1, -1)}</code>;
        if (p.startsWith("**") && p.endsWith("**") && p.length > 3)
          return <strong key={i}>{p.slice(2, -2)}</strong>;
        if (p.startsWith("_") && p.endsWith("_") && p.length > 1)
          return <em key={i}>{p.slice(1, -1)}</em>;
        return <React.Fragment key={i}>{p}</React.Fragment>;
      })}
    </>
  );
}

export const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="mb-2 text-sm font-bold uppercase tracking-widest text-secondary-wopee dark:text-yellow-200/80">
    {children}
  </p>
);

export const SectionTitle = ({
  id,
  children,
}: {
  id: string;
  children: React.ReactNode;
}) => (
  <h2 id={id} className="mb-5 text-3xl font-bold leading-tight tracking-tight text-balance sm:text-4xl">
    {children}
  </h2>
);

export const Callout = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div className="mt-6 rounded-xl border-0 border-l-4 border-solid border-secondary-wopee dark:border-primary-wopee bg-secondary-wopee/5 dark:bg-white/[0.04] px-5 py-4">
    <p>
      <span className="font-bold text-secondary-wopee dark:text-primary-wopee">
        {label}
      </span>{" "}
      {children}
    </p>
  </div>
);

/** Tracks whether a horizontal scroller has more content to the right (drives the edge fade). */
export function useScrollMore<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [more, setMore] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setMore(el.scrollLeft + el.clientWidth < el.scrollWidth - 2);
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = typeof ResizeObserver !== "undefined" ? new ResizeObserver(update) : null;
    ro?.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro?.disconnect();
    };
  }, []);
  return [ref, more] as const;
}

/** A code block that scrolls sideways (never wraps), with an edge fade and keyboard access. */
export const CodeBlock = ({
  children,
  label = "Code sample",
}: {
  children: string;
  label?: string;
}) => {
  const [ref, more] = useScrollMore<HTMLPreElement>();
  return (
    <pre
      ref={ref}
      tabIndex={0}
      role="region"
      aria-label={label}
      data-more={more}
      className={cn(
        "learn-scroll !my-4 !rounded-xl !bg-[#141416] !p-4 text-[13px] leading-relaxed",
        codeSurface,
        focusRing,
      )}
    >
      <code className="!bg-transparent !text-gray-100 !border-0 !p-0 whitespace-pre">
        {children}
      </code>
    </pre>
  );
};

export const ExternalLink = ({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className={
      className ??
      "font-semibold text-secondary-wopee dark:text-primary-wopee underline decoration-secondary-wopee/30 dark:decoration-primary-wopee/40 underline-offset-4 hover:decoration-current"
    }
  >
    {children}
  </a>
);

/** Shared look for small inline controls (Infima restyles bare buttons). */
export const smallButton =
  "inline-flex items-center justify-center min-h-[44px] font-[inherit] rounded-lg border border-solid border-gray-300 dark:border-white/15 bg-white dark:bg-white/[0.04] px-4 py-2 text-sm font-semibold text-gray-900 dark:text-gray-100 cursor-pointer hover:border-secondary-wopee dark:hover:border-primary-wopee focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-wopee dark:focus-visible:outline-primary-wopee";

export const inputClass =
  "w-full min-h-[44px] rounded-lg border border-solid border-gray-300 dark:border-white/15 bg-white dark:bg-white/[0.06] px-3 py-2 font-mono text-sm text-gray-900 dark:text-gray-100 focus:outline focus:outline-2 focus:outline-secondary-wopee dark:focus:outline-primary-wopee aria-[invalid=true]:border-red-500 dark:aria-[invalid=true]:border-red-400";
