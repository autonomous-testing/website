import React, { useRef, useState, useEffect } from "react";
import { Send, Globe } from "lucide-react";

import { Button } from "@/components/ui/button";

import { AppType } from "./vibe/enums";
import LoginDialog from "./vibe/LoginDialog";
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
  return (
    <div className="relative lg:h-[calc(100vh-120px)] flex flex-col justify-center items-center gap-6 lg:gap-8 overflow-hidden py-6 lg:py-8">
      <div
        className="pointer-events-none select-none absolute inset-0 w-full h-full bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100 dark:from-gray-900 dark:via-purple-900/20 dark:to-indigo-900/20 z-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.15) 100%), radial-gradient(circle at 15% 75%, rgba(112, 48, 160, 0.32) 0%, transparent 55%), radial-gradient(circle at 85% 25%, rgba(236, 72, 153, 0.12) 0%, transparent 55%), linear-gradient(rgba(128,128,128,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(128,128,128,0.08) 1px, transparent 1px)",
          backgroundSize:
            "100% 100%, 100% 100%, 100% 100%, 40px 40px, 40px 40px",
        }}
      />
      <section className="relative z-10 flex flex-col items-center gap-4 md:gap-6">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-gray-900/5 dark:bg-white/5 backdrop-blur border border-gray-900/10 dark:border-white/15 text-gray-700 dark:text-gray-200">
          <span className="w-1.5 h-1.5 rounded-full bg-primary-wopee animate-pulse" />
          AI Testing Agents
        </span>
        <h1
          className="font-bold text-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-pretty leading-[1] tracking-tighter"
          style={{ textShadow: "0 4px 30px rgba(0,0,0,0.25)" }}
        >
          Your app, tested.
          <br />
          <span
            className="text-amber-500 dark:text-primary-wopee"
            style={{
              textShadow:
                "0 0 40px rgba(255,204,0,0.4), 0 4px 30px rgba(0,0,0,0.15)",
            }}
          >
            Autonomously.
          </span>
        </h1>
        <h2 className="max-w-2xl text-center text-base sm:text-lg md:text-xl font-normal text-pretty text-gray-700 dark:text-gray-200 leading-relaxed px-4">
          Wopee.io finds bugs before your users do. No test scripts, no
          maintenance, no QA backlog. Just deploy and sleep well.
        </h2>
      </section>

      <div className="p-[1.5px] rounded-2xl w-full max-w-3xl bg-gradient-to-br from-secondary-wopee via-purple-500 to-primary-wopee z-10 shadow-2xl shadow-purple-900/50">
        <div className="bg-white dark:bg-gray-900 rounded-[14px] p-5 sm:p-6 flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] uppercase tracking-[0.15em] text-gray-500 dark:text-gray-400 font-semibold pl-1">
              Test environment URL
            </label>
            <div className="group relative flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50/80 dark:bg-gray-800/60 focus-within:border-secondary-wopee dark:focus-within:border-primary-wopee focus-within:ring-2 focus-within:ring-secondary-wopee/20 dark:focus-within:ring-primary-wopee/20 transition-all">
              <Globe className="w-4 h-4 text-gray-400 dark:text-gray-500 group-focus-within:text-secondary-wopee dark:group-focus-within:text-primary-wopee transition-colors flex-shrink-0" />
              <input
                ref={urlInputRef}
                type="url"
                value={appUrl}
                placeholder="https://your-project-url.com"
                className="flex-1 w-full bg-transparent border-none focus:outline-none text-sm font-mono text-gray-900 dark:text-gray-100 placeholder:text-gray-400"
                onChange={handleUrlChange}
              />
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
            <Button
              size="lg"
              variant="wopeeFlat"
              disabled={
                testingInstructions.length === 0 || !URL_REGEX.test(appUrl)
              }
              onClick={() =>
                setLoginDialogState({ isOpen: true, mode: "vibe" })
              }
              className="flex items-center gap-2 px-5 py-2 font-bold rounded-lg shadow-lg shadow-purple-500/30 dark:shadow-yellow-500/30 hover:shadow-purple-500/50 dark:hover:shadow-yellow-500/50 hover:scale-105 transition-all"
              id="vibe-testing"
            >
              <Send />
              <span
                className="text-white dark:text-black font-bold hidden sm:block"
              >
                Test now!
              </span>
            </Button>
          </div>
        </div>
      </div>

      <div className="relative z-10 flex flex-col items-center gap-3">
        <span className="text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 font-medium">
          Or pick a sample scenario
        </span>
        <ApplicationTypeSwitch
          appType={appType}
          handleAppTypeChange={handleAppTypeChange}
        />
      </div>

      <p className="relative z-10 mx-auto text-center text-xs text-gray-600 dark:text-gray-400 px-6 whitespace-nowrap">
        No code, one-minute setup, continuous regression coverage that scales with your release pace.
      </p>

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
