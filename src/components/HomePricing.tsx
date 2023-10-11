import React from "react";

import Link from "@docusaurus/Link";

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
    price: "0",
    features: [
      "1 project",
      "3 users",
      "1.000 test steps",
      "shared testing bots",
      "7 days data retention",
    ],
    featured: false,
  },
  {
    title: "Premium Plan",
    img: require("@site/static/img/pricing/premium.png").default,
    price: "79",
    features: [
      "1 project",
      "3 users",
      "1.000 test steps",
      "shared testing bots",
      "7 days data retention",
    ],
    featured: false,
  },
  {
    title: "Ultimate Plan",
    img: require("@site/static/img/pricing/ultimate.png").default,
    price: "179",
    features: [
      "1 project",
      "3 users",
      "1.000 test steps",
      "shared testing bots",
      "7 days data retention",
    ],
    featured: false,
  },
  {
    title: "Add-ons",
    img: require("@site/static/img/pricing/addons.png").default,
    price: "0",
    features: [
      "1 project",
      "3 users",
      "1.000 test steps",
      "shared testing bots",
      "7 days data retention",
    ],
    featured: false,
  },
];

function PlanItem({ title, img, price, features, featured }: PlanItem) {
  return (
    <div className="col col--3 hover:scale-105 transition duration-300 max-w-xl">
      <div className="card flex flex-col items-center justify-center p-5 shadow-xl">
        <div className="h-full w-full">
          <img
            src={img}
            alt="Image alt text"
            title="Logo Title Text 1"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="card__body">
          <h3 className="text-lg md:text-xl xl:text-2xl font-bold text-secondary-wopee dark:text-primary-wopee">
            {title}
          </h3>
          <h4 className="text-md xl:text-xl font-bold">
            Price: {price} EUR <br />
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
        <div className="card__footer">
          <Link
            className="button button--primary"
            to="https://cmd.wopee.io"
          >
            Start free trial
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function HomepageTeam(): JSX.Element {
  return (
    <section id="pricing">
      <div className="container text-center">
        <h2 className="text-xl text-center md:text-left md:text-2xl xl:text-3xl font-bold text-secondary-wopee dark:text-primary-wopee">
          Pricing
        </h2>

        <div className="row flex justify-center gap-y-10">
          {PlanItems.map((props, idx) => (
            <PlanItem
              key={idx}
              {...props}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
