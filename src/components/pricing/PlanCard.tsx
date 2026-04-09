import React from "react";

import Ribbon from "./Ribbon";
import Link from "@docusaurus/Link";
import ButtonGradientOutline from "../buttons/ButtonGradientOutline";
import GradientCard from "@/components/ui/GradientCard";

export type PlanCardT = {
  title: string;
  tagline: string;
  monthlyPrice: number;
  bestFor: string;
  features: string[];
  featured?: boolean;
  href: string;
  ctaLabel: string;
  socialProof?: string;
  image: string;
};

export const PlanCards: PlanCardT[] = [
  {
    title: "Starter",
    tagline: "Catch bugs before users do — without writing test scripts.",
    monthlyPrice: 19,
    bestFor: "Solo devs & side projects",
    features: [
      "Up to 10 active projects",
      "Autonomous test generation",
      "Playwright + CI/CD ready",
      "Email & community support",
    ],
    featured: false,
    href: "https://cmd.wopee.io",
    ctaLabel: "Start for free",
    image: "/img/subscription-plans/starter.png",
  },
  {
    title: "Basic",
    tagline: "Ship faster with autonomous regression on every PR.",
    monthlyPrice: 79,
    bestFor: "Growing product teams",
    features: [
      "Up to 100 active projects",
      "Team user management",
      "Onboarding assistance",
      "Everything in Starter",
    ],
    featured: true,
    href: "https://cmd.wopee.io",
    ctaLabel: "Start for free",
    socialProof: "Most teams choose Basic",
    image: "/img/subscription-plans/basic.png",
  },
  {
    title: "Premium",
    tagline: "Maximum throughput for teams that ship multiple times a day.",
    monthlyPrice: 179,
    bestFor: "High-velocity engineering orgs",
    features: [
      "Unlimited projects",
      "Advanced user management & roles",
      "Priority individual support",
      "Everything in Basic",
    ],
    featured: false,
    href: "https://cmd.wopee.io",
    ctaLabel: "Start for free",
    image: "/img/subscription-plans/premium.png",
  },
];

const CheckIcon = () => (
  <svg
    className="w-5 h-5 flex-shrink-0 text-secondary-wopee dark:text-primary-wopee mt-0.5"
    viewBox="0 0 20 20"
    fill="currentColor"
    aria-hidden="true"
  >
    <path
      fillRule="evenodd"
      d="M16.704 5.29a1 1 0 010 1.42l-7.5 7.5a1 1 0 01-1.42 0l-3.5-3.5a1 1 0 011.42-1.42L8.5 12.08l6.79-6.79a1 1 0 011.414 0z"
      clipRule="evenodd"
    />
  </svg>
);

export default function PlanCard({
  title,
  tagline,
  monthlyPrice,
  bestFor,
  features,
  featured,
  href,
  ctaLabel,
  socialProof,
  image,
}: PlanCardT) {
  return (
    <GradientCard
      variant={featured ? "featured" : "default"}
      padding="roomy"
      className={
        featured
          ? "w-[340px] shadow-[0_0_60px_-15px_rgba(112,48,160,0.6)] dark:shadow-[0_0_80px_-15px_rgba(255,204,0,0.35)] transition-transform hover:-translate-y-1"
          : "w-[340px] transition-transform hover:-translate-y-1"
      }
      innerClassName="flex flex-col gap-5 relative overflow-hidden h-full"
    >
      {featured && <Ribbon />}

      {/* Decorative plan image — bottom-right watermark */}
      <img
        src={image}
        alt=""
        aria-hidden="true"
        className="absolute -bottom-2 -right-2 w-28 h-28 object-contain opacity-50 dark:opacity-30 pointer-events-none select-none rotate-[8deg]"
      />

      <div className="flex flex-col gap-1.5 text-left relative">
        <div className="text-[10px] uppercase tracking-widest font-semibold text-gray-500 dark:text-gray-400">
          {bestFor}
        </div>
        <h3 className="text-2xl font-bold text-secondary-wopee dark:text-primary-wopee m-0">
          {title}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-300 m-0 min-h-[40px] leading-snug">
          {tagline}
        </p>
      </div>

      <div className="text-left">
        <div className="flex items-baseline gap-1">
          <span className="text-6xl font-extrabold leading-none bg-gradient-to-br from-secondary-wopee to-purple-700 dark:from-primary-wopee dark:to-yellow-300 bg-clip-text text-transparent tracking-tight">
            {monthlyPrice}
          </span>
          <span className="text-2xl font-bold leading-none text-secondary-wopee dark:text-primary-wopee">
            €
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
            / user / mo
          </span>
        </div>
      </div>

      <Link to={href} className="hover:no-underline">
        <ButtonGradientOutline className="w-full" label={ctaLabel} />
      </Link>
      <div className="text-[11px] text-center text-gray-500 dark:text-gray-400 -mt-3">
        No credit card required · Cancel anytime
      </div>

      {socialProof && (
        <div className="text-[11px] text-center font-semibold text-secondary-wopee dark:text-primary-wopee -mt-2">
          ★ {socialProof}
        </div>
      )}

      <div className="flex flex-col gap-3 text-left pt-4 relative">
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent"
        />
        <ul className="flex flex-col gap-2.5 m-0 p-0 list-none">
          {features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-200"
            >
              <CheckIcon />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </GradientCard>
  );
}
