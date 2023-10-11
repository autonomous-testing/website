import React from "react";

type TeamItem = {
  name: string;
  img: string;
  description: JSX.Element;
  linkedIn: string;
};

const FeatureList: TeamItem[] = [
  {
    name: "Jan (Honza) Beránek",
    img: require("@site/static/img/team/honza.jpg").default,
    description: <>Experienced web developer, technical team leader</>,
    linkedIn: "https://www.linkedin.com/in/honzaberanku/",
  },
  {
    name: "Marcel (Vem) Veselka",
    img: require("@site/static/img/team/marcel.jpg").default,
    description: <>20 years in software testing, senior test consultant</>,
    linkedIn: "https://www.linkedin.com/in/marcelveselka/",
  },
  {
    name: "Olena (Alenka) Nahorna",
    img: require("@site/static/img/team/olena.jpg").default,
    description: <>Motivated quick learner, full-stack developer</>,
    linkedIn: "https://www.linkedin.com/in/olena-nahorna/",
  },
  {
    name: "Ondřej (Ondra) Winter",
    img: require("@site/static/img/team/ondra.jpg").default,
    description: <>Experienced test automation engineer, Ph.D. student </>,
    linkedIn: "https://www.linkedin.com/in/ondrej-winter/",
  },
];

function TeamMember({ name, img, description, linkedIn }: TeamItem) {
  return (
    <div className="flex flex-col justify-center items-center w-1/4 h-full">
      <div className="w-56 h-auto">
        <img
          className="object-contain overflow-hidden rounded-full"
          src={img}
        />
      </div>

      <div className="flex flex-col flex-2 w-full">
        <h3 className="text-lg md:text-xl xl:text-2xl font-bold text-secondary-wopee dark:text-primary-wopee">
          {name}
        </h3>
        <p className="text-md text-center md:text-left md:text-xl xl:text-2xl">
          {description}
        </p>
        <a
          href={linkedIn}
          target="_blank"
          className="text-secondary-wopee dark:text-primary-wopee"
        >
          LinkedIn
        </a>
      </div>
    </div>
  );
}

export default function HomepageTeam(): JSX.Element {
  return (
    <section id="team">
      <div className="container text--center">
        <h2 className="text-xl text-center md:text-left md:text-2xl xl:text-3xl font-bold text-secondary-wopee dark:text-primary-wopee">
          Our team
        </h2>
        <div className="flex flex-col items-center xl:flex-row gap-10 xl:gap-2">
          {FeatureList.map((props, idx) => (
            <TeamMember
              key={idx}
              {...props}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
