import React from "react";
import Icon from "@mdi/react";
import { mdiSpeedometer, mdiCurrencyUsd, mdiWifi } from "@mdi/js";

const values = [
  {
    icon: mdiSpeedometer,
    title: "10x",
    description: "Quicker setup compared to traditional tools",
  },
  {
    icon: mdiCurrencyUsd,
    title: "30 - 40%",
    description: "Lower cost than our competitors",
  },
  {
    icon: mdiWifi,
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
              size={6}
              path={value.icon}
              className="text-secondary-wopee dark:text-primary-wopee group-hover:opacity-90 transition-opacity"
            />
            <p className="text-2xl font-bold">{value.title}</p>
            <p className="text-lg">{value.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default OurValueSection;
