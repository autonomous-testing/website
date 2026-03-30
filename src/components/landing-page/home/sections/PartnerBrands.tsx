import React from "react";

const customers = [
  { name: "Multitude", logo: "/img/customers/multitude-logo-wordmark.svg", invertDark: true, size: "w-[80px] sm:w-[100px]" },
  { name: "Generali", logo: "/img/customers/generali-logo-small.svg", invertDark: true, size: "w-[145px] sm:w-[180px]" },
  { name: "SYNOT", logo: "/img/customers/synot-logo-2.png", invertDark: true, size: "w-[135px] sm:w-[170px]" },
  { name: "Inventi", logo: "/img/customers/inventi-logo.png", invertDark: true, size: "w-[120px] sm:w-[145px]" },
  { name: "Tesena", logo: "/img/investors/tesena-logo.png", invertDark: true, size: "w-[130px] sm:w-[165px]" },
  { name: "Nice Project", logo: "/img/customers/niceproject-logo.svg", invertDark: true, size: "w-[140px] sm:w-[180px]" },
  { name: "Flashscore", logo: "/img/customers/flash-score-logo.png", invertDark: true, size: "w-[160px] sm:w-[200px]" },
  { name: "Principal", logo: "/img/customers/principal-logo-gray.svg", noFilter: true, size: "w-[140px] sm:w-[180px]" },
  { name: "Accenture", logo: "/img/customers/accenture-logo-gray.svg", noFilter: true, size: "w-[120px] sm:w-[145px]" },
];

const techPartners = [
  { name: "GitHub", logo: "/img/partners/github-logo.png", size: "w-[100px] sm:w-[120px]" },
  { name: "Anthropic", logo: "/img/partners/anthropic-logo.svg", size: "w-[130px] sm:w-[160px]" },
  { name: "OpenAI", logo: "/img/partners/openai-logo.svg", size: "w-[100px] sm:w-[120px]" },
  { name: "Microsoft", logo: "/img/partners/microsoft-logo.svg", size: "w-[115px] sm:w-[140px]" },
  { name: "Amazon Web Services", logo: "/img/partners/aws-logo.svg", size: "w-[85px] sm:w-[105px]" },
  { name: "Google Cloud", logo: "/img/partners/google-cloud-logo.png", size: "w-[125px] sm:w-[155px]" },
];

const PartnerBrands = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <p className="text-xs sm:text-sm tracking-[0.2em] uppercase text-gray-500 dark:text-gray-400 font-medium mb-12 text-center">
        Trusted by leading engineering teams
      </p>

      <div className="grid grid-cols-3 gap-y-10 gap-x-4 sm:gap-x-8 max-w-5xl w-full px-8 items-center justify-items-center mb-12">
        {customers.map((customer) => (
          <img
            key={customer.name}
            className={`${customer.size} object-contain transition-opacity ${customer.noFilter ? "opacity-70 hover:opacity-100" : `grayscale opacity-70 hover:opacity-100 ${customer.invertDark ? "dark:invert" : ""}`}`}
            src={customer.logo}
            alt={customer.name}
          />
        ))}
      </div>

      <p className="text-xs sm:text-sm tracking-[0.2em] uppercase text-gray-500 dark:text-gray-400 font-medium mb-10 text-center">
        Powered by world class AI and cloud partners
      </p>

      <div className="grid grid-cols-3 gap-y-6 gap-x-4 sm:gap-x-8 max-w-4xl w-full px-8 items-center justify-items-center">
        {techPartners.map((partner) => (
          <img
            key={partner.name}
            className={`${partner.size} object-contain grayscale dark:invert opacity-70 hover:opacity-100 transition-opacity`}
            src={partner.logo}
            alt={partner.name}
          />
        ))}
      </div>
    </div>
  );
};
export default PartnerBrands;
