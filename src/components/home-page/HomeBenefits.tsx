import React from "react";
import {
  Bolt,
  CheckCircle,
  Shield,
  Users,
  GitBranch,
  PencilLine,
} from "lucide-react";
import ButtonPrimary from "../buttons/ButtonPrimary";
import GradientCard from "@/components/ui/GradientCard";
import { cmdBaseUrl } from "../../../cmdBaseUrl";

const benefits = [
  {
    icon: (
      <Bolt className="text-secondary-wopee dark:text-yellow-400" size={32} />
    ), // 70–90% faster test creation
    badge: "70–90% faster",
    title: "Create tests 70–90% faster",
    description:
      "Benefit from rapid authoring plus the execution speed of traditional automation, without the setup complexity.",
  },
  {
    icon: (
      <CheckCircle
        className="text-secondary-wopee dark:text-yellow-400"
        size={32}
      />
    ), // 2–5x coverage
    badge: "2–5x coverage",
    title: "Reach 2–5x higher test coverage",
    description:
      "Mitigate risks with comprehensive coverage. AI agents explore critical paths other testing methods miss.",
  },
  {
    icon: (
      <Shield className="text-secondary-wopee dark:text-yellow-400" size={32} />
    ), // 60–90% less maintenance
    badge: "60–90% less maintenance",
    title: "Cut test maintenance by 60–90%",
    description:
      "Finding and fixing locators is yesterday's news. AI adapts tests to UI changes and updates scripts automatically.",
  },
  {
    icon: (
      <Users className="text-secondary-wopee dark:text-yellow-400" size={32} />
    ), // Team efficiency
    badge: "Team efficiency",
    title: "Scale testing without scaling teams",
    description:
      "Handle growing application complexity without adding headcount. Focus on delivering value, not managing tests.",
  },
  {
    icon: (
      <GitBranch
        className="text-secondary-wopee dark:text-yellow-400"
        size={32}
      />
    ), // No lock-in
    badge: "No lock-in",
    title: "Real Playwright code in your Git repo",
    description:
      "Your tests are real Playwright code in your own Git repo. They run even without Wopee.io.",
  },
  {
    icon: (
      <PencilLine
        className="text-secondary-wopee dark:text-yellow-400"
        size={32}
      />
    ), // Edits preserved
    badge: "Edits preserved",
    title: "Your edits survive regeneration",
    description:
      "Your edits are preserved. Agents update tests without overwriting your changes.",
  },
];

const HomeBenefits = () => {
  return (
    <section className="w-full flex flex-col items-center py-16 px-2">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-secondary-wopee dark:text-yellow-400 mb-2">
        Why teams use Wopee.io as their AI testing tool.
      </h2>
      <p className="text-lg text-gray-700 dark:text-white text-center mb-10">
        Automated web testing powered by AI. Six ways Wopee.io removes
        traditional testing barriers.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full mb-4">
        {benefits.map((benefit, idx) => (
          <GradientCard
            key={idx}
            className="h-full"
            innerClassName="flex flex-col justify-between min-h-[260px]"
          >
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="inline-flex items-center justify-center w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg">
                  {benefit.icon}
                </span>
                <span className="ml-auto px-3 py-1 text-xs rounded-full bg-yellow-100 dark:bg-yellow-900 text-yellow-700 dark:text-yellow-300 font-semibold">
                  {benefit.badge}
                </span>
              </div>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1 min-h-[48px] flex items-center">
                {benefit.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                {benefit.description}
              </p>
            </div>
          </GradientCard>
        ))}
      </div>
      <p className="text-sm italic text-gray-600 dark:text-gray-400 text-center mb-10">
        Typical pilot outcomes; results depend on app maturity and complexity.
      </p>
      <ButtonPrimary
        id="cta-benefits-trial"
        label="Start for free"
        href={cmdBaseUrl}
        className="w-60 h-[50px]"
      />
    </section>
  );
};

export default HomeBenefits;
