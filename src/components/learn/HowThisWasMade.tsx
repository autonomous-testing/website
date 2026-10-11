import React from "react";
import Link from "@docusaurus/Link";
import { cn } from "@/lib/utils";

type HowThisWasMadeProps = {
  className?: string;
  children?: React.ReactNode;
  teamsLink?: boolean;
};

// Footer box required on every /learn page (AI-disclosure policy, wording fixed).
export default function HowThisWasMade({
  className,
  children,
  teamsLink = true,
}: HowThisWasMadeProps) {
  return (
    <footer
      className={cn(
        "rounded-2xl border border-solid border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/60 p-6 sm:p-8 text-sm leading-relaxed",
        className,
      )}
    >
      <h2 className="text-base font-bold mb-2">How this was made</h2>
      <p className="opacity-80">
        Researched and drafted with AI assistants, then tested, edited and
        approved by Marcel Veselka, who is responsible for this content. Video
        narration uses an AI clone of Marcel's voice.
      </p>
      <p className="opacity-80 mt-3">
        Lab content: CC BY-NC 4.0. Free for internal team training at any
        company. Not for resale or paid courses.
      </p>
      {children}
      <p className="opacity-80 mt-3">
        {teamsLink && (
          <>
            Running it for a team?{" "}
            <Link
              to="/learn/teams/"
              className="font-semibold text-secondary-wopee dark:text-primary-wopee focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-wopee dark:focus-visible:outline-primary-wopee"
            >
              For QA leads
            </Link>
            {" · "}
          </>
        )}
        <Link
          to="/privacy/"
          className="font-semibold text-secondary-wopee dark:text-primary-wopee focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-wopee dark:focus-visible:outline-primary-wopee"
        >
          Privacy
        </Link>
      </p>
    </footer>
  );
}
