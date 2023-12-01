import React from "react";

import Link from "@docusaurus/Link";

interface PartnersCarouselCardProps {
  url?: string;
  logo: string;
  classes?: string;
}

const PartnersCarouselCard = ({
  logo,
  url,
  classes,
}: PartnersCarouselCardProps) => {
  return (
    <>
      <Link to={url}>
        <img
          src={logo}
          alt="company logo"
          className={classes}
        />
      </Link>
    </>
  );
};
export default PartnersCarouselCard;
