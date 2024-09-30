export type TeamMember = {
  img: string;
  name: string;
  linkedIn: string;
  description: string;
};

export const TeamMemberList: TeamMember[] = [
  {
    name: "Jan (Honza) Beránek",
    img: require("@site/static/img/team/honza.jpg").default,
    description: "Experienced web developer, technical team leader",
    linkedIn: "https://www.linkedin.com/in/honzaberanku/",
  },
  {
    name: "Marcel (Vem) Veselka",
    img: require("@site/static/img/team/marcel.jpg").default,
    description: "20 years in software testing, senior test consultant",
    linkedIn: "https://www.linkedin.com/in/marcelveselka/",
  },
  {
    name: "Ondřej (Ondra) Winter",
    img: require("@site/static/img/team/ondra.jpg").default,
    description: "Experienced test automation engineer, Ph.D. student",
    linkedIn: "https://www.linkedin.com/in/ondrej-winter/",
  },
  {
    name: "Šota Giorgadze",
    img: require("@site/static/img/team/shota.jpg").default,
    description:
      "World's fastest growing (self proclaimed title) full-stack developer",
    linkedIn: "https://www.linkedin.com/in/sota-giorgadze/",
  },
];
