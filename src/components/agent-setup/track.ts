// GA4 event for agent-setup copies (backlog#5045). GTM (GTM-T54MTRSZ) forwards
// dataLayer events to GA4; dataLayer is absent in development, so nothing is sent there.
export type AgentSetupPlacement = "mcp-hero" | "integrations" | "vs-pwmcp" | "agent-setup";

export function trackAgentSetupCopy(placement: AgentSetupPlacement, ref: string) {
  if (typeof window === "undefined") return;
  const w = window as typeof window & { dataLayer?: object[] };
  w.dataLayer?.push({ event: "agent_setup_copy", page_path: window.location.pathname, placement, ref });
}
