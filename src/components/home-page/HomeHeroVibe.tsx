import React, { useRef, useState, useEffect } from "react";
import {
  Globe,
  AppWindow,
  FlaskConical,
  Landmark,
  ShoppingCart,
  Play,
  Plus,
  Sparkles,
  ChevronDown,
  Check,
  CheckCircle2,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { AppType } from "./vibe/enums";
import LoginDialog from "./vibe/LoginDialog";
import HeroVideoModal from "./HeroVideoModal";
import HeroVideoInline from "./HeroVideoInline";
import HeroTrustedByStrip from "./HeroTrustedByStrip";
import { stepsData } from "../../data/steps";

const appTemplates = {
  [AppType.WEBSITE]: {
    label: "Website",
    icon: Globe,
    url: "https://dronjo.wopee.io",
    instructions: `Test sign in.
Click "Sign in", use any @tesena.com email and any password.
Verify that home page loads and a "Logout" button is visible top-right.`,
  },
  [AppType.E_COMMERCE]: {
    label: "E-commerce",
    icon: ShoppingCart,
    url: "https://www.saucedemo.com",
    instructions: `Test check out.
Sign in (standard_user / secret_sauce), add an item, complete checkout.
Verify that "Thank you for your order!" appears.`,
  },
  [AppType.BANKING]: {
    label: "Banking",
    icon: Landmark,
    url: "https://moja.tatrabanka.sk/html-tb/en/demo",
    instructions: `Test sign in.
Accept the cookie banner if shown, then submit the pre-filled PIN form.
Verify that the dashboard loads after submit.`,
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
// Default to the E-commerce demo on landing — the hero arrives with a
// working URL + instructions pre-filled so the CTA is immediately usable,
// while visitors can still paste their own URL or pick another demo chip.
const defaultTemplate = AppType.E_COMMERCE;
// Three demo scenarios visitors can one-click to load (URL + instructions
// pre-filled). "Your app" isn't in this list — it's the implicit default
// state, reachable by clicking an already-selected chip again or by typing
// a custom URL in the input above.
const DEMO_SCENARIOS: AppType[] = [
  AppType.WEBSITE,
  AppType.E_COMMERCE,
  AppType.BANKING,
];
const URL_REGEX =
  /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/;

// Same clips (and order) as the "How it works" section, so the fullscreen
// modal can label each fragment with its step title/subtitle.
const heroVideoSources = stepsData.map((s) => s.videoSrc);

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
  const [demoMenuOpen, setDemoMenuOpen] = useState(false);
  const urlInputRef = useRef<HTMLInputElement>(null);
  const demoMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (appType === AppType.YOUR_APPLICATION) {
      urlInputRef.current?.focus();
    }
  }, [appType]);

  useEffect(() => {
    if (!demoMenuOpen) return;
    const handleClick = (e: MouseEvent) => {
      if (!demoMenuRef.current?.contains(e.target as Node)) {
        setDemoMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [demoMenuOpen]);

  const handleAppTypeChange = (type: AppType) => {
    setAppType(type);
    setAppUrl(appTemplates[type].url);
    setTestingInstructions(appTemplates[type].instructions);
    setDemoMenuOpen(false);
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
  const triggerDemo = DEMO_SCENARIOS.includes(appType)
    ? appType
    : AppType.E_COMMERCE;

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center gap-2 lg:gap-3 overflow-hidden py-2 lg:py-3">
      <div
        className="pointer-events-none select-none absolute inset-0 w-full h-full bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100 dark:from-gray-900 dark:via-purple-900/20 dark:to-indigo-900/20 z-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.15) 100%), radial-gradient(circle at 15% 75%, rgba(112, 48, 160, 0.32) 0%, transparent 55%), radial-gradient(circle at 85% 25%, rgba(236, 72, 153, 0.12) 0%, transparent 55%), linear-gradient(rgba(128,128,128,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(128,128,128,0.08) 1px, transparent 1px)",
          backgroundSize:
            "100% 100%, 100% 100%, 100% 100%, 40px 40px, 40px 40px",
        }}
      />

      <section className="relative z-10 flex flex-col items-center gap-2 md:gap-3 px-4">
        <div className="inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium bg-gray-900/5 dark:bg-white/5 backdrop-blur border border-gray-900/10 dark:border-white/15 text-gray-700 dark:text-gray-200">
          <span className="w-1.5 h-1.5 rounded-full bg-primary-wopee" />
          <span>
            Playwright-friendly · Self-healing · <strong className="font-semibold">Free to start</strong>
          </span>
        </div>
        <h1
          className="font-bold text-center text-4xl sm:text-5xl md:text-6xl text-pretty leading-[1] tracking-tighter"
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

      <div className="relative z-20 w-full max-w-3xl px-4 grid place-items-center">
        {/* Faint demo video backdrop behind the content. */}
        <HeroVideoInline
          sources={heroVideoSources}
          poster="/how-it-works/step-1.webp"
          onExpand={() => setVideoOpen(true)}
          className="col-start-1 row-start-1 z-0 w-[104%]"
          aspectClassName="aspect-video"
        />
        <div className="col-start-1 row-start-1 z-10 w-full flex flex-col items-center gap-2">
          <p
            className="max-w-xl text-center text-sm sm:text-base font-medium text-gray-700 dark:text-gray-100 text-pretty"
            style={{ textShadow: "0 2px 14px rgba(0,0,0,0.6)" }}
          >
            {"Enter a URL, choose what to test, and Wopee's AI agent creates runnable tests with screenshots, checks, and self-healing steps."}
          </p>
          <div className="relative w-full p-[1.5px] rounded-2xl bg-gradient-to-br from-secondary-wopee via-purple-500 to-primary-wopee shadow-2xl shadow-purple-900/40">
          <div className="bg-white dark:bg-gray-900 rounded-[14px] p-4 sm:p-5 flex flex-col gap-3">
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <label className="text-[10px] uppercase tracking-[0.15em] text-gray-600 dark:text-gray-400 font-semibold pl-1">
                  Your web app URL
                </label>
                {/* App selector — segmented "Your app" / "Demo app" toggle.
                    "Demo app" switches to a demo and opens the picker so a
                    specific demo (Website / E-commerce / Banking) stays
                    selectable. */}
                <div className="inline-flex items-center gap-0.5 rounded-lg p-0.5 ring-1 ring-inset ring-secondary-wopee/20 dark:ring-white/10 bg-secondary-wopee/5 dark:bg-white/5">
                  <div
                    role="button"
                    tabIndex={0}
                    aria-pressed={appType === AppType.YOUR_APPLICATION}
                    onClick={() => handleAppTypeChange(AppType.YOUR_APPLICATION)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        handleAppTypeChange(AppType.YOUR_APPLICATION);
                      }
                    }}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold leading-none cursor-pointer select-none transition-all ${
                      appType === AppType.YOUR_APPLICATION
                        ? "bg-secondary-wopee text-white shadow-sm"
                        : "text-secondary-wopee/70 hover:text-secondary-wopee hover:bg-secondary-wopee/10 dark:text-white/70 dark:hover:text-white dark:hover:bg-white/10"
                    }`}
                  >
                    <AppWindow className="w-3.5 h-3.5" />
                    Your app
                  </div>
                  <div className="relative inline-flex" ref={demoMenuRef}>
                    <div
                      role="button"
                      tabIndex={0}
                      aria-haspopup="listbox"
                      aria-expanded={demoMenuOpen}
                      aria-label={`Demo app: ${appTemplates[triggerDemo].label}`}
                      onClick={() => {
                        if (!DEMO_SCENARIOS.includes(appType)) {
                          handleAppTypeChange(triggerDemo);
                        }
                        setDemoMenuOpen((open) => !open);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          if (!DEMO_SCENARIOS.includes(appType)) {
                            handleAppTypeChange(triggerDemo);
                          }
                          setDemoMenuOpen((open) => !open);
                        }
                      }}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold leading-none cursor-pointer select-none transition-all ${
                        DEMO_SCENARIOS.includes(appType)
                          ? "bg-secondary-wopee text-white shadow-sm"
                          : "text-secondary-wopee/70 hover:text-secondary-wopee hover:bg-secondary-wopee/10 dark:text-white/70 dark:hover:text-white dark:hover:bg-white/10"
                      }`}
                    >
                      <FlaskConical className="w-3.5 h-3.5" />
                      Demo app
                      <ChevronDown
                        className={`w-3 h-3 transition-transform ${demoMenuOpen ? "rotate-180" : ""}`}
                      />
                    </div>
                    {demoMenuOpen && (
                      <div
                        role="listbox"
                        className="absolute right-0 top-full mt-1 z-20 min-w-[10rem] rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-lg shadow-purple-900/10 py-1"
                      >
                        {DEMO_SCENARIOS.map((type) => {
                          const tpl = appTemplates[type];
                          const Icon = tpl.icon;
                          const selected = appType === type;
                          return (
                            <div
                              key={type}
                              role="option"
                              tabIndex={0}
                              aria-selected={selected}
                              onClick={() => handleAppTypeChange(type)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  e.preventDefault();
                                  handleAppTypeChange(type);
                                }
                              }}
                              className={`flex items-center gap-2 px-3 py-1.5 text-[11px] cursor-pointer select-none transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 ${selected ? "text-secondary-wopee dark:text-primary-wopee font-semibold" : "text-gray-700 dark:text-gray-300"}`}
                            >
                              <Icon className="w-3.5 h-3.5 flex-shrink-0" />
                              <span className="flex-1">{tpl.label}</span>
                              {selected && (
                                <Check className="w-3.5 h-3.5 flex-shrink-0" />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="group relative flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50/80 dark:bg-gray-800/60 focus-within:border-secondary-wopee focus-within:ring-2 focus-within:ring-secondary-wopee/20 transition-all">
                <SelectedIcon className="w-4 h-4 text-gray-500 dark:text-gray-500 group-focus-within:text-secondary-wopee transition-colors flex-shrink-0" />
                <input
                  ref={urlInputRef}
                  type="url"
                  value={appUrl}
                  placeholder="https://your-project-url.com"
                  className="flex-1 w-full bg-transparent border-none focus:outline-none text-sm font-mono text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400"
                  onChange={handleUrlChange}
                />
              </div>
            </div>

            {/* Textarea always rendered so the form height stays constant.
                In the collapsed state (no manual reveal + empty value) the
                textarea sits quiet — no placeholder text, faint dashed
                border — with a single "+ Add testing instructions" affordance
                centered on top. Click reveals the full styled field. */}
            <div className="relative">
              {(() => {
                const collapsed =
                  !showInstructions && testingInstructions.length === 0;
                return (
                  <>
                    <textarea
                      rows={3}
                      aria-label="Testing instructions"
                      autoFocus={showInstructions}
                      value={testingInstructions}
                      placeholder={
                        collapsed
                          ? ""
                          : "What should the agent test? (e.g. login, checkout, search). Leave blank to let it decide."
                      }
                      className={`block w-full rounded-lg px-3 py-2 outline-none focus:border-secondary-wopee focus:ring-2 focus:ring-secondary-wopee/20 resize-y text-sm leading-snug text-gray-900 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-400 transition-colors ${
                        collapsed
                          ? "bg-transparent border border-dashed border-gray-400/60 dark:border-gray-600/40 pointer-events-none"
                          : "bg-gray-50/80 dark:bg-gray-800/60 border border-gray-300 dark:border-gray-700"
                      }`}
                      onChange={(e) => setTestingInstructions(e.target.value)}
                    />
                    {collapsed && (
                      <div
                        role="button"
                        tabIndex={0}
                        onClick={() => setShowInstructions(true)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setShowInstructions(true);
                          }
                        }}
                        className="absolute inset-0 flex items-center justify-center rounded-lg cursor-pointer hover:bg-gray-100/40 dark:hover:bg-white/5 transition-colors"
                      >
                        <span className="hero-add-instructions inline-flex items-center gap-1.5 text-xs">
                          <Plus className="w-3 h-3" />
                          Add testing instructions
                        </span>
                      </div>
                    )}
                  </>
                );
              })()}
            </div>

            <div>
              <Button
                size="lg"
                variant="wopeeFlat"
                disabled={!URL_REGEX.test(appUrl)}
                onClick={() =>
                  setLoginDialogState({ isOpen: true, mode: "vibe" })
                }
                className="hero-cta w-full flex items-center justify-center gap-2 px-6 py-3 text-base font-bold rounded-lg shadow-lg shadow-purple-500/40 dark:shadow-yellow-500/40 hover:shadow-purple-500/60 dark:hover:shadow-yellow-500/60 transition-all"
                id="vibe-testing"
              >
                <Sparkles className="w-5 h-5" />
                <span className="text-white dark:text-black font-bold">
                  Generate my first test
                </span>
              </Button>
            </div>

            <div className="flex flex-wrap items-center justify-center sm:justify-between gap-x-4 gap-y-1.5 text-sm text-gray-600 dark:text-gray-300">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                Free to start
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                No credit card required
              </span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0" />
                Works with your Playwright setup
              </span>
            </div>

          </div>
          </div>
          {/* Watch-demo affordance over the video below the form. */}
          <div
            role="button"
            tabIndex={0}
            onClick={() => setVideoOpen(true)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setVideoOpen(true);
              }
            }}
            aria-label="Watch 90-second demo"
            className="group/play inline-flex items-center gap-2.5 cursor-pointer text-white/60 transition-colors duration-300 hover:text-white"
          >
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-black/30 backdrop-blur ring-1 ring-white/30 transition-all duration-300 group-hover/play:ring-2 group-hover/play:ring-secondary-wopee dark:group-hover/play:ring-primary-wopee group-hover/play:scale-110 group-hover/play:shadow-lg group-hover/play:shadow-purple-900/50">
              <Play className="w-4 h-4 fill-current translate-x-px" />
            </span>
            <span className="text-sm font-medium">Watch 90-sec demo</span>
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
        steps={stepsData}
        isOpen={videoOpen}
        onClose={() => setVideoOpen(false)}
      />
    </div>
  );
};
export default HomeHeroVibe;
