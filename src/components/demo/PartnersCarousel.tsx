import React from "react";

import Link from "@docusaurus/Link";

const PartnersCarousel = () => {
  return (
    <div className="mb-5">
      <h3 className="text-center opacity-70">Trusted by our partners</h3>
      <div className="flex justify-center gap-5 mt-10">
        <Link to="https://www.livesport.eu/en">
          <img
            src="/img/customers/livesport-logo.png"
            alt="livesport logo"
            className="grayscale dark:invert"
          />
        </Link>
        <Link to="https://www.multitude.com/">
          <img
            src="/img/customers/multitude-logo.png"
            alt="multitude logo"
            className="grayscale dark:invert"
          />
        </Link>
      </div>
    </div>
  );
};
export default PartnersCarousel;
