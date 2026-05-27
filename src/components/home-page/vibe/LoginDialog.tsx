import React from "react";
import Icon from "@mdi/react";
import { mdiGithub, mdiGitlab, mdiGoogle } from "@mdi/js";
import { Globe, Sparkles, ChevronRight } from "lucide-react";
import { cmdBaseUrl } from "../../../../cmdBaseUrl";

import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import { AppType } from "./enums";

// Insert zero-width spaces after each dot so long hostnames can wrap at
// segment boundaries instead of mid-character.
const wrapHost = (host: string) => host.replace(/\./g, ".​");

const cleanHost = (raw: string) => {
  if (!raw) return "";
  try {
    return new URL(raw).hostname.replace(/^www\./, "");
  } catch {
    return raw.replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0];
  }
};

// Real customer logos used elsewhere on the site (homepage trusted-by strip).
// Each logo sits in a fixed slot with object-contain so wildly different source
// aspect ratios (Generali wordmark, Multitude monogram, Synot text mark) all
// occupy the same optical area. Per-logo inner padding compensates for marks
// that fill their canvas vs ones with built-in whitespace.
// Text-only customer names — same pattern as the /pricing/ trust strip.
// Sidesteps every "logo X is bigger/smaller than logo Y" balance issue,
// and renders identically in both themes via a single text colour.
const TRUST_NAMES = ["Accenture", "Synot Tech", "Livesport", "Multitude"];

