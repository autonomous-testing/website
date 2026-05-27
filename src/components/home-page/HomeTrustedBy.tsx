import React from "react";

const techPartners = [
  { name: "GitHub", logo: "/img/partners/github-logo.png", size: "w-[100px] sm:w-[120px]" },
  { name: "Anthropic", logo: "/img/partners/anthropic-logo.svg", size: "w-[130px] sm:w-[160px]" },
  { name: "OpenAI", logo: "/img/partners/openai-logo.svg", size: "w-[100px] sm:w-[120px]" },
  { name: "Microsoft", logo: "/img/partners/microsoft-logo.svg", size: "w-[115px] sm:w-[140px]" },
  { name: "Amazon Web Services", logo: "/img/partners/aws-logo.svg", size: "w-[85px] sm:w-[105px]" },
  { name: "Google Cloud", logo: "/img/partners/google-cloud-logo.png", size: "w-[125px] sm:w-[155px]" },
];

const HomeTrustedBy = () => {
  return (
    <div className="flex flex-col items-center justify-center my-20 container">
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

export default HomeTrustedBy;
