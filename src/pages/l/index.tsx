import clsx from "clsx";
import React from "react";

import Layout from "@theme/Layout";
import HomeAbout from "@site/src/components/legacy-home-page/HomeAbout";
import HomeCustomers from "@site/src/components/legacy-home-page/HomeCustomers";
import HomeSolutions from "@site/src/components/legacy-home-page/HomeSolutions";
import HomeHowItWorks from "@site/src/components/legacy-home-page/HomeHowItWorks";
import HomeConversionForm from "@site/src/components/legacy-home-page/HomeConversionForm";

import styles from "./index.module.css";
import HomeComparison from "@site/src/components/legacy-home-page/HomeComparison";
import ButtonPrimary from "@site/src/components/buttons/ButtonPrimary";

function HomeHeader() {
  return (
    <header
      className={clsx(
        "bg-primary-wopee dark:bg-secondary-wopee",
        styles.heroBanner
      )}
    >
      <div className="container flex flex-col lg:flex-row items-center align-items-center gap-y-10">
        <div className="flex flex-col justify-center items-center gap-y-5">
          <h1 className="mb-4 text-4xl leading-none tracking-tight md:text-5xl lg:text-6xl dark:text-primary-wopee text-secondary-wopee">
            » Boost your testing
          </h1>

          <p className="hero__subtitle">
            Repetitive work is for bots. <br />
            Repetitive work is for bots. <br />
            Repetitive work is for bots. <br />
            ... <br />
            Unleash your potential 🚀 and
            <ButtonPrimary
              id="hero-button"
              label="Start free trial"
              href="https://cmd.wopee.io"
              className="w-60 h-[50px] ml-3"
            />
          </p>
        </div>

        <div className={clsx("flex justify-center")}>
          <img
            alt="Wopee"
            className="object-contain w-1/2"
            src="/img/wopee_head_1_2023-10-10.png"
          />
        </div>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  return (
    <Layout>
      <HomeHeader />
      <main className="container">
        <HomeComparison />
        <HomeAbout />
        <HomeSolutions />
        <HomeHowItWorks />
        <HomeCustomers />
      </main>
      <HomeConversionForm />
    </Layout>
  );
}
