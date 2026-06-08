import React from "react";

// Per-logo slot (height + width) so wildly different source aspect ratios
// (Generali ~7.3:1 wide, Multitude ~2:1, Livesport ~2:1) can each occupy a
// similar optical area. Wide wordmarks get wider/shorter slots; 2:1 PNGs that
// looked too small get taller slots.
type Customer = {
  name: string;
  logo: string;
  invertDark?: boolean;
  noFilter?: boolean;
  h: string;
  w: string;
  pad?: string;
};

const customers: Customer[] = [
  // Livesport sits early; Flashscore late so they're never adjacent (the
  // marquee duplicates and loops — Accenture → Multitude is the only seam).
  { name: "Multitude", logo: "/img/customers/multitude-logo.png", invertDark: true, h: "h-10 sm:h-12", w: "w-[130px] sm:w-[150px]", pad: "p-1" },
  { name: "Generali", logo: "/img/customers/generali-logo-small.svg", invertDark: true, h: "h-7 sm:h-9", w: "w-[140px] sm:w-[160px]", pad: "p-1" },
  { name: "Livesport", logo: "/img/customers/livesport-logo.png", invertDark: true, h: "h-12 sm:h-14", w: "w-[140px] sm:w-[160px]", pad: "p-0" },
  { name: "SYNOT", logo: "/img/customers/synot-logo-2.png", invertDark: true, h: "h-10 sm:h-12", w: "w-[160px] sm:w-[180px]", pad: "p-1" },
  { name: "Inventi", logo: "/img/customers/inventi-logo.png", invertDark: true, h: "h-10 sm:h-12", w: "w-[130px] sm:w-[150px]", pad: "p-1" },
  { name: "Tesena", logo: "/img/investors/tesena-logo.png", invertDark: true, h: "h-12 sm:h-14", w: "w-[150px] sm:w-[170px]", pad: "p-0" },
  { name: "Principal", logo: "/img/customers/principal-logo-gray.svg", noFilter: true, h: "h-9 sm:h-10", w: "w-[140px] sm:w-[160px]", pad: "p-1" },
  { name: "Flashscore", logo: "/img/customers/flash-score-logo.png", invertDark: true, h: "h-12 sm:h-14", w: "w-[150px] sm:w-[170px]", pad: "p-0" },
  { name: "Nice Project", logo: "/img/customers/niceproject-logo.svg", invertDark: true, h: "h-9 sm:h-10", w: "w-[140px] sm:w-[160px]", pad: "p-1" },
  { name: "Accenture", logo: "/img/customers/accenture-logo-gray.svg", noFilter: true, h: "h-9 sm:h-10", w: "w-[130px] sm:w-[150px]", pad: "p-1" },
];

const HeroTrustedByStrip = () => {
  const items = [...customers, ...customers];
  return (
    <div className="relative z-10 w-full max-w-6xl px-4">
      <p className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-gray-500 dark:text-gray-400 font-medium mb-3 text-center">
        Trusted by leading engineering teams
      </p>
      <div className="relative overflow-hidden mask-fade-x">
        <div className="flex items-center gap-6 sm:gap-8 animate-marquee whitespace-nowrap py-1">
          {items.map((customer, i) => (
            <div
              key={`${customer.name}-${i}`}
              className={`${customer.h} ${customer.w} ${customer.pad ?? ""} flex items-center justify-center shrink-0`}
            >
              <img
                className={`max-h-full max-w-full object-contain transition-opacity ${
                  customer.noFilter
                    ? "opacity-40 hover:opacity-100"
                    : `grayscale opacity-40 hover:opacity-100 ${customer.invertDark ? "dark:invert" : ""}`
                }`}
                src={customer.logo}
                alt={customer.name}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroTrustedByStrip;
