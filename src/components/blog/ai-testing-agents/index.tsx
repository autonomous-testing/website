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

export function Fit({ best, notFor }: { best: string; notFor: string }) {
  return (
    <div className={s.fit}>
      <div className={`${s.fitBox} ${s.fitYes}`}>
        <strong>Best for</strong>
        {best}
      </div>
      <div className={`${s.fitBox} ${s.fitNo}`}>
        <strong>Not for</strong>
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
