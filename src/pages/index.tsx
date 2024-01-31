import clsx from "clsx";
import React from "react";

import Layout from "@theme/Layout";
import HomeAbout from "@site/src/components/HomeAbout";
import HomeCustomers from "@site/src/components/HomeCustomers";
import HomeSolutions from "@site/src/components/HomeSolutions";
import HomeHowItWorks from "@site/src/components/HomeHowItWorks";
import HomeConversionForm from "../components/HomeConversionForm";

import styles from "./index.module.css";
import HomeComparison from "../components/HomeComparison";
import ButtonPrimary from "../components/buttons/ButtonPrimary";

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
            The autonomous visual testing tool
          </h1>

          <p className="hero__subtitle">
            Testing doesn't have to be difficult or expensive, it can be simple
            and autonomous.
          </p>
          <div className="max-w-fit self-center">
            <ButtonPrimary
              label="Try free for 1 month"
              href="https://cmd.wopee.io"
              className="w-60 h-[50px]"
            />
          </div>
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
