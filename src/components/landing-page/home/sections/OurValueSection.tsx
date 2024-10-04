import React from "react";
import Icon from "@mdi/react";
import { mdiCurrencyUsd, mdiRocket, mdiCheckboxMultipleOutline } from "@mdi/js";

const values = [
  {
    icon: mdiRocket,
    title: "10x",
    description: "Quicker setup compared to traditional tools",
  },
  {
    icon: mdiCurrencyUsd,
    title: "30 - 40%",
    description: "Lower cost than our competitors",
  },
  {
    icon: mdiCheckboxMultipleOutline,
    title: "5x",
    description: "Higher test coverage with simple maintenance",
  },
];

const OurValueSection = () => {
  return (
    <div className="flex flex-col gap-2 lg:gap-10 mb-16 lg:mb-36 px-2 lg:px-0 text-balance">
      <p className="text-3xl text-center font-bold">
        Wopee.io vs Traditional Visual Testing
      </p>

      <div className="flex flex-col lg:flex-row justify-around gap-5 text-center">
        {values.map((value) => (
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
export default OurValueSection;
