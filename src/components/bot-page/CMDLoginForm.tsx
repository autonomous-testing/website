import Icon from "@mdi/react";
import React, { useState } from "react";
import { mdiGithub, mdiGitlab, mdiGoogle } from "@mdi/js";
import { cmdBaseUrl } from "../../../cmdBaseUrl";
import { AppType } from "../home-page/vibe/enums";

const LOGIN_BUTTONS = [
  {
    icon: mdiGithub,
    provider: "github",
  },
  {
    icon: mdiGitlab,
    provider: "gitlab",
  },
  {
    icon: mdiGoogle,
    provider: "google",
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
    <div className="flex flex-col items-center gap-3">
      <input
        type="text"
        placeholder="https://your-project-url.com"
        className="h-[40px] sm:w-[376px] rounded border px-4 py-2 bg-white dark:bg-slate-100 dark:text-black text-xl focus:outline-secondary-wopee dark:focus:outline-primary-wopee "
        onChange={(e) => setProjectUrl(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleLogin("google");
          }
        }}
      />

      <div className="flex justify-center gap-2">
        {LOGIN_BUTTONS.map(({ icon, provider }) => (
          <button
            key={provider}
            onClick={() => handleLogin(provider)}
            className="flex justify-center items-center gap-2 bg-white text-slate-900 border border-slate-300 rounded p-2 sm:w-[120px] font-semibold cursor-pointer hover:bg-slate-100 transition-colors"
          >
            <Icon
              size={0.7}
              path={icon}
            />
            {provider.toUpperCase()}
          </button>
        ))}
      </div>

      <p className="text-xs text-center text-balance">
        By submitting this form you agree to Wopee.io{" "}
        <a
          href="https://wopee.io/terms-and-conditions/"
          target="_blank"
        >
          Terms and Conditions
        </a>{" "}
        and acknowledge the{" "}
        <a
          href="https://wopee.io/gdpr/"
          target="_blank"
        >
          Privacy Policy
        </a>
        .
      </p>
    </div>
  );
};

export default CMDLoginForm;
