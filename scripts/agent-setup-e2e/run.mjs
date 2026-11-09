#!/usr/bin/env node
// End-to-end check of https://wopee.io/agent-setup/prompt.md in a headless coding agent.
// Runs the agent twice in a throwaway HOME against an empty git repo: run 1 sets Wopee.io
// up, run 2 (same line, MCP server now loaded) verifies and must change nothing. Then it
// asserts the checks in lib/checks.mjs and writes redacted transcripts, result.json and a
// Markdown summary. Workflow: .github/workflows/agent-setup-nightly.yml.
//
//   node scripts/agent-setup-e2e/run.mjs --cell claude-code|codex [--out DIR] [--dry-run]
//
// Environment:
//   AGENT_SETUP_PROMPT_URL     prompt to test (default https://wopee.io/agent-setup/prompt.md)
//   AGENT_SETUP_EXPECT_FILE    wait until the URL serves exactly this file (after a deploy)
//   AGENT_SETUP_WAIT_SECONDS   how long to wait for that (default 1200)
//   AGENT_VERSION              npm version or dist-tag of the agent CLI (default latest)
//   AGENT_BIN                  use this agent binary instead of installing one from npm
//   AGENT_RUN_TIMEOUT_SECONDS  per agent run (default 900)
//   WOPEE_API_KEY, WOPEE_PROJECT_UUID, WOPEE_API_URL (optional)   the CI project
//   ANTHROPIC_API_KEY (claude-code), CODEX_API_KEY or OPENAI_API_KEY (codex)

import { spawn, spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseTranscript } from "./lib/transcript.mjs";
import {
  checkConfig,
  checkForbiddenCommands,
  checkIdempotent,
  checkInventoryCall,
  checkNoDispatch,
  checkNoSecretLeak,
  checkReportListsFiles,
  checkRunsCompleted,
  clientConfigFiles,
  diffSnapshots,
  redact,
  summaryMarkdown,
  wopeeFingerprint,
} from "./lib/checks.mjs";

const DEFAULT_PROMPT_URL = "https://wopee.io/agent-setup/prompt.md";
const END_MARKER = "END OF WOPEE AGENT SETUP";
const CELLS = {
  "claude-code": { pkg: "@anthropic-ai/claude-code", bin: "claude" },
  codex: { pkg: "@openai/codex", bin: "codex" },
};

// The copy line from the website, plus the one sentence that makes a headless run possible.
// The test sentence lives only here, never in prompt.md.
export function buildPrompt(promptUrl, apiUrl) {
  let line = `Set me up for Wopee.io: follow ${promptUrl}, show me the plan first, and ask before changing anything.`;
  line += " This is a non-interactive test: treat the plan as approved.";
  // A dedicated instance (the CI project lives on dev) is something a user would say too.
  if (apiUrl) line += " My Wopee.io project is on a dedicated instance; its API URL is in the WOPEE_API_URL environment variable.";
  return line;
}

export function claudeArgs(prompt, promptUrl) {
  const host = new URL(promptUrl).hostname;
  const allowed = [
    "WebFetch(domain:wopee.io)",
    "WebFetch(domain:docs.wopee.io)",
    ...(host !== "wopee.io" && host !== "docs.wopee.io" ? [`WebFetch(domain:${host})`] : []),
    `Bash(curl -fsSL ${promptUrl})`,
    "Bash(node --version)",
    "Bash(npx --version)",
    "Bash(npm view wopee-mcp *)",
    "Bash(git rev-parse *)",
    "Bash(git check-ignore *)",
    "Bash(claude mcp *)",
    // Read-only Wopee.io tools only. Starting a run or an analysis needs the user's yes,
    // which a headless run cannot give: an attempt is denied and fails the no-dispatch check.
    "mcp__wopee__wopee_fetch_*",
  ];
  return ["-p", prompt, "--allowedTools", ...allowed, "--permission-mode", "acceptEdits", "--output-format", "stream-json", "--verbose", "--max-budget-usd", "5"];
}

