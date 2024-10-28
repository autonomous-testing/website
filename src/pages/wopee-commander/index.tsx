import { useWindowSize } from "usehooks-ts";
import React, { useEffect, useRef, useState } from "react";

import Layout from "@theme/Layout";
import Link from "@docusaurus/Link";
import Modal from "@site/src/components/dialog/Modal";
import HomeConversionForm from "@site/src/components/legacy/home-page/HomeConversionForm";

const WopeeCommanderPage = () => {
  const [open, setOpen] = useState(false);
  const [chosenImageSrc, setChosenImageSrc] = useState(null);

  const carouselRef = useRef<HTMLDivElement>(null);
  const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const onScroll = (direction: string) => {
    const carousel = carouselRef.current;
    if (carousel) {
      if (scrollIntervalRef.current !== null) {
        clearInterval(scrollIntervalRef.current);
        scrollIntervalRef.current = null;
      }

      const scrollAmount = direction === "left" ? -600 : 600;
      carousel.scrollBy({ left: scrollAmount, behavior: "smooth" });

      const isEnd =
        direction === "right" &&
        carousel.scrollLeft + carousel.clientWidth === carousel.scrollWidth;
      const isBeginning = direction === "left" && carousel.scrollLeft === 0;

      if (isEnd) {
        carousel.scrollTo({ left: 0, behavior: "smooth" });
      } else if (isBeginning) {
        carousel.scrollTo({ left: carousel.scrollWidth, behavior: "smooth" });
      }

      scrollIntervalRef.current = setInterval(autoScroll, 3000);
    }
  };

  const autoScroll = () => {
    onScroll("right");
  };

  useEffect(() => {
    scrollIntervalRef.current = setInterval(autoScroll, 3000);

    return () => {
      if (scrollIntervalRef.current !== null) {
        clearInterval(scrollIntervalRef.current);
        scrollIntervalRef.current = null;
      }
    };
  }, []);

  const { width } = useWindowSize();

  return (
    <Layout>
      <main className="mt-8 mb-16 container">
        <h2 className="text-xl text-center md:text-center md:text-2xl xl:text-5xl font-bold text-secondary-wopee dark:text-primary-wopee">
          Wopee Commander
        </h2>
        <div className="flex flex-col gap-10 items-center my-10">
          <div className="flex flex-col gap-5 xl:text-xl">
            <p className="text-left px-0 xl:px-12">
              The Wopee commander is a central point of our autonomous testing
              platform. Here you can set up your projects; manage access for
              your colleagues; conduct bot training; plan, manage, and monitor
              test execution; maintain visual testing baselines, and many other
              activities.
            </p>
            <p className="px-0 xl:px-12">
              From Wopee Commander we control two key components:{" "}
              <Link to="/bot">Wopee Bot </Link>
              and <Link to="/visual-testing">Wopee.io Integrations</Link>.
            </p>
          </div>

          <div className="flex w-full">
            <button
              onClick={() => {
                onScroll("left");
              }}
              className="flex items-center justify-center p-2 rounded-full border-none my-auto hover:cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 19.5L8.25 12l7.5-7.5"
                />
              </svg>
            </button>

            <div
              ref={carouselRef}
              className="flex mx-2 gap-x-5 overflow-x-hidden snap-x scroll-smooth rounded-md"
            >
              <div className="snap-start rounded-xl">
                <div className="w-[30rem] xl:w-[40rem]">
                  <img
                    className="object-cover object-center rounded-md shadow shadow-secondary hover:cursor-pointer"
                    src="/img/cmd/dashboard.JPG"
                    alt="Wopee Commander"
                    onClick={() => {
                      if (width < 640) return;
                      setOpen(true);
                      setChosenImageSrc("/img/cmd/dashboard.JPG");
                    }}
                  />
                </div>
              </div>

              <div className="snap-start rounded-xl">
                <div className="w-[30rem] xl:w-[40rem]">
                  <img
                    className="object-cover object-center rounded-md shadow shadow-secondary hover:cursor-pointer"
                    src="/img/cmd/projects.JPG"
                    alt="Wopee Commander"
                    onClick={() => {
                      if (width < 640) return;
                      setOpen(true);
                      setChosenImageSrc("/img/cmd/projects.JPG");
                    }}
                  />
                </div>
              </div>

              <div className="snap-start rounded-xl">
                <div className="w-[30rem] xl:w-[40rem]">
                  <img
                    className="object-cover object-center rounded-md shadow shadow-secondary hover:cursor-pointer"
                    src="/img/cmd/scenarios.JPG"
                    alt="Wopee Commander"
                    onClick={() => {
                      if (width < 640) return;
                      setOpen(true);
                      setChosenImageSrc("/img/cmd/scenarios.JPG");
                    }}
                  />
                </div>
              </div>

              <div className="snap-start rounded-xl">
                <div className="w-[30rem] xl:w-[40rem]">
                  <img
                    className="object-cover object-center rounded-md shadow shadow-secondary hover:cursor-pointer"
                    src="/img/cmd/vvd.PNG"
                    alt="Wopee Commander"
                    onClick={() => {
                      if (width < 640) return;
                      setOpen(true);
                      setChosenImageSrc("/img/cmd/vvd.PNG");
                    }}
                  />
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                onScroll("right");
              }}
              className="flex items-center justify-center p-2 rounded-full border-none my-auto hover:cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M8.25 4.5l7.5 7.5-7.5 7.5"
                />
              </svg>
            </button>
          </div>
        </div>

        <Modal
          open={open}
          onClose={() => setOpen(false)}
          chosenImageSrc={chosenImageSrc}
        />
      </main>
      <HomeConversionForm className="-mt-20" />
    </Layout>
  );
};
export default WopeeCommanderPage;
