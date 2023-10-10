import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import HomepageAbout from "@site/src/components/HomepageAbout";
import HomepageSolution from "@site/src/components/HomepageSolution";
import HomepageHowItWorks from "@site/src/components/HomepageHowItWorks";
import HomepageCustomers from "@site/src/components/HomepageCustomers";
import HomepagePricing from "@site/src/components/HomepagePricing";
import HomepageTeam from "@site/src/components/HomepageTeam";

import styles from "./index.module.css";

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx("hero hero--primary", styles.heroBanner)}>
      <div className="container">
        <div className="row align-items-center">
          <div className={clsx("col col--6")}>
            <h1 className="hero__title">{siteConfig.title}</h1>

            <p className="hero__subtitle">{siteConfig.tagline}</p>
            <div className={styles.buttons}>
              <Link
                className="button button--primary button--lg"
                to="/book-demo"
              >
                Book demo
              </Link>
            </div>
          </div>

          <div className={clsx("col col--6")}>
            <img
              src="/img/hero.png"
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
      <HomepageHeader />
      <main>
        <HomepageAbout />
        <HomepageSolution />
        <HomepageHowItWorks />
        <HomepageCustomers />
        <HomepagePricing />
        <HomepageTeam />
      </main>
    </Layout>
  );
}
