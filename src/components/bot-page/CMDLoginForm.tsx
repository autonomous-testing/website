import Icon from "@mdi/react";
import React, { useState } from "react";
import { mdiGithub, mdiGitlab, mdiGoogle } from "@mdi/js";

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

  const handleLogin = (provider: string) => {
    const url = `https://cmd.wopee.io/signup-embedded?url=${projectUrl}&provider=${provider}`;
    window.open(url, "_blank");
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <input
        type="text"
        placeholder="https://your-project-url.com"
        className="h-[40px] sm:w-[376px] rounded border px-4 py-2 bg-white dark:bg-slate-100 dark:text-black text-xl focus:outline-secondary-wopee dark:focus:outline-primary-wopee "
        onChange={(e) => setProjectUrl(e.target.value)}
      />

      <div className="flex justify-center gap-2">
        {LOGIN_BUTTONS.map(({ icon, provider }) => (
          <button
            onClick={() => handleLogin(provider)}
            className="flex justify-center items-center bg-white dark:bg-black rounded border p-2 sm:w-[120px] hover:cursor-pointer"
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
          href="http://wopee.io/terms-and-conditions"
          target="_blank"
        >
          Terms and Conditions
        </a>{" "}
        and acknowledge the{" "}
        <a
          href="http://wopee.io/gdpr"
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
