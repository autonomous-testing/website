import React, { useRef, useState, useEffect } from "react";
import { Send } from "lucide-react";

import { Button } from "@/components/ui/button";

import { AppType } from "./vibe/enums";
import LockTooltip from "./vibe/LockTooltip";
import LoginDialog from "./vibe/LoginDialog";
import FrameworkDropdown from "./vibe/FrameworkDropdown";
import ApplicationTypeSwitch from "./vibe/ApplicationTypeSwitch";

const appTemplates = {
  [AppType.WEBSITE]: {
    url: "https://dronjo.wopee.io",
    instructions: `Test login procedure.
Navigate to the login page (click on the Sign in button).
Sign in with any @tesena.com email and any password.
Verify you reach the home page and see the Logout button (top right).`,
  },
  [AppType.E_COMMERCE]: {
    url: "https://www.saucedemo.com",
    instructions: `Test purchase procedure.
Login with: standard_user / secret_sauce and verify redirect to product listing.
Add an item to cart, complete the purchase, and verify 'Thank you for your order!' message displayed.`,
  },
  [AppType.BANKING]: {
    url: "https://moja.tatrabanka.sk/html-tb/en/demo",
    instructions: `Test login procedure.
Wait for page load, accept cookies (if shown), submit form with pre-filled PIN.`,
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
    <div className="mt-5 lg:mt-10 mx-5 lg:h-[calc(100vh-120px)] flex flex-col justify-center items-center gap-5 lg:gap-10">
      <section>
        <h1 className="font-bold text-center text-4xl sm:text-5xl md:text-6xl text-pretty">
          Test better. Ship faster.
        </h1>
        <h6 className="text-secondary-wopee dark:text-primary-wopee text-center text-md sm:text-lg md:text-xl text-pretty">
          Map your app. Create tests. Automate instantly.
        </h6>
      </section>

      <div className="p-0.5 rounded-md w-full max-w-3xl bg-gradient-to-br from-blue-500 to-secondary-wopee">
        <div className="bg-white dark:bg-gray-900 rounded-md p-3 flex flex-col gap-3">
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
              size="lg"
              variant="wopeeFlat"
              disabled={testingInstructions.length === 0}
              onClick={() => setLoginDialogIsOpen(true)}
              className="flex items-center gap-1 px-3 font-bold rounded-md shadow-md transition-colors"
            >
              <Send />
              <span
                className="bg-gradient-to-r from-white to-blue-300  
                      dark:from-black dark:to-blue-500 
                      bg-clip-text text-transparent font-bold
                      hidden lg:block"
              >
                Test now!
              </span>
            </Button>
          </div>
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
