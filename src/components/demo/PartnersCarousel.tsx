import React from "react";

import PartnersCarouselCard from "./PartnersCarouselCard";

const partners = [
  {
    name: "Livesport",
    logo: "/img/customers/livesport-logo.png",
    classes: "grayscale dark:invert",
  },
  {
    name: "Multitude",
    logo: "/img/customers/multitude-logo.png",
    classes: "grayscale dark:invert",
  },
];

const PartnersCarousel = () => {
  return (
    <div className="mb-5">
      <h3 className="text-center opacity-70">Trusted by our partners</h3>
      <div className="flex justify-center gap-5 mt-10">
        {partners.map((partner) => (
          <PartnersCarouselCard
            key={partner.name}
            logo={partner.logo}
            classes={partner.classes}
          />
        ))}
      </div>
    </div>
  );
};
export default PartnersCarousel;
