// The agent-setup copy line (backlog#5034). The URL must stay on the apex
// domain: Claude Code does not follow the www -> apex redirect.
export const AGENT_SETUP_PROMPT_URL = "https://wopee.io/agent-setup/prompt.md";

export const AGENT_SETUP_LINE = `Set me up for Wopee.io: follow ${AGENT_SETUP_PROMPT_URL}, show me the plan first, and ask before changing anything.`;

export const AGENT_SETUP_CLIENTS = ["Claude Code", "Cursor", "Copilot", "Codex"];

// Tracking (backlog#5045): each copy puts a random ref on the prompt URL, so
// fetches of prompt.md can be counted per ref and joined to agent_setup_copy.
export function newAgentSetupRef(): string {
  const bytes = new Uint8Array(6);
  crypto.getRandomValues(bytes);
  return Array.from(bytes, (b) => (b % 36).toString(36)).join("");
}

export function agentSetupLineWithRef(ref: string): string {
  return AGENT_SETUP_LINE.replace(AGENT_SETUP_PROMPT_URL, `${AGENT_SETUP_PROMPT_URL}?ref=${ref}`);
}
