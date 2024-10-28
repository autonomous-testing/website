import React from "react";
import Icon from "@mdi/react";

const WopeeVersusSection = ({
  bot,
  VALUES,
}: {
  bot?: boolean;
  VALUES: Array<{ title: string; description: string; icon: string }>;
}) => {
  return (
    <div
      className={`flex flex-col gap-2 lg:gap-10 lg:mb-36 px-2 lg:px-0 text-balance ${
        bot ? "my-16" : "mb-16"
      }`}
    >
      <p className="text-3xl text-center font-bold">
        Wopee.io vs {bot ? "Manual testing" : "Traditional visual testing"}
      </p>

      <div className="flex flex-col lg:flex-row justify-around gap-5 text-center">
        {VALUES.map((value) => (
          <div key={value.title}>
            <Icon
              size={7}
              path={value.icon}
              className="text-secondary-wopee dark:text-primary-wopee group-hover:opacity-90 transition-opacity"
            />
            <p className="text-6xl font-bold">{value.title}</p>
            <p className="text-lg">
              <span className="text-secondary-wopee dark:text-primary-wopee font-bold">
                {value.description.split(" ")[0]}{" "}
              </span>
              {value.description.split(" ").slice(1).join(" ")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default WopeeVersusSection;
