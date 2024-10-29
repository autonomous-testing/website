import React from "react";

import Layout from "@theme/Layout";
import Team from "@site/src/components/team/Team";
import PartnersCarouselCard from "@site/src/components/demo/PartnersCarouselCard";

const INVESTORS = [
  {
    name: "Tesena",
    logo: "/img/investors/tesena-logo.png",
    classes: "dark:brightness-[1.2]",
  },
  {
    name: "Nation1",
    logo: "/img/investors/nation1-logo.png",
    classes: "dark:invert",
  },
  {
    name: "StartupYard",
    logo: "/img/investors/startup-yard-logo.png",
    classes: "dark:brightness-[1.8]",
  },
];

const TeamPage = () => {
  return (
    <Layout title="About Us">
      <main className="container">
        <Team />
        <div className="mb-5">
          <h2 className="text-center text-4xl opacity-90 text-secondary-wopee dark:text-primary-wopee">
            Our Investors
          </h2>
          <span className="text-justify flex flex-col gap-5 mt-5 max-w-3xl items-center mx-auto">
            <p>
              Wopee Labs s.r.o. is currently powered by investments from three
              key partners, each bringing not only financial backing but also
              invaluable strategic and industry-specific support.
            </p>
            <p>
              Our first partner,{" "}
              <span className="font-bold text-secondary-wopee dark:text-primary-wopee">
                Tesena s.r.o.
              </span>
              , is a recognized leader in software testing services, offering
              professional consulting, training, and education in this domain.
              Their investment goes beyond funding, granting us access to their
              vast experience, deep industry knowledge, and critical
              opportunities to implement and refine our solutions in real-world
              scenarios.
            </p>
            <p>
              Our second investor,{" "}
              <span className="font-bold text-secondary-wopee dark:text-primary-wopee">
                Nation 1
              </span>
              , specializes in early-stage investments in promising startups.
              Their endorsement provides not only financial resources but also
              comprehensive strategic guidance that supports our growth. Nation
              1 plays a vital role in helping us prepare for future investment
              rounds, positioning us for a successful transition from being a
              leading player in Europe to expanding on the global stage.
            </p>
            <p>
              Our latest partner,{" "}
              <span className="font-bold text-secondary-wopee dark:text-primary-wopee">
                StartupYard
              </span>
              , is Central Europe’s top seed accelerator for technology
              startups, based in Prague. Since 2011, they have accelerated over
              115 startups from more than 25 countries, helping them secure over
              €105 million in funding and achieve significant growth. By
              partnering with StartupYard, we benefit from their extensive
              network, mentorship, and a wealth of experience in scaling
              tech-driven businesses. Their portfolio includes notable successes
              such as Rossum.ai, BrandEmbassy, and NeuronSoundware, showcasing
              their deep expertise in nurturing high-potential startups.
            </p>
            <p>
              With the combined support of these investors, we are
              well-positioned to continue our rapid growth, innovate within the
              autonomous software testing market, and enhance our global
              competitiveness.
            </p>
          </span>
          <div className="flex justify-center gap-10 mt-5">
            {INVESTORS.map((investor) => (
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