export function codexArgs(prompt, home, lastMessageFile) {
  return [
    "exec",
    "--json",
    "--sandbox",
    "workspace-write",
    // Network is off in workspace-write by default; the agent needs wopee.io and npm.
    "-c",
    "sandbox_workspace_write.network_access=true",
    // The prompt tells Codex to write ~/.codex/config.toml, which is outside the workspace.
    // TODO(backlog#5046): confirm on a live run that --add-dir makes the CODEX_HOME root
    // writable (the sandbox protects `<writable_root>/.codex`, not the root itself).
    "--add-dir",
    path.join(home, ".codex"),
    "-o",
    lastMessageFile,
    prompt,
  ];
}

const sha = (buf) => createHash("sha256").update(buf).digest("hex");

function walk(dir, { skip = () => false } = {}) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (skip(full, entry)) continue;
    if (entry.isDirectory()) out.push(...walk(full, { skip }));
    else if (entry.isFile()) out.push(full);
  }
  return out;
}

function readConfigFiles(cell, dirs) {
  return clientConfigFiles(cell).map((f) => {
    const full = path.join(f.base === "home" ? dirs.home : dirs.project, f.rel);
    return { ...f, full, text: fs.existsSync(full) ? fs.readFileSync(full, "utf8") : null };
  });
}

// label -> hash. Project files by content (except .git). User-level client files by their
// wopee entries only, because the client rewrites its own state there on every start.
function snapshot(cell, dirs) {
  const snap = {};
  const skip = (full, entry) => entry.isDirectory() && entry.name === ".git" && path.dirname(full) === dirs.project;
  for (const file of walk(dirs.project, { skip })) snap[path.relative(dirs.project, file)] = sha(fs.readFileSync(file));
  for (const f of readConfigFiles(cell, dirs)) if (f.base === "home" && f.text != null) snap[f.label] = sha(wopeeFingerprint(f));
  return snap;
}

async function fetchPrompt(url) {
  const bust = new URL(url);
  bust.searchParams.set("e2e", Date.now().toString());
  const res = await fetch(bust, { redirect: "follow", headers: { "cache-control": "no-cache" } });
  return { status: res.status, body: await res.text() };
}

async function preflight(url, expectFile, waitSeconds) {
  const name = "The prompt is served in full";
  const expected = expectFile && fs.existsSync(expectFile) ? fs.readFileSync(expectFile, "utf8").trim() : null;
  const deadline = Date.now() + waitSeconds * 1000;
  let last;
  for (;;) {
    try {
      last = await fetchPrompt(url);
    } catch (e) {
      last = { status: 0, body: "", error: e.message };
    }
    // Without an expected file there is no deploy to wait for: one fetch decides.
    if (expected == null || (last.status === 200 && last.body.trim() === expected) || Date.now() > deadline) break;
    console.log(`waiting for ${url} to serve ${expectFile ?? "the prompt"} (HTTP ${last.status})`);
    await new Promise((r) => setTimeout(r, 20000));
  }
  const version = /^version:\s*(.+)$/m.exec(last.body)?.[1]?.trim();
  const problems = [];
  if (last.status !== 200) problems.push(`HTTP ${last.status}${last.error ? ` (${last.error})` : ""}`);
  else {
    if (!last.body.includes(END_MARKER)) problems.push(`no "${END_MARKER}" line, the file is cut or not the prompt`);
    if (expected != null && last.body.trim() !== expected) problems.push(`still serves an older version than ${expectFile} after ${waitSeconds}s`);
  }
  return {
    check: { id: "prompt-served", name, ok: problems.length === 0, detail: problems.length ? `${url}: ${problems.join("; ")}` : `${url}: ${last.body.length} bytes${version ? `, version ${version}` : ""}` },
    version,
  };
}

