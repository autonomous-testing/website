import React from "react";
import Icon from "@mdi/react";
import { mdiGithub, mdiGitlab, mdiGoogle } from "@mdi/js";
import { cmdBaseUrl } from "../../../../cmdBaseUrl";

import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import { AppType } from "./enums";
import { Button } from "@/components/ui/button";

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
    const url = `${cmdBaseUrl}?${params.toString()}`;
    window.open(url, "_blank");
    setIsOpenVibe(false);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpenVibe}
    >
      <DialogContent className="dark:bg-gray-800">
        <DialogHeader>
          <DialogTitle className="text-4xl text-center">
            Sign in to continue
          </DialogTitle>
          <DialogDescription className="text-center">
            Create an account or sign in to test better.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center gap-3">
          <div className="flex justify-center gap-2">
            {LOGIN_BUTTONS.map(({ icon, provider }) => (
              <Button
                key={provider}
                variant="outline"
                onClick={() => handleLogin(provider)}
                className="flex justify-center items-center bg-white dark:bg-black rounded border p-2 sm:w-[120px] hover:cursor-pointer"
              >
                <Icon
                  size={0.7}
                  path={icon}
                />
                {provider.toUpperCase()}
              </Button>
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
      </DialogContent>
    </Dialog>
  );
};
export default LoginDialog;
