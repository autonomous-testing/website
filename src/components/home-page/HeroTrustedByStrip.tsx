import React from "react";

// Per-logo height (no fixed slot width) — different logos have different
// optical weight: pure wordmarks read fine smaller, icon+name combos and
// detail-heavy marks need extra height to read evenly. Tuned by eye.
const customers = [
  { name: "Multitude", logo: "/img/customers/multitude-logo-wordmark.svg", invertDark: true, h: "h-6 sm:h-7" },
  { name: "Generali", logo: "/img/customers/generali-logo-small.svg", invertDark: true, h: "h-9 sm:h-11" },
  // Livesport sits early; Flashscore sits late so the two same-group logos
  // never end up adjacent (the marquee also duplicates the array, so the
  // last item touches the first — Accenture → Multitude is fine).
  { name: "Livesport", logo: "/img/customers/livesport-logo.png", invertDark: true, h: "h-9 sm:h-11" },
  { name: "SYNOT", logo: "/img/customers/synot-logo-2.png", invertDark: true, h: "h-7 sm:h-9" },
  { name: "Inventi", logo: "/img/customers/inventi-logo.png", invertDark: true, h: "h-6 sm:h-8" },
  { name: "Tesena", logo: "/img/investors/tesena-logo.png", invertDark: true, h: "h-9 sm:h-11" },
  { name: "Principal", logo: "/img/customers/principal-logo-gray.svg", noFilter: true, h: "h-8 sm:h-10" },
  { name: "Flashscore", logo: "/img/customers/flash-score-logo.png", invertDark: true, h: "h-10 sm:h-12" },
  { name: "Nice Project", logo: "/img/customers/niceproject-logo.svg", invertDark: true, h: "h-7 sm:h-9" },
  { name: "Accenture", logo: "/img/customers/accenture-logo-gray.svg", noFilter: true, h: "h-6 sm:h-8" },
];

const HeroTrustedByStrip = () => {
  const items = [...customers, ...customers];
  return (
    <div className="relative z-10 w-full max-w-6xl px-4">
      <p className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-gray-500 dark:text-gray-400 font-medium mb-3 text-center">
        Trusted by leading engineering teams
      </p>
      <div className="relative overflow-hidden mask-fade-x">
        <div className="flex items-center gap-10 sm:gap-14 animate-marquee whitespace-nowrap py-1">
          {items.map((customer, i) => (
            <img
              key={`${customer.name}-${i}`}
              className={`${customer.h} w-auto object-contain shrink-0 transition-opacity ${
                customer.noFilter
                  ? "opacity-70 hover:opacity-100"
                  : `grayscale opacity-70 hover:opacity-100 ${customer.invertDark ? "dark:invert" : ""}`
              }`}
              src={customer.logo}
              alt={customer.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroTrustedByStrip;