function runAgent(bin, args, { cwd, env, stdoutFile, stderrFile, timeoutSeconds }) {
  return new Promise((resolve) => {
    const out = fs.openSync(stdoutFile, "w");
    const err = fs.openSync(stderrFile, "w");
    const child = spawn(bin, args, { cwd, env, stdio: ["ignore", out, err] });
    let timedOut = false;
    const timer = setTimeout(() => {
      timedOut = true;
      child.kill("SIGTERM");
      setTimeout(() => child.exitCode == null && child.kill("SIGKILL"), 10000).unref();
    }, timeoutSeconds * 1000);
    child.on("close", (code) => {
      clearTimeout(timer);
      fs.closeSync(out);
      fs.closeSync(err);
      resolve({ exitCode: code, timedOut });
    });
    child.on("error", (e) => {
      clearTimeout(timer);
      fs.appendFileSync(stderrFile, `spawn error: ${e.message}\n`);
    });
  });
}

function parseArgs(argv) {
  const opts = { dryRun: false };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--cell") opts.cell = argv[++i];
    else if (argv[i] === "--out") opts.out = argv[++i];
    else if (argv[i] === "--dry-run") opts.dryRun = true;
    else throw new Error(`unknown argument ${argv[i]}`);
  }
  if (!CELLS[opts.cell]) throw new Error(`--cell must be one of ${Object.keys(CELLS).join(", ")}`);
  return opts;
}

