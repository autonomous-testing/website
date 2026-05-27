import React from "react";

// Each logo lives in a fixed-size slot so wildly different source aspect ratios
// (Generali ~7.3:1, Livesport ~2:1, Multitude ~1:1) cannot dominate the strip.
// `object-contain` shrinks each logo to fit the slot; visual area becomes ~uniform.
// Per-logo `pad` lets us tighten dense marks (Flashscore icon+text) or loosen
// pure wordmarks that need air around them.
const customers = [
  // Livesport sits early; Flashscore late — the marquee duplicates the list, so
  // even at the loop seam (Accenture → Multitude) the two stay apart.
  // multitude-logo-wordmark.svg packs M+"MULTITUDE" into a 1:1 box where the
  // text is illegible at strip height; the PNG version reads cleanly.
  { name: "Multitude", logo: "/img/customers/multitude-logo.png", invertDark: true, pad: "p-1" },
  { name: "Generali", logo: "/img/customers/generali-logo-small.svg", invertDark: true, pad: "p-1.5" },
  { name: "Livesport", logo: "/img/customers/livesport-logo.png", invertDark: true, pad: "p-0.5" },
  { name: "SYNOT", logo: "/img/customers/synot-logo-2.png", invertDark: true, pad: "p-1" },
  { name: "Inventi", logo: "/img/customers/inventi-logo.png", invertDark: true, pad: "p-1" },
  { name: "Tesena", logo: "/img/investors/tesena-logo.png", invertDark: true, pad: "p-0.5" },
  { name: "Principal", logo: "/img/customers/principal-logo-gray.svg", noFilter: true, pad: "p-1" },
  { name: "Flashscore", logo: "/img/customers/flash-score-logo.png", invertDark: true, pad: "p-0.5" },
  { name: "Nice Project", logo: "/img/customers/niceproject-logo.svg", invertDark: true, pad: "p-1" },
  { name: "Accenture", logo: "/img/customers/accenture-logo-gray.svg", noFilter: true, pad: "p-1" },
];

const SLOT = "h-10 w-[150px] sm:h-12 sm:w-[170px]";

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
              className={`${SLOT} ${customer.pad} flex items-center justify-center shrink-0`}
            >
              <img
                className={`max-h-full max-w-full object-contain transition-opacity ${
                  customer.noFilter
                    ? "opacity-70 hover:opacity-100"
                    : `grayscale opacity-70 hover:opacity-100 ${customer.invertDark ? "dark:invert" : ""}`
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
