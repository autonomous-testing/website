// The agent-setup copy line (backlog#5034). The URL must stay on the apex
// domain: Claude Code does not follow the www -> apex redirect.
export const AGENT_SETUP_PROMPT_URL = "https://wopee.io/agent-setup/prompt.md";

export const AGENT_SETUP_LINE = `Set me up for Wopee.io: follow ${AGENT_SETUP_PROMPT_URL}, show me the plan first, and ask before changing anything.`;

export const AGENT_SETUP_CLIENTS = ["Claude Code", "Cursor", "Copilot", "Codex"];
