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
    <div className="max-w-[328px] flex flex-col rounded-lg drop-shadow-lg">
      <img
        className="rounded-t-lg object-cover h-[328px]"
        src={img}
        alt=""
      />

      <div className="p-5 card rounded-t-none">
        <h3 className="text-left text-lg md:text-xl xl:text-2xl font-bold text-secondary-wopee dark:text-primary-wopee">
          {name}
        </h3>

        <p className="mb-3 text-left">{description}</p>
        <a
          href={linkedIn}
          className="max-w-fit inline-flex gap-1 items-center text-sm font-medium text-center  rounded-lg focus:ring-4 focus:outline-none focus:ring-blue-300  dark:focus:ring-blue-800"
        >
          LinkedIn
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1em"
            height="1em"
            viewBox="0 0 256 256"
          >
            <path
              fill="#0A66C2"
              d="M218.123 218.127h-37.931v-59.403c0-14.165-.253-32.4-19.728-32.4c-19.756 0-22.779 15.434-22.779 31.369v60.43h-37.93V95.967h36.413v16.694h.51a39.907 39.907 0 0 1 35.928-19.733c38.445 0 45.533 25.288 45.533 58.186l-.016 67.013ZM56.955 79.27c-12.157.002-22.014-9.852-22.016-22.009c-.002-12.157 9.851-22.014 22.008-22.016c12.157-.003 22.014 9.851 22.016 22.008A22.013 22.013 0 0 1 56.955 79.27m18.966 138.858H37.95V95.967h37.97v122.16ZM237.033.018H18.89C8.58-.098.125 8.161-.001 18.471v219.053c.122 10.315 8.576 18.582 18.89 18.474h218.144c10.336.128 18.823-8.139 18.966-18.474V18.454c-.147-10.33-8.635-18.588-18.966-18.453"
            ></path>
          </svg>
        </a>
      </div>
    </div>
  );
}

export default function HomepageTeam(): JSX.Element {
  return (
    <section id="team">
      <div className="container text--center">
        <h2 className="text-xl text-center md:text-center md:text-2xl xl:text-3xl font-bold text-secondary-wopee dark:text-primary-wopee">
          Wopees
        </h2>
        <div className="flex flex-col items-center justify-center sm:flex-row gap-y-10 sm:flex-wrap gap-x-5">
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
