import React from "react";

import ButtonPrimary from "@site/src/components/buttons/ButtonPrimary";
import ButtonPrimaryInverted from "@site/src/components/buttons/ButtonPrimaryInverted";
import { cmdBaseUrl } from "../../../cmdBaseUrl";

const HomeEndingSection = () => {
  return (
    // The page's yellow field (DESIGN.md, Surfaces): flat yellow, ink type, an ink primary button.
    <div className="bg-primary-wopee text-gray-900">
      <div className="container py-16 lg:py-20 flex flex-col justify-center gap-5 lg:gap-10 text-center">
        <div className="text-balance px-2 lg:px-0">
          <h2 className="text-4xl font-bold text-gray-900">
            Streamline Your Web App Testing
          </h2>
          <h3 className="text-gray-900 lg:text-3xl sm:text-2xl text-2xl">
            Effortless <span className="font-bold">Regression Testing</span>{" "}
            with Advanced Automation.
          </h3>
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-2 lg:gap-5">
          <div className="sm:h-20">
            <ButtonPrimaryInverted
              id="cta-book-demo"
              href="/book-demo/"
              className="w-60 h-[50px] !text-gray-900 !border-gray-900 hover:!bg-gray-900 hover:!text-white"
            />
          </div>
          <div className="h-20">
            <ButtonPrimary
              id="cta-start-testing"
              label="Start for free"
              href={`${cmdBaseUrl}/login`}
              className="w-60 h-[50px] !bg-gray-900 !border-gray-900 !text-white"
            />
            <p className="text-center text-sm italic text-gray-900">
              No credit card required
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeEndingSection;
