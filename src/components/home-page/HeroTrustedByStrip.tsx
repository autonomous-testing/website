import React from "react";

const customers = [
  { name: "Multitude", logo: "/img/customers/multitude-logo-wordmark.svg", invertDark: true },
  { name: "Generali", logo: "/img/customers/generali-logo-small.svg", invertDark: true },
  { name: "SYNOT", logo: "/img/customers/synot-logo-2.png", invertDark: true },
  { name: "Inventi", logo: "/img/customers/inventi-logo.png", invertDark: true },
  { name: "Tesena", logo: "/img/investors/tesena-logo.png", invertDark: true },
  { name: "Nice Project", logo: "/img/customers/niceproject-logo.svg", invertDark: true },
  { name: "Flashscore", logo: "/img/customers/flash-score-logo.png", invertDark: true },
  { name: "Principal", logo: "/img/customers/principal-logo-gray.svg", noFilter: true },
  { name: "Accenture", logo: "/img/customers/accenture-logo-gray.svg", noFilter: true },
];

// Fixed slot dimensions keep optically uneven logos (squares vs wordmarks)
// looking balanced in the marquee — each logo is centered in the same box.
const SLOT = "h-9 w-[140px] sm:h-10 sm:w-[160px]";

const HeroTrustedByStrip = () => {
  const items = [...customers, ...customers];
  return (
    <div className="relative z-10 w-full max-w-6xl px-4">
      <p className="text-[10px] sm:text-xs tracking-[0.2em] uppercase text-gray-500 dark:text-gray-400 font-medium mb-3 text-center">
        Trusted by leading engineering teams
      </p>
      <div className="relative overflow-hidden mask-fade-x">
        <div className="flex items-center gap-8 sm:gap-10 animate-marquee whitespace-nowrap py-1">
          {items.map((customer, i) => (
            <div
              key={`${customer.name}-${i}`}
              className={`${SLOT} flex items-center justify-center shrink-0`}
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
