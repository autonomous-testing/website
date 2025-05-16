import clsx from "clsx";
import React from "react";
import { AppType } from "../HomeHeroVibe";
import { mdiApplication, mdiBank, mdiCart, mdiWeb } from "@mdi/js";
import Icon from "@mdi/react";

const ApplicationTypes = ({
  appType,
  handleAppTypeChange,
}: {
  appType: string;
  handleAppTypeChange: (appType: string) => void;
}) => {
  const APP_TYPES = [
    {
      name: AppType.Website,
      icon: mdiWeb,
    },
    {
      name: AppType.ECommerce,
      icon: mdiCart,
    },
    {
      name: AppType.Banking,
      icon: mdiBank,
    },
    {
      name: AppType.YourApplication,
      icon: mdiApplication,
    },
  ];
  return (
    <section className="flex gap-2">
      {APP_TYPES.map((app) => (
        <div
          key={app.name}
          className={clsx(
            "p-3 bg-gray-300 rounded-md w-[170px] hover:cursor-pointer flex justify-center items-center gap-1",
            app.name === appType
              ? "bg-secondary-wopee dark:bg-primary-wopee text-white dark:text-black"
              : "dark:bg-gray-700 "
          )}
          onClick={() => handleAppTypeChange(app.name)}
        >
          <Icon
            path={app.icon}
            size={0.8}
          />
          {app.name}
        </div>
      ))}
    </section>
  );
};
export default ApplicationTypes;
