import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import isInternalUrl from "@docusaurus/isInternalUrl";
import { ThemeClassNames } from "@docusaurus/theme-common";
import Icon from "@mdi/react";
import { mdiGithub, mdiLinkedin, mdiYoutube } from "@mdi/js";
import { ArrowUpRight } from "lucide-react";

import { cmdBaseUrl } from "../../../cmdBaseUrl";
import { footerColumns, footerLegal } from "@/data/footer";
import type { FooterLink } from "@/data/footer";

const social = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/wopee",
    path: mdiLinkedin,
  },
  { label: "GitHub", href: "https://github.com/Wopee-io", path: mdiGithub },
  { label: "YouTube", href: "https://www.youtube.com/@wopee", path: mdiYoutube },
];

const linkClass =
  "group inline-flex min-h-7 items-center gap-1 text-[15px] leading-6 text-gray-600 no-underline transition-colors hover:text-secondary-wopee hover:no-underline dark:text-gray-400 dark:hover:text-primary-wopee focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary-wopee dark:focus-visible:outline-primary-wopee";

const bottomLinkClass =
  "inline-flex min-h-7 items-center text-gray-500 no-underline transition-colors hover:text-secondary-wopee hover:no-underline dark:hover:text-primary-wopee focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary-wopee dark:focus-visible:outline-primary-wopee";

const primaryCtaClass =
  "inline-flex h-10 w-full items-center justify-center rounded-lg bg-secondary-wopee px-4 sm:w-auto text-sm font-semibold text-white no-underline transition-colors hover:bg-purple-800 hover:text-white hover:no-underline dark:bg-primary-wopee dark:text-secondary-wopee dark:hover:bg-yellow-300 dark:hover:text-secondary-wopee focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary-wopee dark:focus-visible:outline-primary-wopee";

const secondaryCtaClass =
  "inline-flex h-10 w-full items-center justify-center rounded-lg border border-solid border-gray-300 px-4 sm:w-auto text-sm font-semibold text-gray-900 no-underline transition-colors hover:border-secondary-wopee hover:text-secondary-wopee hover:no-underline dark:border-white/15 dark:text-white dark:hover:border-primary-wopee dark:hover:text-primary-wopee focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary-wopee dark:focus-visible:outline-primary-wopee";

const socialClass =
  "inline-flex h-9 w-9 items-center justify-center rounded-lg border border-solid border-gray-200 bg-white text-gray-500 transition-colors hover:border-secondary-wopee hover:text-secondary-wopee dark:border-white/10 dark:bg-white/[0.03] dark:text-gray-400 dark:hover:border-primary-wopee dark:hover:text-primary-wopee focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-secondary-wopee dark:focus-visible:outline-primary-wopee";

function FooterLinkItem({ link }: { link: FooterLink }) {
  const external = !isInternalUrl(link.to);
  return (
    <li>
      <Link
        {...(external ? { href: link.to } : { to: link.to })}
        className={linkClass}
      >
        {link.label}
        {external && (
          <ArrowUpRight
            size={14}
            aria-hidden="true"
            className="opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
          />
        )}
      </Link>
    </li>
  );
}

export default function Footer(): JSX.Element {
  const logo = useBaseUrl("img/logo.png");
  const year = new Date().getFullYear();

  return (
    <footer
      className={clsx(
        ThemeClassNames.layout.footer.container,
        "relative overflow-hidden bg-gray-50 text-gray-600 dark:bg-[#0a0a0b] dark:text-gray-400"
      )}
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-secondary-wopee via-purple-500 to-primary-wopee"
      />

      <div className="relative mx-auto max-w-7xl px-6 pb-9 pt-14 lg:px-8 lg:pt-16">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4 lg:grid-cols-[1.6fr_repeat(4,1fr)]">
          <div className="col-span-2 md:col-span-4 lg:col-span-1 lg:pr-10">
            <Link
              to="/"
              aria-label="Wopee.io home"
              className="inline-flex items-center gap-3 no-underline hover:no-underline"
            >
              <img
                src={logo}
                alt=""
                width={32}
                height={32}
                className="h-8 w-8 dark:invert"
              />
              <span className="text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                Wopee.io
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-[15px] leading-7 dark:text-gray-300">
              Autonomous AI testing agents for web apps. Paste a URL, get
              Playwright tests that run across browsers and self-heal when the
              UI changes.
            </p>
            <div className="mt-7 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
              <Link
                href={`${cmdBaseUrl}/login`}
                id="cta-footer-trial"
                className={primaryCtaClass}
              >
                Start for free
              </Link>
              <Link
                to="/book-demo/"
                id="cta-footer-demo"
                className={secondaryCtaClass}
              >
                Book a demo
              </Link>
            </div>
            <ul className="m-0 mt-8 flex list-none items-center gap-2 p-0">
              {social.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    aria-label={item.label}
                    title={item.label}
                    className={socialClass}
                  >
                    <Icon path={item.path} size={0.8} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title} className="lg:col-span-1">
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                {column.title}
              </h3>
              <ul className="m-0 mt-4 list-none space-y-2.5 p-0">
                {column.links.map((link) => (
                  <FooterLinkItem key={link.label} link={link} />
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-gray-200 pt-7 text-sm text-gray-500 dark:border-white/10 md:flex-row md:items-center md:justify-between">
          <p>© {year} wopee labs, s.r.o. · Prague, Czech Republic</p>
          <ul className="m-0 flex list-none flex-wrap items-center gap-x-6 gap-y-2 p-0">
            {footerLegal.map((link) => (
              <li key={link.label}>
                <Link to={link.to} className={bottomLinkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <a href="mailto:help@wopee.io" className={bottomLinkClass}>
                help@wopee.io
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
