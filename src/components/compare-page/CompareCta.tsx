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
    <div className="bg-gradient-to-b from-transparent to-primary-wopee dark:to-secondary-wopee">
      <div className="container my-12 lg:my-16 py-16 lg:py-24 flex flex-col justify-center gap-5 lg:gap-10 text-center">
        <div className="text-balance px-2 lg:px-0">
          <h2 className="lg:text-4xl text-3xl font-bold">{heading}</h2>
          <h3 className="text-secondary-wopee dark:text-primary-wopee lg:text-4xl text-3xl font-bold">
            {subheading}
          </h3>
        </div>
        <div className="flex flex-col sm:flex-row justify-center gap-2 items-center lg:gap-5">
          <div className="h-20">
            <ButtonPrimary
              label="Start for free"
              href={loginUrl}
              className="w-60 h-[50px]"
              id={ctaId}
            />
            <p className="text-center text-sm italic">
              No credit card required
            </p>
          </div>
          <div className="sm:h-20">
            <ButtonPrimaryInverted
              href="/book-demo/"
              className="w-60 h-[50px]"
            />
          </div>
        </div>
        {related.length > 0 && (
          <nav
            aria-label="More comparisons"
            className="flex flex-wrap justify-center gap-x-5 gap-y-2 px-2 text-sm"
          >
            <span className="font-semibold">More comparisons:</span>
            {related.map((c) => (
              <Link
                key={c.href}
                to={c.href}
                className="text-secondary-wopee dark:text-primary-wopee underline"
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
