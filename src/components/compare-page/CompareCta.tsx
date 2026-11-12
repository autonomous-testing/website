import React from "react";
import Link from "@docusaurus/Link";
import { useLocation } from "@docusaurus/router";
import ButtonPrimary from "@site/src/components/buttons/ButtonPrimary";
import ButtonPrimaryInverted from "@site/src/components/buttons/ButtonPrimaryInverted";
import { useCmdLoginUrl } from "@site/src/components/pseo/useCmdLoginUrl";
import { COMPARISONS } from "./comparisons";

type CompareCtaProps = {
  heading: string;
  subheading: string;
  ctaId: string;
};

const CompareCta = ({ heading, subheading, ctaId }: CompareCtaProps) => {
  const loginUrl = useCmdLoginUrl();
  const { pathname } = useLocation();
  const related =
    pathname.replace(/\/?$/, "/") === "/compare/"
      ? []
      : COMPARISONS.filter((c) => !pathname.startsWith(c.href.slice(0, -1)));
  return (
    <div className="bg-primary-wopee text-gray-900 mt-12 lg:mt-16">
      <div className="container py-16 lg:py-20 flex flex-col justify-center gap-5 lg:gap-10 text-center">
        <div className="text-balance px-2 lg:px-0">
          <h2 className="lg:text-4xl text-3xl font-bold text-gray-900">{heading}</h2>
          <h3 className="text-gray-900 lg:text-4xl text-3xl font-bold">
            {subheading}
          </h3>
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-2 items-center lg:gap-5">
          <div className="h-20">
            <ButtonPrimary
              label="Start for free"
              href={loginUrl}
              className="w-60 h-[50px] !bg-gray-900 !border-gray-900 !text-white group-hover:!bg-gray-700 group-hover:!border-gray-700"
              id={ctaId}
            />
            <p className="text-center text-sm text-gray-900">
              No credit card required
            </p>
          </div>
          <div className="sm:h-20">
            <ButtonPrimaryInverted
              href="/book-demo/"
              className="w-60 h-[50px] !text-gray-900 !border-gray-900 group-hover:!bg-gray-900/10 hover:!bg-gray-900/10"
            />
          </div>
        </div>
        {related.length > 0 && (
          <nav
            aria-label="More comparisons"
            className="flex flex-wrap justify-center gap-x-5 gap-y-2 px-2 text-sm text-gray-900"
          >
            <span className="font-semibold">More comparisons:</span>
            {related.map((c) => (
              <Link
                key={c.href}
                to={c.href}
                className="text-gray-900 underline hover:text-gray-900"
              >
                {c.title}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </div>
  );
};

export default CompareCta;
