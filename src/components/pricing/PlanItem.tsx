import React from "react";

type PlanItem = {
  title: string;
  img: string;
  price: string;
  features: string[];
  featured: boolean;
};

export const PlanItems: PlanItem[] = [
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

export default function PlanItem({
  title,
  img,
  price,
  features,
  featured,
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
    </div>
  );
}
