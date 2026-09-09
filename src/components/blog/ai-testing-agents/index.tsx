import React from "react";
import s from "./styles.module.css";

/* ------------------------------------------------------------------ */
/* Small building blocks                                               */
/* ------------------------------------------------------------------ */

type Verdict = "yes" | "partial" | "no";

const ICON: Record<Verdict, { glyph: string; cls: string; label: string }> = {
  yes: { glyph: "✓", cls: s.iconYes, label: "Yes" },
  partial: { glyph: "~", cls: s.iconPartial, label: "Partial" },
  no: { glyph: "✕", cls: s.iconNo, label: "No" },
};

function Icon({ v }: { v: Verdict }) {
  const i = ICON[v];
  return (
    <span className={`${s.icon} ${i.cls}`} aria-label={i.label} title={i.label}>
      {i.glyph}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Updated badge                                                        */
/* ------------------------------------------------------------------ */

export function UpdatedBadge({
  updated,
  original,
}: {
  updated: string;
  original: string;
}) {
  return (
    <div className={s.badge}>
      <span className={s.dot} />
      <span>Updated {updated}</span>
      <span className={s.muted}>· originally published {original}</span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Stat tiles                                                           */
/* ------------------------------------------------------------------ */

export function StatTiles({
  items,
}: {
  items: { value: string; label: string; source: string; href?: string }[];
}) {
  return (
    <div className={s.stats}>
      {items.map((it) => (
        <div className={s.stat} key={it.label}>
          <div className={s.statValue}>{it.value}</div>
          <div className={s.statLabel}>{it.label}</div>
          <div className={s.statSource}>
            {it.href ? (
              <a href={it.href} target="_blank" rel="noopener">
                {it.source}
              </a>
            ) : (
              it.source
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Timeline                                                             */
/* ------------------------------------------------------------------ */

type TlKind = "funding" | "exit" | "product";

export function Timeline({
  items,
}: {
  items: { when: string; title: string; note?: string; kind: TlKind; href?: string }[];
}) {
  const cls: Record<TlKind, string> = {
    funding: s.tlFunding,
    exit: s.tlExit,
    product: s.tlProduct,
  };
  const tag: Record<TlKind, string> = {
    funding: "funding",
    exit: "exit / shutdown",
    product: "product",
  };
  return (
    <ol className={s.timeline}>
      {items.map((it) => (
        <li className={`${s.tlItem} ${cls[it.kind]}`} key={it.when + it.title}>
          <span className={s.tlDot} />
          <div className={s.tlWhen}>
            <time>{it.when}</time>
          </div>
          <div className={s.tlTitle}>
            {it.href ? (
              <a href={it.href} target="_blank" rel="noopener">
                {it.title}
              </a>
            ) : (
              it.title
            )}
            <span className={s.tlTag}>{tag[it.kind]}</span>
          </div>
          {it.note && <div className={s.tlNote}>{it.note}</div>}
        </li>
      ))}
    </ol>
  );
}

/* ------------------------------------------------------------------ */
/* Agent loop schema (SVG)                                              */
/* ------------------------------------------------------------------ */

const T = {
  text: "var(--ifm-font-color-base)",
  muted: "var(--ifm-color-emphasis-600)",
  line: "var(--ifm-color-emphasis-400)",
  primary: "var(--ifm-color-primary)",
  surface: "var(--ifm-background-color)",
  ok: "var(--ifm-color-success)",
  warn: "var(--ifm-color-warning)",
};

export function AgentLoop() {
  const steps = [
    { k: "Explore", d: "crawl the app, derive user flows" },
    { k: "Generate", d: "emit runnable tests (code or intent)" },
    { k: "Execute", d: "real browser, local or CI" },
    { k: "Verify", d: "functional + visual assertions" },
    { k: "Heal", d: "re-resolve drift, open a PR" },
  ];
  const w = 900;
  const boxW = 150;
  const gap = (w - 5 * boxW) / 4;
  return (
    <figure className={s.figure}>
      <div className={s.loopList}>
        {steps.map((st) => (
          <div className={s.loopStep} key={st.k}>
            <strong>{st.k}</strong>
            <span>{st.d}</span>
          </div>
        ))}
        <div className={s.loopGate}>Human gate: strategy, acceptance criteria, "is this correct?"</div>
      </div>
      <svg className={s.loopSvg} viewBox={`0 0 ${w} 250`} role="img" aria-label="Anatomy of an AI testing agent: explore, generate, execute, verify, heal, with a human review gate">
        <defs>
          <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill={T.line} />
          </marker>
        </defs>
        {steps.map((st, i) => {
          const x = i * (boxW + gap);
          return (
            <g key={st.k}>
              <rect x={x} y={60} width={boxW} height={78} rx={12} fill={T.surface} stroke={T.primary} strokeWidth={2} />
              <text x={x + boxW / 2} y={90} textAnchor="middle" fontSize={17} fontWeight={800} fill={T.text}>
                {st.k}
              </text>
              <foreignObject x={x + 8} y={98} width={boxW - 16} height={40}>
                <div style={{ fontSize: 11.5, lineHeight: 1.25, color: "var(--ifm-color-emphasis-700)", textAlign: "center", fontFamily: "inherit" }}>
                  {st.d}
                </div>
              </foreignObject>
              {i < steps.length - 1 && (
                <line x1={x + boxW + 4} y1={99} x2={x + boxW + gap - 4} y2={99} stroke={T.line} strokeWidth={2} markerEnd="url(#arr)" />
              )}
            </g>
          );
        })}
        {/* loop back from Heal to Execute */}
        <path d={`M ${4 * (boxW + gap) + boxW / 2} 138 V 178 H ${2 * (boxW + gap) + boxW / 2} V 142`} fill="none" stroke={T.line} strokeWidth={2} strokeDasharray="6 5" markerEnd="url(#arr)" />
        <text x={3 * (boxW + gap) + boxW / 2} y={172} textAnchor="middle" fontSize={12} fill={T.muted}>
          re-run after healing
        </text>
        {/* human gate */}
        <rect x={w / 2 - 250} y={200} width={500} height={38} rx={19} fill={T.surface} stroke={T.warn} strokeWidth={2} />
        <text x={w / 2} y={224} textAnchor="middle" fontSize={14} fontWeight={700} fill={T.text}>
          Human gate: strategy, acceptance criteria, "is this correct?"
        </text>
        <line x1={w / 2} y1={178} x2={w / 2} y2={196} stroke={T.warn} strokeWidth={2} markerEnd="url(#arr)" />
        {/* top label */}
        <text x={0} y={30} fontSize={13} fontWeight={700} fill={T.muted} letterSpacing="0.06em">
          THE AGENT LOOP (AUTOMATED)
        </text>
        <text x={w} y={30} textAnchor="end" fontSize={13} fontWeight={700} fill={T.muted} letterSpacing="0.06em">
          ↓ HUMAN GATE (NOT AUTOMATED)
        </text>
      </svg>
      <figcaption className={s.figCaption}>
        Anatomy of an AI testing agent. The loop is automated; the judgement gate is not.
      </figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* Tool matrix                                                          */
/* ------------------------------------------------------------------ */

type Cell = { v: Verdict; note?: string };

export function ToolMatrix({
  tools,
  rows,
}: {
  tools: { name: string; sub: string }[];
  rows: { label: string; cells: Cell[] }[];
}) {
  return (
    <div className={s.matrixWrap}>
      <table className={s.matrix}>
        <thead>
          <tr>
            <th scope="col">Capability</th>
            {tools.map((t) => (
              <th key={t.name} scope="col">
                <div className={s.matrixHead}>
                  <span>{t.name}</span>
                  <small>{t.sub}</small>
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label}>
              <th scope="row">{r.label}</th>
              {r.cells.map((c, i) => (
                <td key={i}>
                  <span className={s.cell}>
                    <Icon v={c.v} />
                    {c.note && <span className={s.cellNote}>{c.note}</span>}
                  </span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className={s.legend}>
        <span><Icon v="yes" /> yes</span>
        <span><Icon v="partial" /> partial / with caveats</span>
        <span><Icon v="no" /> no</span>
        <span>
          "Yes" = documented, shipped feature; "partial" = exists with the caveat noted; "no" = not offered. Checked against each vendor's docs and pricing pages, August 2026.
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Tool cards                                                           */
/* ------------------------------------------------------------------ */

export function ToolCards({
  items,
}: {
  items: { name: string; kind: string; line: string; price: string }[];
}) {
  return (
    <div className={s.cards}>
      {items.map((it) => (
        <div className={s.card} key={it.name}>
          <div className={s.cardKind}>{it.kind}</div>
          <div className={s.cardName}>{it.name}</div>
          <div className={s.cardLine}>{it.line}</div>
          <div className={s.cardPrice}>{it.price}</div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Fit panel                                                            */
/* ------------------------------------------------------------------ */

export function Fit({
  best,
  notFor,
  bestLabel = "Best for",
  notForLabel = "Not for",
}: {
  best: string;
  notFor: string;
  bestLabel?: string;
  notForLabel?: string;
}) {
  return (
    <div className={s.fit}>
      <div className={`${s.fitBox} ${s.fitYes}`}>
        <strong>{bestLabel}</strong>
        {best}
      </div>
      <div className={`${s.fitBox} ${s.fitNo}`}>
        <strong>{notForLabel}</strong>
        {notFor}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Decision rows                                                        */
/* ------------------------------------------------------------------ */

export function Decide({
  rows,
}: {
  rows: { q: string; a: string; href?: string; note?: string }[];
}) {
  return (
    <div className={s.decide}>
      {rows.map((r) => (
        <div className={s.decideRow} key={r.q}>
          <div className={s.decideQ}>
            {r.q}
            {r.note && <div className={s.decideNote}>{r.note}</div>}
          </div>
          {r.href ? (
            <a className={s.decideA} href={r.href}>
              → {r.a}
            </a>
          ) : (
            <span className={s.decideA}>→ {r.a}</span>
          )}
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Trend cards                                                          */
/* ------------------------------------------------------------------ */

export function Trends({ items }: { items: { title: string; text: string }[] }) {
  return (
    <div className={s.trends}>
      {items.map((it) => (
        <div className={s.trend} key={it.title}>
          <div className={s.trendTitle}>{it.title}</div>
          <div>{it.text}</div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Verdict                                                              */
/* ------------------------------------------------------------------ */

export function Verdict({ real, buzz }: { real: string; buzz: string }) {
  return (
    <div className={s.verdict}>
      <div className={`${s.verdictBox} ${s.verdictReal}`}>
        <strong>The reality</strong>
        {real}
      </div>
      <div className={`${s.verdictBox} ${s.verdictBuzz}`}>
        <strong>The buzz</strong>
        {buzz}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Takeaway (one-line section lead)                                     */
/* ------------------------------------------------------------------ */

export function Takeaway({ children, label = "In short" }: { children: React.ReactNode; label?: string }) {
  return (
    <div className={s.takeaway}>
      <span className={s.takeawayLabel}>{label}</span>
      <div>{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Cycle: perceive, reason, act, evaluate (SVG, list fallback)          */
/* ------------------------------------------------------------------ */

export function Cycle() {
  const bw = 250;
  const bh = 84;
  const stages = [
    { k: "Perceive", d: "read the DOM, the last run, kept state", x: 30, y: 30 },
    { k: "Reason", d: "plan the next action with the model", x: 620, y: 30 },
    { k: "Act", d: "run it: Playwright, API client, CLI", x: 620, y: 226 },
    { k: "Evaluate", d: "compare with the expectation, write down what was learned", x: 30, y: 226 },
  ];
  const flows = [
    { d: "M 286 72 H 614", label: "current state", lx: 450, ly: 60, anchor: "middle" as const },
    { d: "M 745 120 V 220", label: "chosen action", lx: 760, ly: 174, anchor: "start" as const },
    { d: "M 614 268 H 286", label: "observed outcome", lx: 450, ly: 292, anchor: "middle" as const },
    { d: "M 155 220 V 120", label: "what it learned", lx: 140, ly: 174, anchor: "end" as const },
  ];
  return (
    <figure className={`${s.figure} ${s.figurePlain}`}>
      <div className={s.cycleList}>
        {stages.map((st, i) => (
          <div className={s.cycleStep} key={st.k}>
            <span className={s.cycleN}>{i + 1}</span>
            <div>
              <strong>{st.k}</strong>
              <span>{st.d}</span>
            </div>
          </div>
        ))}
      </div>
      <svg className={s.cycleSvg} viewBox="0 0 900 340" role="img" aria-label="The agentic testing loop: perceive, reason, act, evaluate, and back to perceive">
        <defs>
          <marker id="arr2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill={T.line} />
          </marker>
        </defs>
        {flows.map((f) => (
          <g key={f.label}>
            <path d={f.d} fill="none" stroke={T.line} strokeWidth={2} markerEnd="url(#arr2)" />
            <text x={f.lx} y={f.ly} textAnchor={f.anchor} fontSize={12} fill={T.muted}>
              {f.label}
            </text>
          </g>
        ))}
        {stages.map((st, i) => (
          <g key={st.k}>
            <rect x={st.x} y={st.y} width={bw} height={bh} rx={12} fill={T.surface} stroke={T.primary} strokeWidth={2} />
            <circle cx={st.x + 20} cy={st.y + 20} r={12} fill={T.primary} />
            <text x={st.x + 20} y={st.y + 24.5} textAnchor="middle" fontSize={12} fontWeight={800} fill="var(--ifm-background-surface-color)">
              {i + 1}
            </text>
            <text x={st.x + bw / 2} y={st.y + 40} textAnchor="middle" fontSize={18} fontWeight={800} fill={T.text}>
              {st.k}
            </text>
            <foreignObject x={st.x + 12} y={st.y + 48} width={bw - 24} height={32}>
              <div style={{ fontSize: 11.5, lineHeight: 1.25, color: "var(--ifm-color-emphasis-700)", textAlign: "center", fontFamily: "inherit" }}>
                {st.d}
              </div>
            </foreignObject>
          </g>
        ))}
        <text x={450} y={162} textAnchor="middle" fontSize={13} fontWeight={800} fill={T.muted} letterSpacing="0.08em">
          CLOSED LOOP
        </text>
        <text x={450} y={184} textAnchor="middle" fontSize={12} fill={T.muted}>
          what run N evaluates, run N+1 perceives
        </text>
      </svg>
      <figcaption className={s.figCaption}>
        The four stages of an agentic testing loop. Take away Evaluate and it stops being a loop.
      </figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* Tiles (small card grid)                                              */
/* ------------------------------------------------------------------ */

export function Tiles({
  items,
  cols = 3,
}: {
  items: { tag?: string; title: string; text: string }[];
  cols?: 2 | 3;
}) {
  return (
    <div className={s.tiles} data-cols={cols}>
      {items.map((it) => (
        <div className={s.tile} key={it.title}>
          {it.tag && <div className={s.tileTag}>{it.tag}</div>}
          <div className={s.tileTitle}>{it.title}</div>
          <div>{it.text}</div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Pairs (two-column comparison rows)                                   */
/* ------------------------------------------------------------------ */

export function Pairs({
  left,
  right,
  rows,
  tone = "contrast",
}: {
  left: string;
  right: string;
  rows: { a: string; b: string }[];
  tone?: "contrast" | "neutral";
}) {
  return (
    <div className={`${s.pairs} ${tone === "contrast" ? s.pairsContrast : ""}`}>
      <div className={s.pairsHead}>
        <span>{left}</span>
        <span>{right}</span>
      </div>
      {rows.map((r, i) => (
        <div className={s.pairRow} key={i}>
          <div className={s.pairA}>
            <span className={s.pairLabel}>{left}</span>
            {r.a}
          </div>
          <div className={s.pairB}>
            <span className={s.pairLabel}>{right}</span>
            {r.b}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Memory tiers                                                         */
/* ------------------------------------------------------------------ */

export function Tiers({
  groups,
}: {
  groups: {
    label: string;
    sub: string;
    tone: "soft" | "strong";
    tiers: { n: number; name: string; scope: string; example: string; lives: string }[];
  }[];
}) {
  return (
    <div className={s.tiers}>
      {groups.map((g) => (
        <div className={`${s.tierGroup} ${g.tone === "strong" ? s.tierStrong : s.tierSoft}`} key={g.label}>
          <div className={s.tierGroupLabel}>
            <strong>{g.label}</strong>
            <span>{g.sub}</span>
          </div>
          <div className={s.tierStack}>
            {g.tiers.map((t) => (
              <div className={s.tier} key={t.n} data-depth={t.n}>
                <span className={s.tierN}>{t.n}</span>
                <div>
                  <div className={s.tierName}>
                    {t.name}
                    <span className={s.tierScope}>{t.scope}</span>
                  </div>
                  <div className={s.tierExample}>{t.example}</div>
                </div>
                <span className={s.tierLives}>{t.lives}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Ladder (adoption rungs, top rung drawn last)                         */
/* ------------------------------------------------------------------ */

export function Ladder({ rungs }: { rungs: { title: string; example: string; note: string }[] }) {
  return (
    <ol className={s.ladder}>
      {rungs.map((r, i) => ({ ...r, i })).reverse().map((r) => (
        <li className={s.rung} key={r.title} data-i={r.i} style={{ "--i": r.i } as React.CSSProperties}>
          <div className={s.rungN}>Rung {r.i + 1}</div>
          <div className={s.rungTitle}>{r.title}</div>
          <div className={s.rungExample}>{r.example}</div>
          <div className={s.rungNote}>{r.note}</div>
        </li>
      ))}
    </ol>
  );
}

/* ------------------------------------------------------------------ */
/* Gates (numbered requirement rows)                                    */
/* ------------------------------------------------------------------ */

export function Gates({ items }: { items: { title: string; text: string }[] }) {
  return (
    <ol className={s.gates}>
      {items.map((it, i) => (
        <li className={s.gate} key={it.title}>
          <span className={s.gateN}>{i + 1}</span>
          <div>
            <div className={s.gateTitle}>{it.title}</div>
            <div className={s.gateText}>{it.text}</div>
          </div>
        </li>
      ))}
    </ol>
  );
}

/* ------------------------------------------------------------------ */
/* Milestones (regulatory dates)                                        */
/* ------------------------------------------------------------------ */

type MsStatus = "done" | "next" | "moved";

export function Milestones({
  items,
}: {
  items: { when: string; title: string; note?: string; status: MsStatus }[];
}) {
  const cls: Record<MsStatus, string> = { done: s.msDone, next: s.msNext, moved: s.msMoved };
  return (
    <div className={s.msWrap}>
      <ol className={s.ms}>
        {items.map((it) => (
          <li className={`${s.msItem} ${cls[it.status]}`} key={it.when}>
            <span className={s.msDot} />
            <div className={s.msWhen}>
              <time>{it.when}</time>
            </div>
            <div className={s.msTitle}>{it.title}</div>
            {it.note && <div className={s.msNote}>{it.note}</div>}
          </li>
        ))}
      </ol>
      <div className={s.msLegend}>
        <span>
          <i className={`${s.msKey} ${s.msDone}`} /> in force
        </span>
        <span>
          <i className={`${s.msKey} ${s.msNext}`} /> upcoming
        </span>
        <span>
          <i className={`${s.msKey} ${s.msMoved}`} /> moved by the July 2026 Omnibus
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Checklist (grouped, continuously numbered)                           */
/* ------------------------------------------------------------------ */

export function Checklist({
  groups,
}: {
  groups: { title: string; sub: string; items: { q: string; good: string }[] }[];
}) {
  let n = 0;
  return (
    <div className={s.checklist}>
      {groups.map((g) => (
        <section className={s.clGroup} key={g.title}>
          <header className={s.clHead}>
            <strong>{g.title}</strong>
            <span>{g.sub}</span>
          </header>
          <ol className={s.clList}>
            {g.items.map((it) => {
              n += 1;
              return (
                <li className={s.clItem} key={it.q}>
                  <span className={s.clN}>{n}</span>
                  <div>
                    <div className={s.clQ}>{it.q}</div>
                    <div className={s.clGood}>
                      <span>Good answer</span>
                      {it.good}
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </section>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Objections (claim and rebuttal)                                      */
/* ------------------------------------------------------------------ */

export function Objections({ items }: { items: { claim: string; answer: string }[] }) {
  return (
    <div className={s.objections}>
      {items.map((it) => (
        <div className={s.objection} key={it.claim}>
          <div className={s.objClaim}>
            <span>The objection</span>
            {"“"}
            {it.claim}
            {"”"}
          </div>
          <div className={s.objAnswer}>{it.answer}</div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Myth card (claim, verdict, one-line why)                             */
/* ------------------------------------------------------------------ */

export function Myth({ n, claim, verdict, why }: { n: number; claim: string; verdict: string; why: string }) {
  return (
    <div className={s.myth}>
      <div className={s.mythHead}>
        <span className={s.mythN}>Myth {n}</span>
        <span className={s.mythVerdict}>{verdict}</span>
      </div>
      <div className={s.mythClaim}>
        {"“"}
        {claim}
        {"”"}
      </div>
      <div className={s.mythWhy}>{why}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Bars (horizontal, one value per row)                                 */
/* ------------------------------------------------------------------ */

type BarTone = "primary" | "muted" | "warn" | "ok";

export function Bars({
  items,
  max = 100,
  unit = "%",
  caption,
}: {
  items: { label: string; value: number; note?: string; tone?: BarTone }[];
  max?: number;
  unit?: string;
  caption?: string;
}) {
  return (
    <figure className={`${s.figure} ${s.figurePlain}`}>
      <div className={s.bars}>
        {items.map((it) => (
          <div className={s.bar} key={it.label} data-tone={it.tone ?? "primary"}>
            <div className={s.barLabel}>
              {it.label}
              {it.note && <span className={s.barNote}>{it.note}</span>}
            </div>
            <div className={s.barTrack}>
              <div className={s.barFill} style={{ width: `${Math.min(100, (it.value / max) * 100)}%` }} />
            </div>
            <div className={s.barValue}>
              {it.value}
              {unit}
            </div>
          </div>
        ))}
        {unit === "%" && max === 100 && (
          <div className={s.barAxis} aria-hidden="true">
            <span />
            <span>
              <span>0</span>
              <span>100%</span>
            </span>
            <span />
          </div>
        )}
      </div>
      {caption && <figcaption className={s.figCaption}>{caption}</figcaption>}
    </figure>
  );
}
