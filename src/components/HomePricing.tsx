import React from "react";

import Link from "@docusaurus/Link";
import ButtonGradientOutline from "./buttons/ButtonGradientOutline";

type PlanItem = {
  title: string;
  img: string;
  price: string;
  features: string[];
  featured: boolean;
};

const PlanItems: PlanItem[] = [
  {
    title: "Free Trial",
    img: require("@site/static/img/pricing/free.png").default,
    price: "0 €",
    features: [
      "1 project",
      "3 users",
      "10.000 test steps total",
      "1 shared bot",
      "7 days data retention",
    ],
    featured: false,
  },
  {
    title: "Premium Plan",
    img: require("@site/static/img/pricing/premium.png").default,
    price: "79 €",
    features: [
      "3 projects",
      "5 users",
      "10.000 test steps / month",
      "1 dedicated bot",
      "14 days data retention",
    ],
    featured: false,
  },
  {
    title: "Ultimate Plan",
    img: require("@site/static/img/pricing/ultimate.png").default,
    price: "179 €",
    features: [
      "unlimited projects",
      "unlimited users",
      "100.000 test steps / month",
      "3 dedicated bots",
      "30 days data retention",
    ],
    featured: false,
  },
  {
    title: "Add-ons",
    img: require("@site/static/img/pricing/addons.png").default,
    price: "contact us",
    features: [
      "More test steps / month",
      "More dedicated bots",
      "Longer data retention period",
      "",
      "On-call support",
    ],
    featured: false,
  },
];

function PlanItem({ title, img, price, features, featured }: PlanItem) {
  return (
    <div className="card flex flex-col items-center justify-center gap-5 p-5 shadow-xl hover:scale-105 transition duration-300">
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
          <small className="font-normal">per user/month</small>
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

      <Link
        className=""
        to="https://cmd.wopee.io"
      >
        <ButtonGradientOutline />
      </Link>
    </div>
  );
}

export default function HomepageTeam(): JSX.Element {
  return (
    <section
      id="pricing"
      className="mt-16 md:mt-20 text-center overflow-visible"
    >
      <h2 className="text-xl text-center md:text-center md:text-2xl xl:text-5xl font-bold text-secondary-wopee dark:text-primary-wopee">
        Pricing
      </h2>

      <div className="flex flex-col sm:flex-wrap items-center sm:flex-row xl:flex-nowrap mt-3 md:mt-5 justify-center gap-5">
        {PlanItems.map((props, idx) => (
          <PlanItem
            key={idx}
            {...props}
          />
        ))}
      </div>
    </section>
  );
}
