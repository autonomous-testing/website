import clsx from "clsx";
import React from "react";

import Ribbon from "./Ribbon";
import Link from "@docusaurus/Link";
import ButtonGradientOutline from "../buttons/ButtonGradientOutline";

type PlanItem = {
  img: string;
  icon?: string;
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
    features: ["10.000 test steps / month"],
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
    features: ["100.000 test steps / month"],
    featured: true,
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
      "unlimited test steps ",
      "on-premise bots",
    ],
    featured: false,
    button: (
      <Link to="/contact-us">
        <ButtonGradientOutline className="w-60" label="Contact us" />
      </Link>
    ),
  },
];

export default function PlanItem({
  img,
  icon,
  title,
  price,
  button,
  features,
  featured,
}: PlanItem) {
  return (
    <div
      className={clsx(
        "card flex flex-col items-center h-[560px] w-[335px] justify-center gap-5 p-5 shadow-xl",
        featured ? "relative overflow-hidden xl:scale-105" : ""
      )}
    >
      {featured && <Ribbon />}
      {img ? (
        <img
          src={img}
          alt="Image alt text"
          title="Logo Title Text 1"
          className="object-cover"
        />
      ) : (
        <figure className="text-9xl flex items-center m-0 h-[163px]">
          {icon}
        </figure>
      )}

      <div className="">
        <h3 className="text-lg md:text-xl xl:text-2xl font-bold text-secondary-wopee dark:text-primary-wopee">
          {title}
        </h3>
        <h4 className="text-md xl:text-xl font-bold">
          {price}
          <br />
          {title === "Ultimate" || title === "Enterprise" ? (
            ""
          ) : (
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