async function main() {
  const opts = parseArgs(process.argv.slice(2));
  const { cell, dryRun } = opts;
  const env = process.env;
  const promptUrl = env.AGENT_SETUP_PROMPT_URL || DEFAULT_PROMPT_URL;
  const apiUrl = (env.WOPEE_API_URL || "").trim();
  const agentKeyName = cell === "codex" ? "CODEX_API_KEY" : "ANTHROPIC_API_KEY";
  const agentKey = cell === "codex" ? env.CODEX_API_KEY || env.OPENAI_API_KEY : env.ANTHROPIC_API_KEY;
  const secrets = { WOPEE_API_KEY: env.WOPEE_API_KEY, [agentKeyName]: agentKey };

  const missing = ["WOPEE_API_KEY", "WOPEE_PROJECT_UUID"].filter((k) => !env[k]);
  if (!agentKey) missing.push(cell === "codex" ? "CODEX_API_KEY or OPENAI_API_KEY" : "ANTHROPIC_API_KEY");
  if (missing.length && !dryRun) {
    console.error(`missing ${missing.join(", ")}`);
    process.exit(2);
  }

  const root = fs.mkdtempSync(path.join(os.tmpdir(), `agent-setup-e2e-${cell}-`));
  const dirs = { root, home: path.join(root, "home"), project: path.join(root, "project"), tools: path.join(root, "tools") };
  const outDir = path.resolve(opts.out || path.join(root, "out"));
  for (const d of [dirs.home, dirs.project, dirs.tools, outDir]) fs.mkdirSync(d, { recursive: true });
  if (cell === "codex") fs.mkdirSync(path.join(dirs.home, ".codex"), { recursive: true });

  // The user's project: an empty git repo with one commit, so `git rev-parse` finds a root.
  const gitEnv = { ...env, HOME: dirs.home, GIT_CONFIG_NOSYSTEM: "1" };
  const git = (...args) => spawnSync("git", ["-c", "user.name=agent-setup-e2e", "-c", "user.email=agent-setup-e2e@example.invalid", ...args], { cwd: dirs.project, env: gitEnv, stdio: "inherit" });
  git("init", "-q", "-b", "main");
  fs.writeFileSync(path.join(dirs.project, "README.md"), "# Demo web app\n");
  git("add", "README.md");
  git("commit", "-q", "-m", "init");

  const { check: promptCheck, version: promptVersion } = await preflight(promptUrl, env.AGENT_SETUP_EXPECT_FILE, Number(env.AGENT_SETUP_WAIT_SECONDS || 1200));
  console.log(`${promptCheck.ok ? "ok" : "FAIL"}: ${promptCheck.detail}`);

  const binPath = env.AGENT_BIN ? path.resolve(env.AGENT_BIN) : path.join(dirs.tools, "node_modules", ".bin", CELLS[cell].bin);
  const agentEnv = {
    PATH: [path.join(dirs.tools, "node_modules", ".bin"), path.dirname(process.execPath), "/usr/local/bin", "/usr/bin", "/bin"].join(path.delimiter),
    HOME: dirs.home,
    XDG_CONFIG_HOME: path.join(dirs.home, ".config"),
    LANG: "C.UTF-8",
    TERM: "dumb",
    DISABLE_AUTOUPDATER: "1",
    WOPEE_API_KEY: env.WOPEE_API_KEY || "dry-run-wopee-key",
    WOPEE_PROJECT_UUID: env.WOPEE_PROJECT_UUID || "00000000-0000-0000-0000-000000000000",
    ...(apiUrl ? { WOPEE_API_URL: apiUrl } : {}),
    [agentKeyName]: agentKey || "dry-run-agent-key",
  };
  const prompt = buildPrompt(promptUrl, apiUrl);
  const argsFor = (n) => (cell === "codex" ? codexArgs(prompt, dirs.home, path.join(root, `run${n}.last-message.txt`)) : claudeArgs(prompt, promptUrl));

  if (dryRun) {
    const installCmd = `npm install --prefix ${dirs.tools} ${CELLS[cell].pkg}@${env.AGENT_VERSION || "latest"}`;
    console.log(`\nDRY RUN (${cell}): stops before installing and calling the agent.`);
    console.log(`sandbox:  ${root}`);
    console.log(`project:  ${dirs.project} (git repo, ${fs.readdirSync(dirs.project).join(", ")})`);
    console.log(`install:  ${installCmd}`);
    console.log(`env keys: ${Object.keys(agentEnv).join(", ")}`);
    console.log(`command:  ${binPath} ${argsFor(1).map((a) => JSON.stringify(a)).join(" ")}`);
    if (missing.length) console.log(`note:     ${missing.join(", ")} not set; a real run needs them`);
    return;
  }

  const checks = [promptCheck];
  if (!promptCheck.ok) return finish({ cell, outDir, promptUrl, promptVersion, checks, agentVersion: null, secrets });

  if (!env.AGENT_BIN) {
    const install = spawnSync("npm", ["install", "--prefix", dirs.tools, "--no-audit", "--no-fund", "--loglevel=error", `${CELLS[cell].pkg}@${env.AGENT_VERSION || "latest"}`], { stdio: "inherit" });
    if (install.status !== 0) throw new Error(`npm install ${CELLS[cell].pkg} failed`);
  }
  const agentVersion = spawnSync(binPath, ["--version"], { env: agentEnv, encoding: "utf8" }).stdout.trim();
  console.log(`agent: ${CELLS[cell].pkg} ${agentVersion}`);

  const timeoutSeconds = Number(env.AGENT_RUN_TIMEOUT_SECONDS || 900);
  const snaps = [snapshot(cell, dirs)];
  const runs = [];
  for (const n of [1, 2]) {
    const stdoutFile = path.join(root, `run${n}.jsonl`);
    const stderrFile = path.join(root, `run${n}.stderr.txt`);
    console.log(`run ${n}: starting`);
    const r = await runAgent(binPath, argsFor(n), { cwd: dirs.project, env: agentEnv, stdoutFile, stderrFile, timeoutSeconds });
    const raw = fs.readFileSync(stdoutFile, "utf8");
    const parsed = parseTranscript(cell, raw);
    const lastMessageFile = path.join(root, `run${n}.last-message.txt`);
    if (cell === "codex" && fs.existsSync(lastMessageFile)) parsed.finalMessage = fs.readFileSync(lastMessageFile, "utf8") || parsed.finalMessage;
    runs.push({ ...r, parsed, stdoutFile, stderrFile });
    snaps.push(snapshot(cell, dirs));
    console.log(`run ${n}: exit ${r.exitCode}${r.timedOut ? " (timed out)" : ""}, ${parsed.events} events, ${parsed.commands.length} commands`);
  }

  const configFiles = readConfigFiles(cell, dirs);
  const firstRunChanges = diffSnapshots(snaps[0], snaps[1]).changed;

  // Everything the agent could have written the key into: the project (including .git),
  // the client's config, its own session logs, and the raw output of both runs.
  const sessionDirs = [path.join(dirs.home, ".claude", "projects"), path.join(dirs.home, ".codex", "sessions")];
  const leakSources = [
    ...walk(dirs.project).map((f) => ({ label: path.relative(dirs.project, f), text: fs.readFileSync(f, "latin1") })),
    ...configFiles.filter((f) => f.base === "home" && f.text != null).map((f) => ({ label: f.label, text: f.text })),
    ...sessionDirs.flatMap((d) => walk(d).map((f) => ({ label: `~/${path.relative(dirs.home, f)}`, text: fs.readFileSync(f, "utf8") }))),
    ...runs.flatMap((r, n) => [
      { label: `run ${n + 1} transcript`, text: fs.readFileSync(r.stdoutFile, "utf8") },
      { label: `run ${n + 1} stderr`, text: fs.readFileSync(r.stderrFile, "utf8") },
    ]),
  ];

  checks.push(
    checkRunsCompleted(runs),
    checkConfig(configFiles, secrets),
    checkNoSecretLeak(leakSources, secrets),
    checkInventoryCall(runs.map((r) => r.parsed)),
    checkIdempotent(snaps[1], snaps[2]),
    checkForbiddenCommands(runs.flatMap((r) => r.parsed.commands)),
    checkReportListsFiles(runs[0].parsed.finalMessage, firstRunChanges),
    checkNoDispatch(runs.map((r) => r.parsed)),
  );

  for (const [n, r] of runs.entries()) {
    fs.writeFileSync(path.join(outDir, `run${n + 1}.jsonl`), redact(fs.readFileSync(r.stdoutFile, "utf8"), secrets));
    fs.writeFileSync(path.join(outDir, `run${n + 1}.stderr.txt`), redact(fs.readFileSync(r.stderrFile, "utf8"), secrets));
    fs.writeFileSync(path.join(outDir, `run${n + 1}.final-message.md`), redact(r.parsed.finalMessage, secrets));
  }
  for (const f of configFiles) if (f.text != null) fs.writeFileSync(path.join(outDir, `config--${f.label.replace(/[~/]/g, "_")}`), redact(f.text, secrets));
  const meta = { firstRunChanges, permissionDenials: runs.map((r) => r.parsed.permissionDenials), runMeta: runs.map((r) => r.parsed.meta) };
  return finish({ cell, outDir, promptUrl, promptVersion, checks, agentVersion, secrets, meta });
}

