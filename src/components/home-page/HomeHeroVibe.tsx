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
    url: "",
    instructions: "Your testing instructions..",
  },
};
const urlList = Object.entries(appTemplates).map(([key, value]) => ({
  url: value.url,
  type: key as AppType,
}));
const defaultTemplate = AppType.E_COMMERCE;
const URL_REGEX =
  /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;

const HomeHeroVibe = () => {
  const [appUrl, setAppUrl] = useState(appTemplates[defaultTemplate].url);
  const [appType, setAppType] = useState<AppType>(defaultTemplate);
  const [testingInstructions, setTestingInstructions] = useState(
    appTemplates[defaultTemplate].instructions
  );
  const [loginDialogState, setLoginDialogState] = useState<{
    isOpen: boolean;
    mode: "vibe" | "upgrade";
  }>({
    isOpen: false,
    mode: "vibe",
  });
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
  const setIsOpenVibe = (isOpen: boolean) => {
    setLoginDialogState({ isOpen, mode: "vibe" });
  };
  const setIsOpenUpgrade = (isOpen: boolean) => {
    setLoginDialogState({ isOpen, mode: "upgrade" });
  };
  return (
    <div className="relative lg:h-[calc(100vh-120px)] flex flex-col justify-center items-center gap-5 lg:gap-10 overflow-hidden">
      <div
        className="pointer-events-none select-none absolute inset-0 w-full h-full bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100 dark:from-gray-900 dark:via-purple-900/20 dark:to-indigo-900/20 z-0"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%)",
        }}
      />
      <section className="relative z-10">
        <h1 className="font-bold text-center text-4xl sm:text-5xl md:text-6xl text-pretty">
          Test better. Ship faster.
        </h1>
        <h6 className="text-secondary-wopee dark:text-primary-wopee text-center text-md sm:text-lg md:text-xl text-pretty">
          Map your app. Create tests. Automate instantly.
        </h6>
      </section>

      <div className="p-0.5 rounded-md w-full max-w-3xl bg-gradient-to-br from-blue-500 to-secondary-wopee z-10">
        <div className="bg-white dark:bg-gray-900 rounded-md p-3 flex flex-col gap-3">
          <div className="opacity-65 flex flex-col md:flex-row items-center text-xs">
            Test environment URL:{" "}
            <div className="relative">
              <input
                ref={urlInputRef}
                type="url"
                value={appUrl}
                size={parseSize}
                placeholder="https://your-project-url.com"
                className="border-none ml-1 pl-2 pr-5 py-1 bg-gray-300 dark:bg-gray-700 rounded-md max-w-[300px] sm:max-w-none"
                onChange={handleUrlChange}
              />
              {appType === AppType.YOUR_APPLICATION && (
                <LockTooltip setIsOpenUpgrade={setIsOpenUpgrade} />
              )}
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
              disabled={
                testingInstructions.length === 0 || !URL_REGEX.test(appUrl)
              }
              onClick={() =>
                setLoginDialogState({ isOpen: true, mode: "vibe" })
              }
              className="flex items-center gap-1 px-3 font-bold rounded-md shadow-md transition-colors"
              id="vibe-testing"
            >
              <Send />
              <span
                className="bg-gradient-to-r text-white  
                      dark:text-black
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
        setIsOpenUpgrade={setIsOpenUpgrade}
        handleAppTypeChange={handleAppTypeChange}
      />

      <LoginDialog
        appUrl={appUrl}
        appType={appType}
        prompt={testingInstructions}
        mode={loginDialogState.mode}
        setIsOpenVibe={setIsOpenVibe}
        isOpen={loginDialogState.isOpen}
      />
    </div>
  );
};
export default HomeHeroVibe;
