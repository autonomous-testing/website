import React from "react";

import Layout from "@theme/Layout";
import Team from "@site/src/components/team/Team";
import PartnersCarouselCard from "@site/src/components/demo/PartnersCarouselCard";

const investors = [
  {
    name: "Tesena",
    logo: "/img/investors/tesena-logo.png",
  },
  {
    name: "Nation1",
    logo: "/img/investors/nation1-logo.png",
    classes: "dark:invert",
  },
];

const TeamPage = () => {
  return (
    <Layout title="About Us">
      <main className="container">
        <Team />
        <div className="mb-5">
          <h3 className="text-center opacity-70">Our Investors</h3>
          <span className="text-justify flex flex-col gap-5 mt-5 max-w-3xl items-center mx-auto">
            <p>
              Wopee Labs s.r.o. is currently fueled by investments from two key
              partners. Our first investment partner is Tesena s.r.o., a
              renowned company specializing in providing professional services
              in the field of software testing, as well as offering training and
              other types of education in this domain. Through collaboration
              with Tesena s.r.o., we not only gain financial support but also
              access to extensive experience, industry know-how, and,
              importantly, exceptional opportunities to apply our solutions.
            </p>
            <p>
              The second investor endorsing our vision is Nation 1, specializing
              in early-stage investments in startups. By partnering with Nation
              1, we acquire not only financial resources but also strategic
              support for further development and assistance in preparing for
              subsequent investment rounds crucial for our expansion from a
              leading European player to a global market presence.
            </p>
            <p>
              With the financial backing from our investors and our ongoing
              activities, we are well-equipped to achieve our goals and foster
              continuous growth. We believe that this combination of financial
              and strategic support will not only strengthen our competitiveness
              but also broaden our possibilities and opportunities in the
              autonomous software testing market.
            </p>
          </span>
          <div className="flex justify-center gap-10 mt-5">
            {investors.map((investor) => (
              <PartnersCarouselCard
                key={investor.name}
                logo={investor.logo}
                classes={investor.classes}
              />
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
};
export default TeamPage;
