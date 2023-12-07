import React, { useState } from "react";
import { useWindowSize } from "usehooks-ts";

import Layout from "@theme/Layout";
import Modal from "@site/src/components/dialog/Modal";
import HomeConversionForm from "@site/src/components/HomeConversionForm";

const WopeeBotPage = () => {
  const [open, setOpen] = useState(false);
  const [chosenImageSrc, setChosenImageSrc] = useState(null);

  const { width } = useWindowSize();

  return (
    <Layout>
      <main className="mt-8 mb-16 container">
        <h2 className="text-xl text-center md:text-center md:text-2xl xl:text-5xl font-bold text-secondary-wopee dark:text-primary-wopee">
          Autonomous Testing Bot
        </h2>

        <div className="text-justify flex flex-col gap-20 my-10 mx-auto">
          <div className="flex flex-col-reverse gap-10 xl:flex-row xl:gap-0 items-center">
            <div className="flex flex-1 flex-col gap-5 xl:text-xl">
              <p className="text-left px-0 xl:px-12">
                Our Autonomous Testing Bot revolutionizes the testing process
                for your application.
              </p>
              <p className="px-0 xl:px-12">
                Wopee Bot conducts a comprehensive scan of your application,
                gathering vital information about potential interactions and
                capturing screenshots. This information is then used to
                automatically generate tests, serving as assertions for your
                application. The generated tests can be prioritized, allowing
                for seamless regression testing.
              </p>
            </div>

            <figure className="flex-1 flex flex-col items-center justify-center">
              <img
                onClick={() => {
                  if (width < 640) return;
                  setOpen(true);
                  setChosenImageSrc("/img/cmd/dashboard.JPG");
                }}
                className="rounded-lg object-contain h-auto w-full xl:w-auto xl:h-80 shadow-2xl sm:hover:cursor-pointer"
                src="/img/cmd/dashboard.JPG"
                alt="dashboard"
              />
              <figcaption className="text-center italic">
                Project summary
              </figcaption>
            </figure>
          </div>

          <div className="flex flex-col gap-10 xl:flex-row xl:gap-0 items-center">
            <figure className="flex-1 flex flex-col items-center justify-center">
              <img
                onClick={() => {
                  if (width < 640) return;
                  setOpen(true);
                  setChosenImageSrc("/img/cmd/scenarios.JPG");
                }}
                className="rounded-lg object-contain h-auto w-full xl:w-auto xl:h-80 shadow-2xl sm:hover:cursor-pointer"
                src="/img/cmd/scenarios.JPG"
                alt="scenarios"
              />
              <figcaption className="text-center italic">
                Testing Scenarios
              </figcaption>
            </figure>
            <div className="flex flex-1 flex-col gap-5 xl:text-xl">
              <p className="px-0 xl:px-12">
                Unlike traditional testing methods, there's no need for manual
                test case preparation or coding. The entire testing process is
                automated, making it a hassle-free experience for you. Learning
                programming languages or utilizing record-and-play tools is
                unnecessary.
              </p>
              <p className="px-0 xl:px-12">
                Maintenance is also simplified. When your application undergoes
                changes, you receive a report highlighting the modifications
                that need assessment. For bug reporting, we follow standard
                procedures. For new application versions, a simple one-click
                updates the application testing model.
              </p>
            </div>
          </div>

          <div className="flex flex-col-reverse gap-10 xl:flex-row xl:gap-0 items-center">
            <div className="flex-1 xl:text-xl flex flex-col gap-5">
              <p className="px-0 xl:px-12">
                The validation process for the application under test relies
                heavily on visual examination. In addition to the visual
                inspection, we meticulously gather data on various aspects such
                as HTTP status codes, JavaScript errors, and the speed at which
                the application loads. These comprehensive quality metrics serve
                as crucial indicators, allowing us to identify and address
                potential issues with the application under test.
              </p>
              <div className="px-0 xl:px-12">
                <h4 className="text-xl text-secondary-wopee dark:text-primary-wopee">
                  Benefits:
                </h4>
                <ul className="text-left">
                  <li>
                    Hassle-free automation without manual test case preparation.
                  </li>
                  <li>
                    No need for programming skills or record-and-play tools.
                  </li>
                  <li>Seamless regression testing with prioritized tests.</li>
                  <li>
                    Simplified maintenance with automatic reporting of
                    application changes.
                  </li>
                </ul>
              </div>
            </div>
            <figure className="flex-1 flex flex-col items-center justify-center">
              <img
                onClick={() => {
                  if (width < 640) return;
                  setOpen(true);
                  setChosenImageSrc("/img/cmd/vvd.PNG");
                }}
                className="rounded-lg object-contain h-auto w-full xl:w-auto xl:h-80 shadow-2xl sm:hover:cursor-pointer"
                src="/img/cmd/vvd.PNG"
                alt="vvdPopUp"
              />
              <figcaption className="text-center italic">
                Visual validation
              </figcaption>
            </figure>
          </div>
        </div>

        <div className="text-justify flex flex-col gap-4 mt-10">
          <h3 className="xl:text-4xl text-center text-secondary-wopee dark:text-primary-wopee">
            Frequently Asked Questions
          </h3>
          <div className="my-2 flex flex-col text-center gap-5">
            <div>
              <h4 className="text-lg font-semibold opacity-90">
                Is Wopee just another automation tool?
              </h4>
              <p>
                No, Wopee goes beyond traditional test automation by introducing
                innovative ideas that eliminate the need for programming skills
                and slow record-and-play methods.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold opacity-90">
                How does Wopee Bot handle login form?
              </h4>
              <p>
                Wopee Bot easily handles simple login processes by allowing
                users to input login names and passwords during project setup.
              </p>
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
                What browsers does Wopee support?
              </h4>
              <p>
                Wopee supports all modern rendering engines, including Chromium,
                WebKit, and Firefox, on various platforms, including Windows,
                Linux, and macOS. Mobile web testing is also supported.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold opacity-90">
                Does Wopee provide mobile testing?
              </h4>
              <p>
                While native app testing is not available, Wopee is ready for
                mobile web browser testing, supporting the emulation of Google
                Chrome for Android and Mobile Safari.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold opacity-90">
                Can I get detailed information and videos from the test
                execution?
              </h4>
              <p>
                Certainly! Wopee can record videos of the entire test execution
                and store traces for comprehensive analysis and review.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold opacity-90">
                How complicated is it to implement Wopee?
              </h4>
              <p>
                Implementation is straightforward with no requirement for manual
                test case preparation or coding. To start you need just the URL
                of your app. Updates and adaptations to application changes are
                simplified with a click.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold opacity-90">
                How complicated is it to use Wopee?
              </h4>
              <p>
                User-friendly interface with no need for programming languages
                or record-and-play tools. Maintenance and updates are intuitive,
                ensuring a seamless user experience.
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
export default WopeeBotPage;
