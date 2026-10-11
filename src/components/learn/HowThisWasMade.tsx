import React from "react";
import Link from "@docusaurus/Link";
import { cn } from "@/lib/utils";
import { textLink } from "./styles";

type HowThisWasMadeProps = {
  className?: string;
  children?: React.ReactNode;
  teamsLink?: boolean;
  id?: string;
};

// Footnote required on every /learn page (AI-disclosure policy, wording fixed).
export default function HowThisWasMade({
  className,
  children,
  teamsLink = true,
  id = "how",
}: HowThisWasMadeProps) {
  return (
    <footer
      id={id}
      className={cn(
        "scroll-mt-24 border-0 border-t border-solid border-gray-200 pt-5 text-sm leading-relaxed text-gray-600 dark:border-white/10 dark:text-gray-400 [&_p]:max-w-[75ch]",
        className,
      )}
    >
      <h2 className="m-0 mb-1 text-sm font-bold text-gray-900 dark:text-gray-100">How this was made</h2>
      <p>
        Researched and drafted with AI assistants, then tested, edited and
        approved by Marcel Veselka, who is responsible for this content. Video
        narration uses an AI clone of Marcel's voice.
      </p>
      <p className="mt-1">
        Lab content: CC BY-NC 4.0. Free for internal team training at any
        company. Not for resale or paid courses.
      </p>
      {children}
      <p className="mt-2">
        {teamsLink && (
          <>
            Running it for a team?{" "}
            <Link to="/learn/teams/" className={textLink}>
              For QA leads
            </Link>
            {" · "}
          </>
        )}
        <Link to="/privacy/" className={textLink}>
          Privacy
        </Link>
      </p>
    </footer>
  );
}
