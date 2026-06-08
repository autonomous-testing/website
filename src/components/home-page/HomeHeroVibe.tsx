import React, { useRef, useState, useEffect } from "react";
import {
  Globe,
  AppWindow,
  FlaskConical,
  Landmark,
  ShoppingCart,
  Plus,
  Sparkles,
  ChevronDown,
  Check,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { AppType } from "./vibe/enums";
import LoginDialog from "./vibe/LoginDialog";
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
  const [showInstructions, setShowInstructions] = useState(false);
  const [videoHovered, setVideoHovered] = useState(false);
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
    <div className="relative min-h-screen flex flex-col justify-center items-center gap-6 sm:gap-8 lg:gap-12 overflow-hidden py-8 sm:py-10 lg:py-14">
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

      <div className="relative z-20 w-full max-w-6xl px-4 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
        {/* Left: the "start testing" form. */}
        <div className="w-full lg:w-[560px] flex-shrink-0 flex flex-col items-center gap-2">
          <div className="relative w-full rounded-2xl shadow-2xl shadow-purple-900/40">
            {/* Gradient border layer — animates out when the demo video is
                hovered, mirroring the video's frame animating in. */}
            <span
              aria-hidden="true"
              className={`pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-secondary-wopee via-purple-500 to-primary-wopee transition-opacity duration-500 ${
                videoHovered ? "opacity-0" : "opacity-100"
              }`}
            />
          <div className="relative bg-white dark:bg-gray-900 rounded-[14px] m-[1.5px] p-4 sm:p-5 flex flex-col gap-3">
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
                      rows={5}
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

            <p className="text-center text-xs text-gray-500 dark:text-gray-400">
              No credit card required
            </p>

          </div>
          </div>
        </div>

        {/* Right: fully-visible demo video. Hovering it fades the video's own
            gradient frame in while fading the form's gradient border out. */}
        <div
          className="w-full lg:flex-1 flex flex-col items-center gap-3"
          onMouseEnter={() => setVideoHovered(true)}
          onMouseLeave={() => setVideoHovered(false)}
        >
          <HeroVideoInline
            sources={heroVideoSources}
            poster="/how-it-works/step-1.webp"
            dimmed={false}
            className="w-full"
            aspectClassName="aspect-video"
          />
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

    </div>
  );
};
export default HomeHeroVibe;
