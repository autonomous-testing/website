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
    instructions: "Test a basic login functionality.",
  },
  [AppType.E_COMMERCE]: {
    url: "https://www.saucedemo.com",
    instructions: "Test adding an item to the cart.",
  },
  [AppType.BANKING]: {
    url: "https://moja.tatrabanka.sk/html-tb/en/demo",
    instructions: "Test accessing the account balance.",
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
      urlInputRef.current?.select();
    }
  }, [appType]);

  const maxSize = 50;
  const minSize = 20;
  const parseSize = Math.max(minSize, Math.min(maxSize, appUrl.length - 5));

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
        <div className="opacity-65 flex items-center text-xs">
          Test environment URL:{" "}
          <div className="relative">
            <input
              ref={urlInputRef}
              type="url"
              value={appUrl}
              size={parseSize}
              className="border-none ml-1 px-2 py-1 bg-gray-300 dark:bg-gray-700 rounded-md"
              onChange={handleUrlChange}
            />
            {appType === AppType.YOUR_APPLICATION && <LockTooltip />}
          </div>
        </div>

        <textarea
          rows={5}
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
