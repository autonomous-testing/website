import React from "react";

import { cn } from "@/lib/utils";
import { AppType } from "./enums";
import LockTooltip from "./LockTooltip";
import { AppWindow, Globe, Landmark, ShoppingCart } from "lucide-react";

const APP_TYPE_BUTTONS = [
  {
    label: "Website",
    value: AppType.WEBSITE,
  },
  {
    label: "E-commerce",
    value: AppType.E_COMMERCE,
  },
  {
    label: "Banking",
    value: AppType.BANKING,
  },
  {
    label: "Your app",
    value: AppType.YOUR_APPLICATION,
  },
];

const ApplicationTypeSwitch = ({
  appType,
  handleAppTypeChange,
}: {
  appType: AppType;
  handleAppTypeChange: (appType: AppType) => void;
}) => {
  return (
    <section className="flex gap-2">
      {APP_TYPE_BUTTONS.map((app) => (
        <div
          key={app.label}
          className={cn(
            "p-2 bg-gray-300 rounded-md md:w-[150px] hover:cursor-pointer flex justify-center items-center gap-1 relative",
            app.value === appType
              ? "bg-secondary-wopee dark:bg-primary-wopee text-white dark:text-black"
              : "dark:bg-gray-700 "
          )}
          onClick={() => handleAppTypeChange(app.value)}
        >
          {app.value === AppType.YOUR_APPLICATION && <LockTooltip size={4} />}
          {app.value === AppType.WEBSITE && <Globe size={16} />}
          {app.value === AppType.E_COMMERCE && <ShoppingCart size={16} />}
          {app.value === AppType.BANKING && <Landmark size={16} />}
          {app.value === AppType.YOUR_APPLICATION && <AppWindow size={16} />}
          <span className="hidden md:block">{app.label}</span>
        </div>
      ))}
    </section>
  );
};
export default ApplicationTypeSwitch;
