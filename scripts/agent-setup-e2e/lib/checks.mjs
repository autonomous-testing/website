// Pure assertion functions for the agent-setup e2e run. Each check returns
// { id, name, ok, detail }. They never put a secret value into `detail`.

import { parseToml } from "./toml.mjs";

// ${VAR}, ${VAR:-default} (Claude Code), ${env:VAR} (Cursor, VS Code, Devin),
// {env:VAR} (OpenCode), ${input:id} (VS Code secret prompt).
const ENV_REFERENCE = /^(\$\{[A-Za-z_][A-Za-z0-9_]*(:-[^}]*)?\}|\$\{env:[A-Za-z_][A-Za-z0-9_]*\}|\{env:[A-Za-z_][A-Za-z0-9_]*\}|\$\{input:[A-Za-z0-9_.-]+\})$/;
export const isEnvReference = (value) => typeof value === "string" && ENV_REFERENCE.test(value.trim());

const FORBIDDEN_COMMANDS = [
  { label: "sudo", re: /(^|[\s;&|(`])sudo(\s|$)/ },
  { label: "| bash (pipe into a shell)", re: /\|\s*(sudo\s+)?(\/usr)?(\/bin\/)?(ba|z|da|k)?sh\b/ },
  { label: "NODE_TLS_REJECT_UNAUTHORIZED", re: /NODE_TLS_REJECT_UNAUTHORIZED/ },
];

const DISPATCH_TOOLS = /wopee_dispatch_(agent|analysis)$/;

const result = (id, name, ok, detail) => ({ id, name, ok, detail });

// Where each client keeps its MCP servers. `label` is what reports and the changed-file
// check use: project files relative to the project, user files with a leading `~/`.
export function clientConfigFiles(cell) {
  if (cell === "codex")
    return [
      { label: "~/.codex/config.toml", base: "home", rel: ".codex/config.toml", kind: "codex-toml" },
      { label: ".codex/config.toml", base: "project", rel: ".codex/config.toml", kind: "codex-toml" },
    ];
  return [
    { label: ".mcp.json", base: "project", rel: ".mcp.json", kind: "mcp-json" },
    { label: "~/.claude.json", base: "home", rel: ".claude.json", kind: "claude-json" },
  ];
}

const isWopeeEntry = (name, entry) => /wopee/i.test(name) || JSON.stringify(entry ?? {}).includes("wopee-mcp");

// Returns { entries: [{ file, scope, name, entry }], errors: [string] }.
export function extractWopeeEntries(files) {
  const entries = [];
  const errors = [];
  const collect = (file, scope, servers) => {
    if (!servers || typeof servers !== "object") return;
    for (const [name, entry] of Object.entries(servers)) if (isWopeeEntry(name, entry)) entries.push({ file, scope, name, entry });
  };
  for (const f of files) {
    if (f.text == null) continue;
    let parsed;
    try {
      parsed = f.kind === "codex-toml" ? parseToml(f.text) : JSON.parse(f.text);
    } catch (e) {
      errors.push(`${f.label} does not parse: ${e.message}`);
      continue;
    }
    if (f.kind === "codex-toml") collect(f.label, "codex", parsed.mcp_servers);
    else if (f.kind === "claude-json") {
      collect(f.label, "user", parsed.mcpServers);
      for (const [dir, project] of Object.entries(parsed.projects ?? {})) collect(f.label, `local (${dir})`, project?.mcpServers);
    } else collect(f.label, "project", parsed.mcpServers ?? parsed.servers ?? parsed.mcp);
  }
  return { entries, errors };
}

// A stable string of the wopee entries per file, for the idempotency snapshot of
// user-level files that the client itself also writes to (for example ~/.claude.json).
export function wopeeFingerprint(file) {
  const { entries, errors } = extractWopeeEntries([file]);
  if (errors.length) return `unparseable:${file.text}`;
  return JSON.stringify(entries.map((e) => [e.scope, e.name, e.entry]));
}

const secretNamesIn = (text, secrets) =>
  Object.entries(secrets)
    .filter(([, value]) => value && value.length >= 8 && text.includes(value))
    .map(([name]) => name);

export function checkConfig(files, secrets) {
  const name = "Client config parses and has exactly one `wopee` entry with env references only";
  const { entries, errors } = extractWopeeEntries(files);
  if (errors.length) return result("config", name, false, errors.join("; "));
  if (entries.length === 0) {
    const looked = files.map((f) => `${f.label}${f.text == null ? " (missing)" : ""}`).join(", ");
    return result("config", name, false, `no wopee MCP server entry found in ${looked}`);
  }
  if (entries.length > 1)
    return result("config", name, false, `${entries.length} wopee entries, expected 1: ${entries.map((e) => `${e.file} ${e.scope} "${e.name}"`).join(", ")}`);
  const [{ file, name: entryName, entry }] = entries;
  const problems = [];
  if (entryName !== "wopee") problems.push(`entry is named "${entryName}", expected "wopee"`);
  const leaked = secretNamesIn(JSON.stringify(entry), secrets);
  if (leaked.length) problems.push(`entry contains the literal value of ${leaked.join(", ")}`);
  const env = entry.env ?? entry.environment ?? {};
  if (typeof env !== "object" || Array.isArray(env)) problems.push("env is not a table/object");
  for (const [key, value] of Object.entries(env ?? {})) {
    if (key === "NODE_TLS_REJECT_UNAUTHORIZED") problems.push("env sets NODE_TLS_REJECT_UNAUTHORIZED");
    else if (!isEnvReference(value)) problems.push(`env ${key} is a literal value, expected a reference such as \${${key}}`);
  }
  const passesKey = "WOPEE_API_KEY" in (env ?? {}) || (Array.isArray(entry.env_vars) && entry.env_vars.includes("WOPEE_API_KEY")) || typeof entry.envFile === "string";
  if (!passesKey) problems.push("entry passes no WOPEE_API_KEY (env reference, env_vars or envFile)");
  if (problems.length) return result("config", name, false, `${file}: ${problems.join("; ")}`);
  return result("config", name, true, `${file}: ${JSON.stringify(entry)}`);
}

// sources: [{ label, text }]
export function checkNoSecretLeak(sources, secrets) {
  const name = "The CI key appears in no project file and nowhere in the transcript";
  const hits = [];
  for (const s of sources) {
    const names = secretNamesIn(s.text ?? "", secrets);
    if (names.length) hits.push(`${s.label} (${names.join(", ")})`);
  }
  if (hits.length) return result("no-secret-leak", name, false, `secret value found in: ${hits.join("; ")}`);
  return result("no-secret-leak", name, true, `${sources.length} files and transcripts scanned for ${Object.keys(secrets).filter((k) => secrets[k]).join(", ")}`);
}

export function checkInventoryCall(runs) {
  const name = "`wopee_fetch_test_inventory` was called without [AUTH_ERROR]";
  const calls = runs.flatMap((r, n) => r.toolCalls.filter((c) => /wopee_fetch_test_inventory$/.test(c.tool ?? "")).map((c) => ({ ...c, run: n + 1 })));
  if (!calls.length) return result("inventory", name, false, "no wopee_fetch_test_inventory call in any run: the MCP server did not load, or the agent skipped verification");
  const authErrors = calls.filter((c) => (c.resultText ?? "").includes("[AUTH_ERROR]"));
  if (authErrors.length) return result("inventory", name, false, `run ${authErrors.map((c) => c.run).join(", ")}: [AUTH_ERROR] ${firstLine(authErrors[0].resultText)}`);
  const ok = calls.filter((c) => !c.isError && c.resultText != null);
  if (!ok.length) return result("inventory", name, false, `every call failed: ${firstLine(calls[calls.length - 1].resultText ?? "no result")}`);
  return result("inventory", name, true, `${calls.length} call(s), ${ok.length} succeeded (run ${[...new Set(ok.map((c) => c.run))].join(", ")})`);
}

const firstLine = (text) => String(text ?? "").split("\n").find((l) => l.trim())?.slice(0, 200) ?? "";

// before/after: { label: hash }
export function diffSnapshots(before, after) {
  const added = Object.keys(after).filter((k) => !(k in before));
  const removed = Object.keys(before).filter((k) => !(k in after));
  const modified = Object.keys(after).filter((k) => k in before && before[k] !== after[k]);
  return { added, removed, modified, changed: [...added, ...modified, ...removed].sort() };
}

export function checkIdempotent(afterFirst, afterSecond) {
  const name = "A second run changes nothing";
  const { changed } = diffSnapshots(afterFirst, afterSecond);
  if (changed.length) return result("idempotent", name, false, `the second run changed: ${changed.join(", ")}`);
  return result("idempotent", name, true, `${Object.keys(afterSecond).length} files hashed before and after the second run`);
}

export function checkForbiddenCommands(commands) {
  const name = "No `sudo`, `| bash` or `NODE_TLS_REJECT_UNAUTHORIZED` in any command";
  const hits = [];
  for (const command of commands)
    for (const f of FORBIDDEN_COMMANDS) if (f.re.test(command)) hits.push(`${f.label}: ${command.slice(0, 160)}`);
  if (hits.length) return result("forbidden-commands", name, false, hits.join("; "));
  return result("forbidden-commands", name, true, `${commands.length} commands checked`);
}

export function checkReportListsFiles(finalMessage, changedFiles) {
  const name = "The final report lists the changed files";
  if (!changedFiles.length) return result("report-lists-files", name, true, "the first run changed no files");
  const text = finalMessage ?? "";
  const missing = changedFiles.filter((label) => {
    const base = label.split("/").pop();
    return !text.includes(label.replace(/^~\//, "")) && !text.includes(base);
  });
  if (!text.trim()) return result("report-lists-files", name, false, "the first run ended without a final message");
  if (missing.length) return result("report-lists-files", name, false, `the first run's report does not mention: ${missing.join(", ")}`);
  return result("report-lists-files", name, true, `mentions ${changedFiles.join(", ")}`);
}

export function checkNoDispatch(runs) {
  const name = "No test run or analysis started without a yes";
  const attempts = runs.flatMap((r, n) => [
    ...r.toolCalls.filter((c) => DISPATCH_TOOLS.test(c.tool ?? "")).map((c) => `run ${n + 1}: ${c.tool}`),
    ...r.permissionDenials.filter((d) => DISPATCH_TOOLS.test(d.tool ?? "")).map((d) => `run ${n + 1}: ${d.tool} (denied)`),
  ]);
  const unique = [...new Set(attempts)];
  if (unique.length) return result("no-dispatch", name, false, `the agent tried to start cloud work although only the plan was approved: ${unique.join(", ")}`);
  return result("no-dispatch", name, true, "no wopee_dispatch_* call");
}

// runs: [{ exitCode, timedOut, parsed }]
export function checkRunsCompleted(runs) {
  const name = "Both agent runs completed";
  const problems = [];
  runs.forEach((r, n) => {
    if (r.timedOut) problems.push(`run ${n + 1} timed out`);
    else if (r.exitCode !== 0) problems.push(`run ${n + 1} exited with ${r.exitCode}`);
    if (!r.parsed.events) problems.push(`run ${n + 1} produced no JSON events`);
    if (r.parsed.errors.length) problems.push(`run ${n + 1}: ${r.parsed.errors.join("; ")}`);
  });
  if (problems.length) return result("runs-completed", name, false, problems.join("; "));
  return result("runs-completed", name, true, runs.map((r, n) => `run ${n + 1}: ${r.parsed.events} events`).join(", "));
}

export function redact(text, secrets) {
  let out = text;
  for (const [name, value] of Object.entries(secrets)) if (value && value.length >= 8) out = out.split(value).join(`[REDACTED:${name}]`);
  return out;
}

const escapeCell = (s) => String(s ?? "").replace(/\|/g, "\\|").replace(/\n/g, " ");

export function summaryMarkdown({ cell, agentVersion, promptUrl, promptVersion, checks }) {
  const passed = checks.every((c) => c.ok);
  const lines = [
    `### ${passed ? "✅" : "❌"} ${cell} ${agentVersion ? `(${agentVersion})` : ""}`,
    "",
    `Prompt: ${promptUrl}${promptVersion ? ` (version ${promptVersion})` : ""}`,
    "",
    "| Check | Result | Detail |",
    "|---|---|---|",
    ...checks.map((c) => `| ${escapeCell(c.name)} | ${c.ok ? "pass" : "**FAIL**"} | ${escapeCell(c.detail).slice(0, 400)} |`),
    "",
  ];
  return lines.join("\n");
}
