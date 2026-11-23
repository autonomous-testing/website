import React, { useRef } from "react";

import CopyPrompt from "@site/src/components/ui/CopyPrompt";
import { trackAgentSetupCopy } from "@site/src/components/agent-setup/track";
import { AGENT_SETUP_LINE, agentSetupLineWithRef, newAgentSetupRef } from "@site/src/data/agent-setup";

/** The agent-setup line with a copy button; copies carry a ref like the site's other placements. */
export function SetupLine({ position }: { position: "top" | "bottom" }) {
  const ref = useRef("");
  const copyText = () => {
    ref.current = newAgentSetupRef();
    return agentSetupLineWithRef(ref.current);
  };
  return (
    <CopyPrompt
      text={AGENT_SETUP_LINE}
      copyText={copyText}
      layout="row"
      id={`cta-agent-setup-blog-${position}`}
      onCopy={() => trackAgentSetupCopy("blog", ref.current)}
      className="not-prose my-6"
    />
  );
}
