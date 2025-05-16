import React, { useState } from "react";
import ApplicationTypes from "./vibe/ApplicationTypes";
import { DialogDemo } from "./vibe/DialogDemo";

export enum AppType {
  Website = "Website",
  ECommerce = "E-commerce",
  Banking = "Banking",
  YourApplication = "Your application",
}

const HomeHeroVibe = () => {
  const [appUrl, setAppUrl] = useState("https://dronjo.wopee.io");
  const [appType, setAppType] = useState<AppType>(AppType.Website);
  const appUrls = {
    [AppType.Website]: "https://dronjo.wopee.io",
    [AppType.ECommerce]: "https://www.saucedemo.com",
    [AppType.Banking]: "https://moja.tatrabanka.sk/html-tb/en/demo",
    [AppType.YourApplication]: "",
  };
  const handleAppTypeChange = (type: AppType) => {
    setAppType(type);
    setAppUrl(appUrls[type]);
  };
  return (
    <div className="min-h-[50vh] flex flex-col justify-center items-center gap-10 mx-5">
      <section>
        <h1 className="font-bold text-center text-5xl sm:text-5xl md:text-6xl text-pretty">
          Which web app do you want to test?
        </h1>
        <h6 className="text-secondary-wopee dark:text-primary-wopee text-center text-md sm:text-lg md:text-xl text-pretty">
          Start from scratch or upload existing documents, get automated tests,
          execute regularly. (Fix found bugs). Sleep well.
        </h6>
      </section>

      <div className="border-2 border-solid border-secondary-wopee dark:border-primary-wopee rounded-md p-3 w-full max-w-6xl flex flex-col gap-3">
        <p className="opacity-65">
          Test environment URL:{" "}
          <span className="ml-1 px-2 py-1 bg-gray-300 dark:bg-gray-700 rounded-md">
            {appUrl}
          </span>
        </p>

        <textarea
          rows={5}
          className="w-full bg-transparent border-none focus:outline-none resize-none"
          placeholder="https://your-project-url.com"
        />

        <div className="flex justify-end gap-2">
          <p>Playwright</p>
          <button>📩</button>
        </div>
      </div>

      <ApplicationTypes
        appType={appType}
        handleAppTypeChange={handleAppTypeChange}
      />

      <DialogDemo />
    </div>
  );
};
export default HomeHeroVibe;
