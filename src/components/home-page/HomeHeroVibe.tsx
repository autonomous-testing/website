import React, { useRef, useState, useEffect } from "react";
import { SendHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";

import { AppType } from "./vibe/enums";
import LockTooltip from "./vibe/LockTooltip";
import LoginDialog from "./vibe/LoginDialog";
import FrameworkDropdown from "./vibe/FrameworkDropdown";
import ApplicationTypeSwitch from "./vibe/ApplicationTypeSwitch";

const appTemplates = {
  [AppType.WEBSITE]: {
    url: "https://dronjo.wopee.io",
    instructions: `Test that user can login to the app and navigate to the gallery page.
- Navigate to the login page (by clicking on the Sign in button), login with any email with domain @tesena.com and any password.
- Always use email with domain @tesena.com to be able to login to the app. Other domains are not allowed.
- You can use any password to login to the app. Application does not check password correctness.
- After successful login, user should be redirected to the home page with the Logout button visible on the top right corner.
- Navigate to the gallery page by clicking on the Gallery button in the top navigation bar.`,
  },
  [AppType.E_COMMERCE]: {
    url: "https://www.saucedemo.com",
    instructions: `Test login functionality and add an item to the cart.
- You are on the login form, no need to navigate to the login page, just fill in the valid credentials and click on the Login button.
- Always use standard_user as username and secret_sauce as password to login to the app.
- After successful login, user should be redirected to the product listing page.
- Add an item to the cart by clicking 'Add to cart' button.`,
  },
  [AppType.BANKING]: {
    url: "https://moja.tatrabanka.sk/html-tb/en/demo",
    instructions: `Test that user can login to the app.
- Accept cookies (if visible) by clicking on the I agree button
- Login by just submitting the form (PIN is already correctly filled in, as it is the demo account).
- Page is a bit slow for initial load, so start by waiting for the page to load.
- After successful login, user should be redirected to the dashboard page.`,
  },
  [AppType.YOUR_APPLICATION]: {
    url: "https://your-project-url.com",
    instructions: "Your testing instructions..",
  },
};
const urlList = Object.entries(appTemplates).map(([key, value]) => ({
  url: value.url,
  type: key as AppType,
}));
const defaultTemplate = AppType.E_COMMERCE;

const HomeHeroVibe = () => {
  const [appUrl, setAppUrl] = useState(appTemplates[defaultTemplate].url);
  const [appType, setAppType] = useState<AppType>(defaultTemplate);
  const [testingInstructions, setTestingInstructions] = useState(
    appTemplates[defaultTemplate].instructions
  );
  const [loginDialogIsOpen, setLoginDialogIsOpen] = useState(false);
  const urlInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (appType === AppType.YOUR_APPLICATION) {
      urlInputRef.current?.focus();
    }
  }, [appType]);

  const maxSize = 50;
  const minSize = 20;
  const parseSize = Math.max(minSize, Math.min(maxSize, appUrl.length));

  const handleAppTypeChange = (type: AppType) => {
    setAppType(type);
    setAppUrl(appTemplates[type].url);
    setTestingInstructions(appTemplates[type].instructions);
  };
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const found = urlList.find((url) => url.url === e.target.value);
    if (found) {
      setAppType(found.type);
    } else {
      setAppType(AppType.YOUR_APPLICATION);
    }
    setAppUrl(e.target.value);
  };
  return (
    <div className="min-h-[50vh] flex flex-col justify-center items-center gap-5 md:gap-10 mx-5">
      <section>
        <h1 className="font-bold text-center text-4xl sm:text-5xl md:text-6xl text-pretty">
          Which web app do you want to test?
        </h1>
        <h6 className="text-secondary-wopee dark:text-primary-wopee text-center text-md sm:text-lg md:text-xl text-pretty">
          Start from scratch or upload existing documents, get automated tests,
          execute regularly. (Fix found bugs). Sleep well.
        </h6>
      </section>

      <div className="border-2 border-solid border-secondary-wopee dark:border-primary-wopee rounded-md p-3 w-full max-w-6xl flex flex-col gap-3">
        <div className="opacity-65 flex flex-col md:flex-row items-center text-xs">
          Test environment URL:{" "}
          <div className="relative">
            <input
              ref={urlInputRef}
              type="url"
              value={appUrl}
              size={parseSize}
              className="border-none ml-1 pl-2 pr-5 py-1 bg-gray-300 dark:bg-gray-700 rounded-md max-w-[300px] sm:max-w-none"
              onChange={handleUrlChange}
            />
            {appType === AppType.YOUR_APPLICATION && <LockTooltip />}
          </div>
        </div>

        <textarea
          rows={6}
          value={testingInstructions}
          placeholder="Testing instructions"
          className="w-full bg-transparent border-none focus:outline-none resize-none text-sm"
          onChange={(e) => setTestingInstructions(e.target.value)}
        />

        <div className="flex justify-end items-center gap-2">
          <FrameworkDropdown />
          <Button
            size="icon"
            variant="wopeeFlat"
            disabled={testingInstructions.length === 0}
            onClick={() => setLoginDialogIsOpen(true)}
          >
            <SendHorizontal />
          </Button>
        </div>
      </div>

      <ApplicationTypeSwitch
        appType={appType}
        handleAppTypeChange={handleAppTypeChange}
      />

      <LoginDialog
        prompt={testingInstructions}
        isOpen={loginDialogIsOpen}
        setOpen={setLoginDialogIsOpen}
        appType={appType}
        appUrl={appUrl}
      />
    </div>
  );
};
export default HomeHeroVibe;
