import React from "react";

const customers = [
  { name: "Multitude", logo: "/img/customers/multitude-logo-wordmark.svg", invertDark: true, size: "h-6 sm:h-7" },
  { name: "Generali", logo: "/img/customers/generali-logo-small.svg", invertDark: true, size: "h-8 sm:h-9" },
  { name: "SYNOT", logo: "/img/customers/synot-logo-2.png", invertDark: true, size: "h-7 sm:h-8" },
  { name: "Inventi", logo: "/img/customers/inventi-logo.png", invertDark: true, size: "h-6 sm:h-7" },
  { name: "Tesena", logo: "/img/investors/tesena-logo.png", invertDark: true, size: "h-7 sm:h-8" },
  { name: "Nice Project", logo: "/img/customers/niceproject-logo.svg", invertDark: true, size: "h-7 sm:h-8" },
  { name: "Flashscore", logo: "/img/customers/flash-score-logo.png", invertDark: true, size: "h-7 sm:h-8" },
  { name: "Principal", logo: "/img/customers/principal-logo-gray.svg", noFilter: true, size: "h-7 sm:h-8" },
  { name: "Accenture", logo: "/img/customers/accenture-logo-gray.svg", noFilter: true, size: "h-6 sm:h-7" },
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
              className={`${customer.size} w-auto object-contain shrink-0 transition-opacity ${
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