const LoginDialog = ({
  mode,
  prompt,
  isOpen,
  appUrl,
  appType,
  setIsOpenVibe,
}: {
  mode: "vibe" | "upgrade";
  prompt: string;
  isOpen: boolean;
  appUrl: string;
  appType: AppType;
  setIsOpenVibe: (isOpen: boolean) => void;
}) => {
  const handleLogin = (provider: string) => {
    let params;
    if (mode === "upgrade") {
      params = new URLSearchParams({
        upgrade: encodeURIComponent(true),
        provider: encodeURIComponent(provider),
      });
    } else {
      params = new URLSearchParams({
        prompt: encodeURIComponent(prompt),
        appUrl: encodeURIComponent(appUrl),
        appType: encodeURIComponent(appType),
        provider: encodeURIComponent(provider),
      });
    }
    const url = `${cmdBaseUrl}/signup-embedded?${params.toString()}`;
    window.location.assign(url);
    setIsOpenVibe(false);
  };

  const host = cleanHost(appUrl);
  const isVibe = mode === "vibe";

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpenVibe}>
      <DialogContent className="bg-white dark:bg-gray-900 border-secondary-wopee/30 shadow-2xl shadow-purple-900/40 sm:max-w-md p-6 gap-0">
        {/* HEADER BLOCK — explicit margins between relationships so spacing
            reflects meaning: logo → header (medium), subtitle → testing
            (medium), testing → steps (tight). */}
        <div className="flex flex-col items-center">
          <div className="relative mb-4">
            <img
              src="/img/logo.png"
              alt="Wopee.io"
              className="w-10 h-10 object-contain dark:invert"
            />
            <Sparkles
              className="absolute -top-1 -right-1 w-4 h-4 text-primary-wopee fill-primary-wopee"
              aria-hidden="true"
            />
          </div>

          <DialogHeader className="space-y-1.5">
            <DialogTitle className="text-xl sm:text-2xl text-center text-balance leading-tight">
              {isVibe ? (
                <>
                  Start your{" "}
                  <span className="text-secondary-wopee dark:text-primary-wopee">
                    free
                  </span>{" "}
                  AI testing
                </>
              ) : (
                "Sign in to continue"
              )}
            </DialogTitle>
            <DialogDescription className="text-center text-sm text-gray-600 dark:text-gray-400 leading-snug">
              {isVibe ? (
                <>
                  Your test runs the moment you sign in.
                  <br />
                  No credit card needed.
                </>
              ) : (
                "Create an account or sign in to test better."
              )}
            </DialogDescription>
          </DialogHeader>

          {/* Testing + steps grouped tight (both supporting context),
              med-spaced from the header above. */}
          {isVibe && (
            <div className="flex flex-col items-center gap-1 mt-3">
              {host && (
                <p className="flex items-center justify-center gap-1.5 text-[11px] text-gray-500 dark:text-gray-400">
                  <Globe className="w-3 h-3 flex-shrink-0" aria-hidden="true" />
                  <span>
                    Testing{" "}
                    <span className="font-mono text-gray-700 dark:text-gray-300 break-words">
                      {wrapHost(host)}
                    </span>
                  </span>
                </p>
              )}
              <div className="flex items-center justify-center gap-2 text-[11px] text-gray-500 dark:text-gray-400">
                <span>Sign in</span>
                <ChevronRight
                  className="w-3 h-3 text-gray-400/60 dark:text-gray-500/60 flex-shrink-0"
                  aria-hidden="true"
                />
                <span>Agents test</span>
                <ChevronRight
                  className="w-3 h-3 text-gray-400/60 dark:text-gray-500/60 flex-shrink-0"
                  aria-hidden="true"
                />
                <span>Get your report</span>
              </div>
            </div>
          )}
        </div>

        {/* CTA BLOCK — primary + secondary OAuth, medium gap from header */}
        <div className="flex flex-col gap-3 mt-6">
        {/* Primary: GitHub — full-width filled, the recommended path */}
        <div
          role="button"
          tabIndex={0}
          onClick={() => handleLogin("github")}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleLogin("github");
            }
          }}
          className="oauth-btn-primary inline-flex items-center justify-center gap-2 h-12 rounded-md text-sm font-semibold cursor-pointer transition-colors w-full"
        >
          <Icon size={0.95} path={mdiGithub} />
          <span>Continue with GitHub</span>
        </div>

        {/* "or continue with" divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
          <span className="text-xs text-gray-500 dark:text-gray-400">
            or continue with
          </span>
          <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
        </div>

        {/* Secondary: Google + GitLab side by side */}
        <div className="grid grid-cols-2 gap-2">
          <div
            role="button"
            tabIndex={0}
            onClick={() => handleLogin("google")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleLogin("google");
              }
            }}
            className="oauth-btn inline-flex items-center justify-center gap-1.5 h-10 rounded-md text-sm font-medium cursor-pointer transition-colors"
          >
            <Icon size={0.75} path={mdiGoogle} color="#4285F4" />
            <span>Google</span>
          </div>
          <div
            role="button"
            tabIndex={0}
            onClick={() => handleLogin("gitlab")}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleLogin("gitlab");
              }
            }}
            className="oauth-btn inline-flex items-center justify-center gap-1.5 h-10 rounded-md text-sm font-medium cursor-pointer transition-colors"
          >
            <Icon size={0.75} path={mdiGitlab} color="#FC6D26" />
            <span>GitLab</span>
          </div>
        </div>
        </div>

        {isVibe && (
          <>
          {/* SUPPORTING BLOCK — trust strip only. Steps moved up next to
              the Testing-<host> line, where they share visual context. */}
          <div className="flex flex-col gap-3 mt-5">
            {/* "trusted by" divider — same line style as "or continue with"
                so the modal has consistent section separators. */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
              <span className="text-xs text-gray-500 dark:text-gray-400">
                trusted by
              </span>
              <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700" />
            </div>

            {/* Trust names — text-only, audience-recognised brand list. */}
            <div className="flex flex-wrap items-center justify-center gap-y-1">
              {TRUST_NAMES.map((name, idx) => (
                <React.Fragment key={name}>
                  {idx > 0 && (
                    <span
                      aria-hidden="true"
                      className="inline-block w-1 h-1 mx-3 rounded-full bg-gray-300 dark:bg-gray-600"
                    />
                  )}
                  <span className="text-xs font-semibold tracking-wide text-gray-500 dark:text-gray-400">
                    {name}
                  </span>
                </React.Fragment>
              ))}
            </div>
          </div>
          </>
        )}

        <p className="login-legal text-[10px] leading-snug text-center text-balance mt-4">
          By continuing, you agree to our{" "}
          <a
            href="https://wopee.io/terms-and-conditions/"
            target="_blank"
            rel="noopener"
          >
            Terms
          </a>{" "}
          and{" "}
          <a href="https://wopee.io/gdpr/" target="_blank" rel="noopener">
            Privacy Policy
          </a>
          .
        </p>
      </DialogContent>
    </Dialog>
  );
};
export default LoginDialog;
