import Icon from "@mdi/react";
import React, { useState } from "react";
import { mdiGithub, mdiGitlab, mdiGoogle } from "@mdi/js";
import { cmdBaseUrl } from "../../../cmdBaseUrl";
import { AppType } from "../home-page/vibe/enums";

const LOGIN_BUTTONS = [
  {
    icon: mdiGithub,
    provider: "github",
    label: "GitHub",
  },
  {
    icon: mdiGitlab,
    provider: "gitlab",
    label: "GitLab",
  },
  {
    icon: mdiGoogle,
    provider: "google",
    label: "Google",
  },
];

export const CMDLoginForm = () => {
  const [projectUrl, setProjectUrl] = useState("");

  // Same param contract and double-encoding as home-page/vibe/LoginDialog:
  // signup-embedded interpolates appUrl/prompt/appType raw into the OAuth
  // callback URL, so values must arrive still-encoded once.
  const handleLogin = (provider: string) => {
    const params = new URLSearchParams({
      prompt: "",
      appUrl: encodeURIComponent(projectUrl),
      appType: encodeURIComponent(AppType.YOUR_APPLICATION),
      provider: encodeURIComponent(provider),
    });
    window.location.assign(`${cmdBaseUrl}/signup-embedded?${params.toString()}`);
  };

  return (
    <div className="mx-auto flex w-full max-w-md flex-col items-center gap-3">
      <label
        htmlFor="testing-project-url"
        className="sr-only"
      >
        Your web app URL
      </label>
      <input
        id="testing-project-url"
        type="url"
        placeholder="https://your-project-url.com"
        className="h-12 w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-base text-slate-900 shadow-[0_10px_30px_-24px_rgba(15,23,42,0.4)] outline-none placeholder:text-slate-400 focus:border-secondary-wopee focus:ring-2 focus:ring-secondary-wopee/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:shadow-[0_14px_34px_-24px_rgba(0,0,0,0.85)] dark:placeholder:text-slate-500 dark:focus:border-primary-wopee dark:focus:ring-primary-wopee/20"
        onChange={(e) => setProjectUrl(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleLogin("google");
          }
        }}
      />

      <div className="grid w-full grid-cols-3 gap-2">
        {LOGIN_BUTTONS.map(({ icon, provider, label }) => (
          <div
            key={provider}
            role="button"
            tabIndex={0}
            onClick={() => handleLogin(provider)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                handleLogin(provider);
              }
            }}
            className="flex h-11 cursor-pointer items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-2 text-sm font-semibold text-slate-800 outline-none transition-colors hover:border-secondary-wopee/40 hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-secondary-wopee focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-primary-wopee/40 dark:hover:bg-slate-800 dark:focus-visible:ring-primary-wopee dark:focus-visible:ring-offset-slate-950"
          >
            <Icon
              size={0.7}
              path={icon}
            />
            {label}
          </div>
        ))}
      </div>

      <p className="m-0 max-w-sm text-balance text-center text-xs leading-5 text-slate-500 dark:text-slate-400">
        By submitting this form you agree to Wopee.io{" "}
        <a
          href="https://wopee.io/terms-and-conditions/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Terms and Conditions
        </a>{" "}
        and acknowledge the{" "}
        <a
          href="https://wopee.io/gdpr/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Privacy Policy
        </a>
        .
      </p>
    </div>
  );
};

export default CMDLoginForm;