function finish({ cell, outDir, promptUrl, promptVersion, checks, agentVersion, secrets, meta = {} }) {
  const passed = checks.every((c) => c.ok);
  const record = { date: new Date().toISOString(), cell, agentVersion, promptUrl, promptVersion, passed, checks, ...meta };
  fs.writeFileSync(path.join(outDir, "result.json"), redact(JSON.stringify(record, null, 2), secrets));
  const summary = redact(summaryMarkdown({ cell, agentVersion, promptUrl, promptVersion, checks }), secrets);
  fs.writeFileSync(path.join(outDir, "summary.md"), summary);
  if (process.env.GITHUB_STEP_SUMMARY) fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, summary + "\n");
  for (const c of checks) {
    const line = `${c.ok ? "pass" : "FAIL"}  ${c.name}: ${c.detail}`;
    console.log(redact(line, secrets));
    if (!c.ok && process.env.GITHUB_ACTIONS) console.log(`::error title=${cell}: ${c.id}::${redact(c.detail, secrets).replace(/\n/g, " ")}`);
  }
  console.log(`\n${cell}: ${passed ? "PASSED" : "FAILED"} (${checks.filter((c) => c.ok).length}/${checks.length} checks). Output: ${outDir}`);
  process.exitCode = passed ? 0 : 1;
}

if (process.argv[1] && fs.realpathSync(path.resolve(process.argv[1])) === fs.realpathSync(fileURLToPath(import.meta.url))) {
  main().catch((e) => {
    console.error(e.stack || e.message);
    process.exit(1);
  });
}
