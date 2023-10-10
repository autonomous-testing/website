import React from "react";
import clsx from "clsx";
import styles from "./styles.module.css";
import Heading from "@theme/Heading";

type TeamItem = {
  name: string;
  img: string;
  description: JSX.Element;
  linkedIn: string;
};

const FeatureList: TeamItem[] = [
  {
    name: "Jan Honza Beránek",
    img: require("@site/static/img/team/honza.jpg").default,
    description: <>Experienced web developer, technical team leader</>,
    linkedIn: "https://www.linkedin.com/in/honzaberanku/",
  },
  {
    name: "Marcel (vem) Veselka",
    img: require("@site/static/img/team/marcel.jpg").default,
    description: <>20 years in software testing, senior test consultant</>,
    linkedIn: "https://www.linkedin.com/in/marcelveselka/",
  },
  {
    name: "Olena (alenka) Nahorna",
    img: require("@site/static/img/team/olena.jpg").default,
    description: <>Motivated quick learner, full-stack developer</>,
    linkedIn: "https://www.linkedin.com/in/olena-nahorna/",
  },
  {
    name: "Ondřej (ondra) Winter",
    img: require("@site/static/img/team/ondra.jpg").default,
    description: <>Experienced test automation engineer, Ph.D. student </>,
    linkedIn: "https://www.linkedin.com/in/ondrej-winter/",
  },
];

function TeamMember({ name, img, description, linkedIn }: TeamItem) {
  return (
    <div className="col col--3">
      <div className="avatar avatar--vertical">
        <img className="avatar__photo avatar__photo--xl" src={img} />
        <div className="avatar__intro">
          <div className="avatar__name">{name}</div>
          <span className="avatar__subtitle">{description}</span>
        </div>
        <a href={linkedIn}>LinkedIn</a>
      </div>
    </div>
  );
}

export default function HomepageTeam(): JSX.Element {
  return (
    <section id="team">
      <div className="container text--center">
        <Heading as="h2">Our team</Heading>
        <div className="row">
          {FeatureList.map((props, idx) => (
            <TeamMember key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
