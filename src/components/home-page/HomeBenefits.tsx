import React from "react";
import {
  Bolt,
  CheckCircle,
  Shield,
  DollarSign,
  Users,
  ClipboardList,
} from "lucide-react";
import ButtonPrimary from "../buttons/ButtonPrimary";

const benefits = [
  {
    icon: (
      <Bolt className="text-secondary-wopee dark:text-yellow-400" size={32} />
    ), // 10x speed
    badge: "10x speed",
    title: "Prepare tests 10x faster with AI",
    description:
      "Benefit from rapid authoring plus the execution speed of traditional automation, without the setup complexity.",
  },
  {
    icon: (
      <CheckCircle
        className="text-secondary-wopee dark:text-yellow-400"
        size={32}
      />
    ), // 5x higher coverage
    badge: "5x higher coverage",
    title: "Achieve 5x higher test coverage",
    description:
      "Mitigate risks with comprehensive coverage. AI automatically explores critical paths other testing methods miss.",
  },
  {
    icon: (
      <Shield className="text-secondary-wopee dark:text-yellow-400" size={32} />
    ), // Zero maintenance
    badge: "Zero maintenance",
    title: "Eliminate tedious test maintenance",
    description:
      "Finding and fixing locators is yesterday's news. AI adapts tests to UI changes and updates scripts automatically.",
  },
  {
    icon: (
      <DollarSign
        className="text-secondary-wopee dark:text-yellow-400"
        size={32}
      />
    ), // Team efficiency
    badge: "Team efficiency",
    title: "Scale testing without scaling teams",
    description:
      "Handle growing application complexity without adding headcount. Focus on delivering value, not managing tests.",
  },
  {
    icon: (
      <Users className="text-secondary-wopee dark:text-yellow-400" size={32} />
    ), // 5x faster analysis
    badge: "5x faster analysis",
    title: "Accelerate test analysis & design",
    description:
      "Reduce test analysis and design time while maximising efficiency. AI identifies optimal test scenarios automatically.",
  },
  {
    icon: (
      <ClipboardList
        className="text-secondary-wopee dark:text-yellow-400"
        size={32}
      />
    ), // No-code testing
    badge: "No-code testing",
    title: "From weeks to minutes, zero coding",
    description:
      "One-click to get your entire testing framework (including CI/CD) running. No specialised expertise required, just immediate results.",
  },
];

const HomeBenefits = () => {
  return (
    <section className="w-full flex flex-col items-center py-16 px-2">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-secondary-wopee dark:text-yellow-400 mb-2">
        6 ways how Wopee.io makes testing better.
      </h2>
      <p className="text-lg text-gray-700 dark:text-white text-center mb-10">
        AI-driven test automation that eliminates traditional testing barriers.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl w-full mb-10">
        {benefits.map((benefit, idx) => (
          <div
            key={idx}
            className="group relative rounded-xl transition-shadow min-h-[260px] h-full flex"
          >
            <div className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0 bg-gradient-to-br from-blue-500 to-secondary-wopee p-0.5"></div>
            <div className="relative bg-white/70 dark:bg-black/40 border border-gray-200 dark:border-gray-800 rounded-xl p-6 flex flex-col justify-between shadow-lg hover:shadow-2xl transition-shadow min-h-[260px] h-full w-full backdrop-blur z-10 group-hover:border-transparent">
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
            </div>
          </div>
        ))}
      </div>
      <ButtonPrimary
        label="Start testing better"
        href="https://cmd.wopee.io"
        className="w-60 h-[50px]"
      />
    </section>
  );
};

export default HomeBenefits;
