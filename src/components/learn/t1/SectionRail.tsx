import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { focusRing } from "@/components/learn/styles";

export type RailItem = { id: string; label: string };

// Sticky "on this page" rail for wide screens: where you are in the lesson.
export default function SectionRail({ items }: { items: RailItem[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const els = items
      .map((i) => document.getElementById(i.id))
      .filter((e): e is HTMLElement => !!e);
    if (!els.length || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) {
          visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav aria-label="On this page" className="hidden xl:block">
      <ol className="sticky top-24 m-0 mt-10 list-none border-0 border-l border-solid border-gray-200 p-0 dark:border-white/10">
        {items.map((i) => {
          const on = i.id === active;
          return (
            <li key={i.id}>
              <a
                href={`#${i.id}`}
                aria-current={on ? "location" : undefined}
                className={cn(
                  "-ml-px block border-0 border-l-2 border-solid py-1.5 pl-4 text-sm hover:no-underline",
                  on
                    ? "border-secondary-wopee font-semibold text-gray-900 dark:border-primary-wopee dark:text-white"
                    : "border-transparent text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100",
                  focusRing,
                )}
              >
                {i.label}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
