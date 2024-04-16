import React, { useState } from "react";
import { useWindowSize } from "usehooks-ts";

import Layout from "@theme/Layout";
import Modal from "@site/src/components/dialog/Modal";
import HomeConversionForm from "@site/src/components/HomeConversionForm";

const supportedTestingTools = [
  {
    alt: "Cypress",
    src: "/img/assistant/testing-tools/cy-logo.png",
  },
  {
    alt: "Playwright",
    src: "/img/assistant/testing-tools/pw-logo2.png",
  },
  {
    alt: "Robot Framework",
    src: "/img/assistant/testing-tools/rf-logo2.png",
  },
  {
    alt: "Selenium",
    src: "/img/assistant/testing-tools/se-logo.png",
  },
  {
    alt: "webdriver.io",
    src: "/img/assistant/testing-tools/wdio-logo.png",
  },
];

const WopeeIntegrationsPage = () => {
  const [open, setOpen] = useState(false);
  const [chosenImageSrc, setChosenImageSrc] = useState(null);

  const { width } = useWindowSize();

  return (
    <Layout>
      <main className="mt-8 mb-16 container">
        <h2 className="text-xl text-center md:text-center md:text-2xl xl:text-5xl font-bold text-secondary-wopee dark:text-primary-wopee">
          Visual Testing Integrations
        </h2>

        <div className="text-justify flex flex-col gap-5 xl:gap-20 my-10 mx-auto">
          <div className="flex flex-col gap-10 items-center">
            <p className="flex-1 xl:text-xl">
              Elevate your automated testing with our Visual Testing Integrations –
              the ultimate solution for seamless visual testing validation. With
              effortless integration that won't disrupt your current scenarios,
              our tool takes your testing strategy to new heights. Simply
              install our library and add three lines of code to your
              configuration, and you'll have a robust visual testing system up
              and running in no time.
            </p>

            <div className="flex flex-1 flex-col gap-5">
              <h4 className="xl:text-2xl text-secondary-wopee dark:text-primary-wopee">
                Benefits by incorporating our Visual Testing Integrations into your
                workflow:
              </h4>
              <div className="xl:text-xl">
                <ul>
                  <li>
                    <span className="font-bold">Broaden Testing Coverage:</span>{" "}
                    Expand your testing horizons and ensure comprehensive
                    coverage of your applications, catching issues that
                    traditional testing might miss.
                  </li>
                  <li>
                    <span className="font-bold">
                      Simplify Automation for Complexity:
                    </span>{" "}
                    Tackle intricate features with ease. Our Integrations simplifies
                    the automation of even the most complex functionalities,
                    streamlining your testing process.
                  </li>
                  <li>
                    <span className="font-bold">
                      Guard Against Visual Bugs:
                    </span>{" "}
                    Safeguard your production environment by minimizing the risk
                    of visual bugs slipping through undetected. Wopee assistant
                    ensures the visual integrity of your applications.
                  </li>
                  <li>
                    <span className="font-bold">
                      Boost Testing Team Efficiency:
                    </span>{" "}
                    Foster seamless collaboration among your team members. Our
                    Visual Testing Integrations enhances teamwork, making it easier
                    for your testing team to work together efficiently.
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-10 xl:flex-row xl:gap-0 items-center">
            <figure className="flex-1 flex flex-col items-center justify-center">
              <img
                onClick={() => {
                  if (width < 640) return;
                  setOpen(true);
                  setChosenImageSrc("/img/assistant/vvd-assistant.JPG");
                }}
                alt="scenarios"
                src="/img/assistant/vvd-assistant.JPG"
                className="rounded-lg object-contain h-auto w-full xl:w-auto xl:h-80 shadow-2xl sm:hover:cursor-pointer"
              />
              <figcaption className="text-center italic">
                Visual validation using assistant
              </figcaption>
            </figure>
            <div className="flex flex-1 flex-col gap-5">
              <figure className="flex-1 flex flex-col items-center justify-center">
                <img
                  onClick={() => {
                    if (width < 640) return;
                    setOpen(true);
                    setChosenImageSrc("/img/assistant/validation.JPG");
                  }}
                  className="rounded-lg object-contain h-auto w-full xl:w-auto xl:h-80 shadow-2xl sm:hover:cursor-pointer"
                  src="/img/assistant/validation.JPG"
                  alt="validation"
                />
                <figcaption className="text-center italic">
                  Assistant dashboard
                </figcaption>
              </figure>
            </div>
          </div>
        </div>

        <div className="text-justify flex flex-col gap-4 mt-16">
          <h3 className="xl:text-4xl text-center text-secondary-wopee dark:text-primary-wopee">
            Frequently Asked Questions
          </h3>
          <div className="my-2 text-center flex flex-col gap-5">
            <div>
              <h4 className="text-lg font-semibold opacity-90">
                Why should I choose Wopee.io Integrations over a DIY approach to build
                my visual testing solution?
              </h4>
              <p>
                The DIY (do-it-yourself) approach is a common choice for testing
                teams initially. However, it often becomes a cumbersome task
                that demands substantial effort and time for maintenance,
                diverting your team's focus from actual testing. DIY solutions
                frequently fall short when it comes to addressing complex
                scenarios such as merging and migrating images between versions
                or branches, maintaining version history, and handling the
                acceleration of tools as the scale increases. In contrast, our
                solution is not only more efficient but also cost-effective. It
                allows your team to concentrate entirely on what truly matters:
                ensuring the quality of your product.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold opacity-90">
                What frameworks does Wopee.io Integrations support?
              </h4>
              <p>
                Wopee.io Integrations seamlessly integrates with the modern web testing
                frameworks for quick and straightforward implementation. Our
                current support includes popular frameworks such as Cypress.io,
                Playwright, Selenium, Robot Framework, Webdriver.io, with
                additional compatibility for more frameworks in the pipeline.
              </p>
              <div className="grid grid-cols-2 sm:flex justify-center gap-2 my-2">
                {supportedTestingTools.map((tool) => (
                  <div
                    key={tool.src}
                    className="border border-solid border-gray-300 dark:border-gray-700 flex justify-center items-center aspect-video sm:w-56 rounded-lg dark:hover:border-primary-wopee hover:border-secondary-wopee dark:bg-zinc-100 dark:bg-opacity-90 px-3 xl:hover:px-1 transition-all last:odd:col-span-2"
                  >
                    <img
                      src={tool.src}
                      alt={tool.alt}
                      className=""
                    />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold opacity-90">
                Can I test applications not visible from the internet?
              </h4>
              <p>
                Yes, for our enterprise customers, we offer on-prem or private
                cloud options, providing flexibility and customization for test
                execution.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold opacity-90">
                How can I exclude specific areas in the image during the
                comparison process?
              </h4>
              <p>Wopee.io Integrations offers two options for excluding areas:</p>
              <p>
                a. Low code: Utilize selectors from your framework to precisely
                specify which areas should be ignored.
              </p>
              <p>
                b. No-code: Leverage our Wopee Commander, equipped with
                intuitive visual tools that enable you to easily select and
                exclude specific areas in the image without the need for coding.
                This provides a user-friendly, code-free alternative for
                efficient visual testing customization.
              </p>
            </div>
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
export default WopeeIntegrationsPage;
