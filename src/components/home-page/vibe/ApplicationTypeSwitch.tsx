import React from "react";

import { cn } from "@/lib/utils";
import { AppType } from "./enums";
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
            "p-2 rounded-lg md:w-[150px] hover:cursor-pointer flex justify-center items-center gap-1.5 relative border transition-all",
            app.value === appType
              ? "text-white border-transparent bg-gradient-to-br from-secondary-wopee to-purple-600 shadow-lg shadow-purple-900/40"
              : "border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-white/5 text-gray-700 dark:text-gray-200 hover:border-secondary-wopee dark:hover:border-primary-wopee hover:bg-white dark:hover:bg-white/10"
          )}
          onClick={() => handleAppTypeChange(app.value)}
        >
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
