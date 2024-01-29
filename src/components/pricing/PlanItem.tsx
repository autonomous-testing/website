import React from "react";

import Link from "@docusaurus/Link";
import ButtonGradientOutline from "../buttons/ButtonGradientOutline";

type PlanItem = {
  img: string;
  title: string;
  price: string;
  features: string[];
  featured?: boolean;
  button?: JSX.Element;
};

export const PlanItems: PlanItem[] = [
  {
    title: "Basic",
    img: require("@site/static/img/pricing/premium.png").default,
    price: "79 €",
    features: [
      "1 project",
      "3 users",
      "10.000 test steps / month",
      "1 dedicated bot",
      "14 days data retention",
    ],
    featured: false,
    button: (
      <Link to="https://cmd.wopee.io">
        <ButtonGradientOutline className="w-60" />
      </Link>
    ),
  },
  {
    title: "Premium",
    img: require("@site/static/img/pricing/ultimate.png").default,
    price: "179 €",
    features: [
      "3 projects",
      "5 users",
      "100.000 test steps / month",
      "3 dedicated bots",
      "30 days data retention",
    ],
    featured: false,
    button: (
      <Link to="https://cmd.wopee.io">
        <ButtonGradientOutline className="w-60" />
      </Link>
    ),
  },
  {
    title: "Ultimate",
    img: require("@site/static/img/pricing/addons.png").default,
    price: "contact us",
    features: [
      "unlimited projects",
      "unlimited users",
      "unlimited test steps / month ",
      "on-prem bots",
      "priority feature development",
      "30 days data retention",
    ],
    featured: false,
    button: (
      <Link to="/contact-us">
        <ButtonGradientOutline
          className="w-60"
          label="Contact us"
        />
      </Link>
    ),
  },
];

export default function PlanItem({
  title,
  img,
  price,
  features,
  featured,
  button,
}: PlanItem) {
  return (
    <div className="card flex flex-col items-center justify-center gap-5 p-5 drop-shadow-xl sm:hover:scale-105 transition duration-300 overflow-visible">
      <img
        src={img}
        alt="Image alt text"
        title="Logo Title Text 1"
        className="object-cover"
      />
      <div className="">
        <h3 className="text-lg md:text-xl xl:text-2xl font-bold text-secondary-wopee dark:text-primary-wopee">
          {title}
        </h3>
        <h4 className="text-md xl:text-xl font-bold">
          {price}
          <br />
          {title !== "Ultimate" && (
            <small className="font-normal">per user/month</small>
          )}
        </h4>
        <small className="text-md md:text-lg">
          {features.map((feature, idx) => (
            <span key={idx}>
              {" "}
              {feature} <br />
            </span>
          ))}
        </small>
      </div>
      {button}
    </div>
  );
}
