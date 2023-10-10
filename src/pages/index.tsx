import clsx from "clsx";
import React from "react";

import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import HomeTeam from "@site/src/components/HomeTeam";
import HomeAbout from "@site/src/components/HomeAbout";
import HomePricing from "@site/src/components/HomePricing";
import HomeCustomers from "@site/src/components/HomeCustomers";
import HomeSolutions from "@site/src/components/HomeSolutions";
import HomeHowItWorks from "@site/src/components/HomeHowItWorks";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

import styles from "./index.module.css";

function HomeHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <div className="row align-items-center gap-y-10">
          <div className={clsx("col col--6 hero-left-block flex gap-y-2")}>
            <h1 className="hero__title">{siteConfig.title}</h1>

            <p className="hero__subtitle">{siteConfig.tagline}</p>
            <div className={styles.buttons}>
              <Link
                id="hero-button"
                className="button button--primary hero--button button--lg"
                to="/book-demo"
              >
                Book demo
              </Link>
            </div>
          </div>

          <div className={clsx("col col--6 flex justify-center")}>
            <img
              src="/img/wopee_head_1_2023-10-10.png"
              alt="Wopee"
              className="img-fluid"
              width="50%"
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Autonomous testing platform for web applications | Wopee.io"
    >
      <HomeHeader />
      <main>
        <HomeAbout />
        <HomeSolutions />
        <HomeHowItWorks />
        <HomeCustomers />
        <HomePricing />
        <HomeTeam />
      </main>
    </Layout>
  );
}
