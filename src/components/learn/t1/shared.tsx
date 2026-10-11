import React, { useCallback, useEffect, useState } from "react";

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
  <p className="text-sm font-bold uppercase tracking-widest text-secondary-wopee dark:text-primary-wopee mb-2">
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
  <h2 id={id} className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-5">
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
  <div className="mt-6 rounded-xl border-0 border-l-4 border-solid border-secondary-wopee dark:border-primary-wopee bg-secondary-wopee/5 dark:bg-primary-wopee/5 px-5 py-4">
    <p>
      <span className="font-bold text-secondary-wopee dark:text-primary-wopee">
        {label}
      </span>{" "}
      {children}
    </p>
  </div>
);

export const CodeBlock = ({ children }: { children: string }) => (
  <pre className="!my-4 !rounded-xl !bg-gray-950 !p-4 text-sm overflow-x-auto border border-solid border-gray-800">
    <code className="!bg-transparent !text-gray-100 !border-0 !p-0 whitespace-pre">
      {children}
    </code>
  </pre>
);

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
      "font-semibold text-secondary-wopee dark:text-primary-wopee underline underline-offset-2"
    }
  >
    {children}
  </a>
);

/** Shared look for small inline controls (Infima restyles bare buttons). */
export const smallButton =
  "inline-flex items-center justify-center min-h-[44px] font-[inherit] rounded-lg border border-solid border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-2 text-sm font-semibold text-gray-900 dark:text-gray-100 cursor-pointer hover:border-secondary-wopee dark:hover:border-primary-wopee focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-wopee dark:focus-visible:outline-primary-wopee";

export const inputClass =
  "w-full min-h-[44px] rounded-lg border border-solid border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-3 py-2 font-mono text-sm text-gray-900 dark:text-gray-100 focus:outline focus:outline-2 focus:outline-secondary-wopee dark:focus:outline-primary-wopee aria-[invalid=true]:border-red-500 dark:aria-[invalid=true]:border-red-400";
