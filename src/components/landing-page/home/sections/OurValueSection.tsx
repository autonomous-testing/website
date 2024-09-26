import React from "react";
import Icon from "@mdi/react";
import { mdiSpeedometer, mdiCurrencyUsd, mdiWifi } from "@mdi/js";

const OurValueSection = () => {
  return (
    <div className="flex flex-col gap-10 mb-36">
      <p className="text-3xl text-center font-bold">
        Wopee.io vs Traditional Visual Testing
      </p>
      <div className="flex justify-around gap-5 text-center">
        <div>
          <Icon
            size={6}
            path={mdiSpeedometer}
            className="text-secondary-wopee dark:text-primary-wopee group-hover:opacity-90 transition-opacity"
          />
          <p className="text-2xl font-bold">10x</p>
          <p className="text-lg">Quicker setup compared to traditional tools</p>
        </div>

        <div>
          <Icon
            size={6}
            path={mdiCurrencyUsd}
            className="text-secondary-wopee dark:text-primary-wopee group-hover:opacity-90 transition-opacity"
          />
          <p className="text-2xl font-bold">30 - 40%</p>
          <p className="text-lg">Lower cost than our competitors</p>
        </div>

        <div>
          <Icon
            size={6}
            path={mdiWifi}
            className="text-secondary-wopee dark:text-primary-wopee group-hover:opacity-90 transition-opacity"
          />
          <p className="text-2xl font-bold">5x</p>
          <p className="text-lg">
            Higher test coverage with simple maintenance
          </p>
        </div>
      </div>
    </div>
  );
};
export default OurValueSection;
