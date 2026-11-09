import React from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";

import GradientCard from "@site/src/components/ui/GradientCard";
import CopyPrompt, { focusRing } from "@site/src/components/ui/CopyPrompt";
import { AGENT_SETUP_CLIENTS, AGENT_SETUP_LINE } from "@site/src/data/agent-setup";

const linkClass = clsx(
  "font-semibold text-secondary-wopee underline underline-offset-2 hover:text-secondary-wopee dark:text-primary-wopee dark:hover:text-primary-wopee",
  focusRing
);

type AgentSetupCardProps = {
  title?: string;
  /** The copy button is the view's one primary action. */
  primary?: boolean;
  /** Where "What the prompt does" points; /agent-setup/ itself links to its own section. */
  explainHref?: string;
  /** Extra items on the line under the prompt (e.g. a "Show the config" toggle). */
  extra?: React.ReactNode;
  className?: string;
  /** Content under the card body (e.g. the expanded config). */
  children?: React.ReactNode;
};

/** The agent-setup copy line in a card: what to paste, where, and what it does. */
export default function AgentSetupCard({
  title = "Let your coding agent set it up",
  primary = false,
  explainHref = "/agent-setup/",
  extra,
  className,
  children,
}: AgentSetupCardProps) {
  return (
    <GradientCard className={clsx("w-full text-left", className)}>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
        <p className="m-0 text-lg font-bold text-gray-900 dark:text-white">{title}</p>
        <ul className="m-0 flex list-none flex-wrap gap-2 p-0" aria-label="Works in">
          {AGENT_SETUP_CLIENTS.map((client) => (
            <li
              key={client}
              className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-semibold text-gray-700 dark:bg-primary-wopee/10 dark:text-primary-wopee"
            >
              {client}
            </li>
          ))}
        </ul>
      </div>
      <CopyPrompt text={AGENT_SETUP_LINE} layout="row" primary={primary}>
        <p className="m-0 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-600 dark:text-gray-300">
          <span>Paste it into your agent’s chat. It shows you the plan before it changes anything.</span>
          {explainHref.startsWith("#") ? (
            <a href={explainHref} className={linkClass}>
              What the prompt does
            </a>
          ) : (
            <Link to={explainHref} className={linkClass}>
              What the prompt does
            </Link>
          )}
          {extra}
        </p>
      </CopyPrompt>
      {children}
    </GradientCard>
  );
}

export { linkClass as agentSetupLinkClass };
