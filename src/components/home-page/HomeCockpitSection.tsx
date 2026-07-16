import React from "react";
import {
  MonitorPlay,
  Hand,
  MessageCircleQuestion,
  ScrollText,
} from "lucide-react";
import GradientCard from "@/components/ui/GradientCard";
import ButtonPrimary from "../buttons/ButtonPrimary";
import { cmdBaseUrl } from "../../../cmdBaseUrl";

const capabilities = [
  {
    icon: (
      <MonitorPlay
        className="text-secondary-wopee dark:text-yellow-400"
        size={32}
      />
    ),
    title: "Watch it work, live",
    description:
      "Interactive runs stream the agent's browser straight to your screen. See every click and every page as it happens.",
  },
  {
    icon: (
      <Hand className="text-secondary-wopee dark:text-yellow-400" size={32} />
    ),
    title: "Take over mid-run",
    description:
      "Grab mouse and keyboard whenever you want, drive the browser yourself, then hand control back. Or steer the agent with a quick text nudge.",
  },
  {
    icon: (
      <MessageCircleQuestion
        className="text-secondary-wopee dark:text-yellow-400"
        size={32}
      />
    ),
    title: "It asks before it guesses",
    description:
      "Blocked by a CAPTCHA, MFA prompt, or unknown login? The agent hands you control with the reason and a suggested action. You unblock it, it resumes on its own.",
  },
  {
    icon: (
      <ScrollText
        className="text-secondary-wopee dark:text-yellow-400"
        size={32}
      />
    ),
    title: "Evidence for every run",
    description:
      "Step-by-step activity logs, agent logs, and screenshots for every execution. Review what the agent did and why — no black box.",
  },
];

const HomeCockpitSection = () => {
  return (
    <section className="w-full flex flex-col items-center py-16 px-2">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-secondary-wopee dark:text-yellow-400 mb-2 text-balance">
        Autonomy you can supervise
      </h2>
      <p className="text-lg text-gray-700 dark:text-white text-center mb-10 max-w-2xl text-balance">
        Autonomous doesn't mean out of control. The Interactive Cockpit keeps
        you in command of every agent run.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl w-full mb-10">
        {capabilities.map((capability, idx) => (
          <GradientCard
            key={idx}
            className="h-full"
            innerClassName="flex flex-col min-h-[160px]"
          >
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-flex items-center justify-center w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg">
                {capability.icon}
              </span>
              <h3 className="font-bold text-lg text-gray-900 dark:text-white m-0">
                {capability.title}
              </h3>
            </div>
            <p className="text-gray-700 dark:text-gray-300 text-sm">
              {capability.description}
            </p>
          </GradientCard>
        ))}
      </div>
      <ButtonPrimary
        id="cta-cockpit-trial"
        label="Start for free"
        href={cmdBaseUrl}
        className="w-60 h-[50px]"
      />
      <p className="text-sm italic mt-2">No credit card required</p>
    </section>
  );
};

export default HomeCockpitSection;
