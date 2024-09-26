import PartnersCarouselCard from "@site/src/components/demo/PartnersCarouselCard";
import React from "react";

const partners = [
  {
    name: "Multitude",
    logo: "/img/customers/multitude-logo.png",
    classes: "grayscale dark:invert",
  },
  {
    name: "Flash Score",
    logo: "/img/customers/flash-score-logo.png",
    classes: "grayscale dark:invert",
  },
  {
    name: "Kedros",
    logo: "/img/customers/kedros-logo-2.png",
    classes: "grayscale rounded-lg",
  },
  {
    name: "Inventi",
    logo: "/img/customers/inventi-logo.png",
    classes: "grayscale dark:invert",
  },
];

const PartnerBrands = () => {
  return (
    <div>
      <div className="flex flex-col justify-center text-center">
        <p className="text-4xl">
          Join{" "}
          <span className="text-secondary-wopee dark:text-primary-wopee">
            top engineering teams
          </span>{" "}
          and start your free trial
        </p>
        <p className="text-sm">
          Empower your team with fast, scalable visual testing. Trusted by
          industry leaders to maintain the visual integrity of their apps.
        </p>
      </div>

      <div className="flex justify-around px-5 mt-5 gap-5">
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
export default PartnerBrands;
