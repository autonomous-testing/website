import React, { useRef, useState, useEffect } from "react";
import {
  Globe,
  AppWindow,
  Landmark,
  ShoppingCart,
  Play,
  Plus,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { AppType } from "./vibe/enums";
import LoginDialog from "./vibe/LoginDialog";
import HeroVideoModal from "./HeroVideoModal";
import HeroTrustedByStrip from "./HeroTrustedByStrip";

const appTemplates = {
  [AppType.WEBSITE]: {
    label: "Website",
    icon: Globe,
    url: "https://dronjo.wopee.io",
    instructions: `Test login procedure.
Navigate to the login page (click on the Sign in button).
Sign in with any @tesena.com email and any password.
Verify you reach the home page and see the Logout button (top right).`,
  },
  [AppType.E_COMMERCE]: {
    label: "E-commerce",
    icon: ShoppingCart,
    url: "https://www.saucedemo.com",
    instructions: `Test purchase procedure.
Login with: standard_user / secret_sauce and verify redirect to product listing.
Add an item to cart, complete the purchase, and verify 'Thank you for your order!' message displayed.`,
  },
  [AppType.BANKING]: {
    label: "Banking",
    icon: Landmark,
    url: "https://moja.tatrabanka.sk/html-tb/en/demo",
    instructions: `Test login procedure.
Wait for page load, accept cookies (if shown), submit form with pre-filled PIN.`,
  },
  [AppType.YOUR_APPLICATION]: {
    label: "Your app",
    icon: AppWindow,
    url: "",
    instructions: "",
  },
};
const urlList = Object.entries(appTemplates).map(([key, value]) => ({
  url: value.url,
  type: key as AppType,
}));
// Pre-fill the E-commerce demo (saucedemo.com) so the primary CTA is clickable
// on landing. Visitors can still switch to a different scenario or paste their
// own URL via the scenario chips below. Lowers the "do something first" barrier
// that disabled-CTA states create.
const defaultTemplate = AppType.E_COMMERCE;
const SCENARIO_ORDER: AppType[] = [
  AppType.E_COMMERCE,
  AppType.WEBSITE,
  AppType.BANKING,
  AppType.YOUR_APPLICATION,
];
const URL_REGEX =
  /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;

const heroVideoSources = [
  "/how-it-works/step-1.webm",
  "/how-it-works/step-2.webm",
  "/how-it-works/step-3.webm",
];

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
  const [videoOpen, setVideoOpen] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const urlInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (appType === AppType.YOUR_APPLICATION) {
      urlInputRef.current?.focus();
    }
  }, [appType]);

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

  const SelectedIcon = appTemplates[appType].icon;

  return (
    <div className="relative lg:min-h-[calc(100vh-100px)] flex flex-col justify-center items-center gap-5 lg:gap-6 overflow-hidden py-5 lg:py-6">
      <div
        className="pointer-events-none select-none absolute inset-0 w-full h-full bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100 dark:from-gray-900 dark:via-purple-900/20 dark:to-indigo-900/20 z-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.15) 100%), radial-gradient(circle at 15% 75%, rgba(112, 48, 160, 0.32) 0%, transparent 55%), radial-gradient(circle at 85% 25%, rgba(236, 72, 153, 0.12) 0%, transparent 55%), linear-gradient(rgba(128,128,128,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(128,128,128,0.08) 1px, transparent 1px)",
          backgroundSize:
            "100% 100%, 100% 100%, 100% 100%, 40px 40px, 40px 40px",
        }}
      />

      <section className="relative z-10 flex flex-col items-center gap-3 md:gap-4 px-4">
        <button
          type="button"
          onClick={() => setVideoOpen(true)}
          aria-label="Watch the 60-second demo"
          className="group inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-gray-900/5 dark:bg-white/5 backdrop-blur border border-gray-900/10 dark:border-white/15 text-gray-700 dark:text-gray-200 hover:border-secondary-wopee dark:hover:border-primary-wopee transition-colors"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary-wopee" />
          <span>
            Playwright-friendly · Self-healing · <strong className="font-semibold">Free to start</strong>
          </span>
          <span className="opacity-30">·</span>
          <span className="inline-flex items-center gap-1.5 text-secondary-wopee dark:text-primary-wopee group-hover:underline">
            <Play className="w-3 h-3 fill-current" />
            Watch demo
          </span>
        </button>
        <h1
          className="font-bold text-center text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-pretty leading-[1] tracking-tighter"
          style={{ textShadow: "0 4px 30px rgba(0,0,0,0.25)" }}
        >
          <span className="whitespace-nowrap">AI Testing Agents</span>
          <br />
          <span
            className="text-secondary-wopee dark:text-primary-wopee"
            style={{
              textShadow:
                "0 0 40px rgba(112,48,160,0.35), 0 4px 30px rgba(0,0,0,0.15)",
            }}
          >
            for Web Apps
          </span>
        </h1>
      </section>

      <div className="relative z-10 w-full max-w-3xl px-4">
        <div className="p-[1.5px] rounded-2xl bg-gradient-to-br from-secondary-wopee via-purple-500 to-primary-wopee shadow-2xl shadow-purple-900/40">
          <div className="bg-white dark:bg-gray-900 rounded-[14px] p-4 sm:p-5 flex flex-col gap-3">
            {/* Visible scenario chips. One click to switch (was 2 via dropdown).
                E-commerce is pre-selected so the CTA is clickable on landing. */}
            <div className="grid grid-cols-4 gap-1.5">
              {SCENARIO_ORDER.map((type) => {
                const tpl = appTemplates[type];
                const Icon = tpl.icon;
                const selected = appType === type;
                return (
                  <div
                    key={type}
                    role="button"
                    tabIndex={0}
                    aria-pressed={selected}
                    onClick={() => handleAppTypeChange(type)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleAppTypeChange(type);
                      }
                    }}
                    className={`scenario-chip ${selected ? "scenario-chip--selected" : ""} flex items-center justify-center gap-1.5 px-2 py-2 rounded-lg text-xs sm:text-sm font-medium cursor-pointer select-none transition-colors`}
                  >
                    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span className="truncate">{tpl.label}</span>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] uppercase tracking-[0.15em] text-gray-500 dark:text-gray-400 font-semibold pl-1">
                Your web app URL
              </label>
              <div className="group relative flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50/80 dark:bg-gray-800/60 focus-within:border-secondary-wopee focus-within:ring-2 focus-within:ring-secondary-wopee/20 transition-all">
                <SelectedIcon className="w-4 h-4 text-gray-400 dark:text-gray-500 group-focus-within:text-secondary-wopee transition-colors flex-shrink-0" />
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

            {showInstructions || testingInstructions.length > 0 ? (
              <textarea
                rows={3}
                autoFocus={showInstructions}
                value={testingInstructions}
                placeholder="What should the agent test? (e.g. login, checkout, search). Leave blank to let it decide."
                className="w-full bg-gray-50/80 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 rounded-lg px-3.5 py-2.5 focus:outline-none focus:border-secondary-wopee focus:ring-2 focus:ring-secondary-wopee/20 resize-none text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 transition-all"
                onChange={(e) => setTestingInstructions(e.target.value)}
              />
            ) : (
              <span
                role="button"
                tabIndex={0}
                onClick={() => setShowInstructions(true)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setShowInstructions(true);
                  }
                }}
                className="hero-add-instructions self-start inline-flex items-center gap-1.5 cursor-pointer text-sm transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                Add testing instructions (optional)
              </span>
            )}

            <div className="flex justify-end items-center gap-2">
              <Button
                size="lg"
                variant="wopeeFlat"
                disabled={!URL_REGEX.test(appUrl)}
                onClick={() =>
                  setLoginDialogState({ isOpen: true, mode: "vibe" })
                }
                className="flex items-center gap-2 px-5 py-2 font-bold rounded-lg shadow-lg shadow-purple-500/30 dark:shadow-yellow-500/30 hover:shadow-purple-500/50 dark:hover:shadow-yellow-500/50 hover:scale-105 transition-all"
                id="vibe-testing"
              >
                <Sparkles className="w-4 h-4" />
                <span className="text-white dark:text-black font-bold">
                  Try it free
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <HeroTrustedByStrip />

      <LoginDialog
        appUrl={appUrl}
        appType={appType}
        prompt={testingInstructions}
        mode={loginDialogState.mode}
        setIsOpenVibe={setIsOpenVibe}
        isOpen={loginDialogState.isOpen}
      />

      <HeroVideoModal
        sources={heroVideoSources}
        isOpen={videoOpen}
        onClose={() => setVideoOpen(false)}
      />
    </div>
  );
};
export default HomeHeroVibe;
