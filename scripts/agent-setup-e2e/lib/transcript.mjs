// Turns an agent's JSONL output into one shape the checks read:
//   { commands, toolCalls, finalMessage, permissionDenials, errors, meta, parseErrors }
// Claude Code: `claude -p --output-format stream-json --verbose`.
// Codex: `codex exec --json` (event and item types as in @openai/codex-sdk ThreadEvent/ThreadItem).

const textOf = (content) => {
  if (content == null) return "";
  if (typeof content === "string") return content;
  if (Array.isArray(content)) return content.map((c) => (typeof c === "string" ? c : c?.text ?? JSON.stringify(c))).join("\n");
  return JSON.stringify(content);
};

const jsonLines = (text) => {
  const events = [];
  let parseErrors = 0;
  for (const line of text.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    try {
      events.push(JSON.parse(trimmed));
    } catch {
      parseErrors++;
    }
  }
  return { events, parseErrors };
};

// `mcp__<server>__<tool>`; server names may not contain `__`.
const splitMcpName = (name) => {
  const m = /^mcp__(.+?)__(.+)$/.exec(name || "");
  return m ? { server: m[1], tool: m[2] } : { server: null, tool: name };
};

export function parseClaudeCode(text) {
  const { events, parseErrors } = jsonLines(text);
  const out = { commands: [], toolCalls: [], finalMessage: "", permissionDenials: [], errors: [], meta: {}, parseErrors, events: events.length };
  const byId = new Map();
  let lastAssistantText = "";
  for (const ev of events) {
    if (ev.type === "system" && ev.subtype === "init") {
      out.meta.model = ev.model;
      out.meta.version = ev.claude_code_version;
      out.meta.mcpServers = ev.mcp_servers;
    } else if (ev.type === "assistant") {
      for (const block of ev.message?.content ?? []) {
        if (block.type === "text" && block.text) lastAssistantText = block.text;
        if (block.type !== "tool_use") continue;
        const { server, tool } = splitMcpName(block.name);
        const call = { id: block.id, name: block.name, server, tool, input: block.input ?? {}, resultText: null, isError: false };
        byId.set(block.id, call);
        out.toolCalls.push(call);
        if (block.name === "Bash" && typeof block.input?.command === "string") out.commands.push(block.input.command);
      }
    } else if (ev.type === "user") {
      const content = ev.message?.content;
      if (!Array.isArray(content)) continue;
      for (const block of content) {
        if (block.type !== "tool_result") continue;
        const call = byId.get(block.tool_use_id);
        if (!call) continue;
        call.resultText = textOf(block.content);
        call.isError = Boolean(block.is_error);
      }
    } else if (ev.type === "result") {
      out.finalMessage = typeof ev.result === "string" ? ev.result : "";
      out.permissionDenials = (ev.permission_denials ?? []).map((d) => ({ tool: d.tool_name, input: d.tool_input }));
      out.meta.costUsd = ev.total_cost_usd;
      out.meta.turns = ev.num_turns;
      if (ev.is_error || (ev.subtype && ev.subtype !== "success")) out.errors.push(`result: ${ev.subtype ?? "error"}`);
    }
  }
  if (!out.finalMessage) out.finalMessage = lastAssistantText;
  return out;
}

export function parseCodex(text) {
  const { events, parseErrors } = jsonLines(text);
  const out = { commands: [], toolCalls: [], finalMessage: "", permissionDenials: [], errors: [], meta: {}, parseErrors, events: events.length };
  const items = new Map(); // id -> latest version of the item, in first-seen order
  for (const ev of events) {
    if (ev.type?.startsWith("item.") && ev.item?.id) items.set(ev.item.id, ev.item);
    else if (ev.type === "turn.failed") out.errors.push(`turn.failed: ${ev.error?.message ?? ""}`);
    else if (ev.type === "error") out.errors.push(`error: ${ev.message ?? ""}`);
    else if (ev.type === "thread.started") out.meta.threadId = ev.thread_id;
    else if (ev.type === "turn.completed") out.meta.usage = ev.usage;
  }
  for (const item of items.values()) {
    if (item.type === "command_execution" && typeof item.command === "string") {
      out.commands.push(item.command);
      out.toolCalls.push({ id: item.id, name: "shell", server: null, tool: "shell", input: { command: item.command }, resultText: item.aggregated_output ?? "", isError: item.exit_code != null && item.exit_code !== 0 });
    } else if (item.type === "mcp_tool_call") {
      const resultText = [textOf(item.result?.content), item.error?.message ?? ""].filter(Boolean).join("\n");
      out.toolCalls.push({ id: item.id, name: `mcp__${item.server}__${item.tool}`, server: item.server, tool: item.tool, input: item.arguments ?? {}, resultText, isError: item.status === "failed" || Boolean(item.error) });
    } else if (item.type === "agent_message" && item.text) {
      out.finalMessage = item.text;
    } else if (item.type === "error") {
      out.errors.push(`error item: ${item.message ?? ""}`);
    }
  }
  return out;
}

export const parseTranscript = (cell, text) => (cell === "codex" ? parseCodex(text) : parseClaudeCode(text));
