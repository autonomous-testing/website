import React from "react";
import Link from "@docusaurus/Link";
import Heading from "@theme/Heading";

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
    <div className="col col--3">
      <div className="card-demo">
        <div className="card">
          <div className="card__image">
            <img src={img} alt="Image alt text" title="Logo Title Text 1" />
          </div>
          <div className="card__body">
            <h3>{title}</h3>
            <h4>
              Price: {price} EUR <br />
              <small>per user/month</small>
            </h4>
            <small>
              {features.map((feature, idx) => (
                <span key={idx}>
                  {" "}
                  {feature} <br />
                </span>
              ))}
            </small>
          </div>
          <div className="card__footer">
            <Link className="button button--primary" to="https://cmd.wopee.io">
              Start free trial
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomepageTeam(): JSX.Element {
  return (
    <section id="pricing">
      <div className="container text--center">
        <Heading as="h2">Pricing</Heading>

        <div className="row">
          {PlanItems.map((props, idx) => (
            <PlanItem key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
