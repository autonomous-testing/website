import React from "react";
import s from "./styles.module.css";

export {
  StatTiles,
  Takeaway,
  Tiles,
  Pairs,
  Ladder,
  Gates,
  Fit,
  Objections,
} from "../ai-testing-agents";

const T = {
  text: "var(--ifm-font-color-base)",
  muted: "var(--ifm-color-emphasis-800)",
  line: "var(--ifm-color-emphasis-600)",
  primary: "var(--ifm-color-primary)",
  surface: "var(--ifm-background-surface-color)",
};

type Step = { title: string; ai: string; human: string; out: string; edge?: string };

export function Loop({ steps, caption }: { steps: Step[]; caption: string }) {
  const bw = 196;
  const bh = 160;
  const gap = 30;
  const x0 = 2;
  const y0 = 24;
  const W = x0 * 2 + steps.length * bw + (steps.length - 1) * gap;
  const H = y0 + bh + 92;
  return (
    <figure className={s.loopFig}>
      <div className={s.loopList}>
        {steps.map((st, i) => (
          <div className={s.loopStep} key={st.title}>
            <span className={s.loopN}>{i + 1}</span>
            <div>
              <strong>{st.title}</strong>
              <span>AI: {st.ai}</span>
              <span>You: {st.human}</span>
              {st.edge && <span>Then: {st.edge}</span>}
              <span>Output: {st.out}</span>
            </div>
          </div>
        ))}
      </div>
      <svg
        className={s.loopSvg}
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label="The four-step loop: validate documentation, derive scenarios, generate tests, report defects; each step has an AI part, a human check and an output that feeds the next step"
      >
        <defs>
          <marker id="loopArr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,0 L10,5 L0,10 z" fill={T.line} />
          </marker>
        </defs>
        {steps.map((st, i) => {
          const x = x0 + i * (bw + gap);
          return (
            <g key={st.title}>
              <rect x={x} y={y0} width={bw} height={bh} rx={12} fill={T.surface} stroke={T.line} strokeWidth={1.5} />
              <circle cx={x + 20} cy={y0 + 20} r={12} fill={T.primary} />
              <text x={x + 20} y={y0 + 24.5} textAnchor="middle" fontSize={12} fontWeight={800} fill={T.surface}>
                {i + 1}
              </text>
              <text x={x + 40} y={y0 + 25} fontSize={14} fontWeight={800} fill={T.text}>
                {st.title}
              </text>
              <foreignObject x={x + 12} y={y0 + 40} width={bw - 24} height={bh - 48}>
                <div style={{ fontSize: 12.5, lineHeight: 1.3, color: T.muted, fontFamily: "inherit" }}>
                  <div style={{ marginBottom: 6 }}>
                    <b style={{ color: T.text }}>AI:</b> {st.ai}
                  </div>
                  <div>
                    <b style={{ color: T.text }}>You:</b> {st.human}
                  </div>
                </div>
              </foreignObject>
              <rect x={x + 4} y={y0 + bh + 18} width={bw - 8} height={30} rx={15} fill={T.surface} stroke={T.line} strokeWidth={1.5} />
              <text x={x + bw / 2} y={y0 + bh + 37} textAnchor="middle" fontSize={11} fontWeight={700} fill={T.text}>
                {st.out}
              </text>
              <path d={`M ${x + bw / 2} ${y0 + bh} V ${y0 + bh + 18}`} stroke={T.line} strokeWidth={1.5} fill="none" />
              {i < steps.length - 1 && (
                <path d={`M ${x + bw} ${y0 + bh / 2} H ${x + bw + gap - 6}`} stroke={T.line} strokeWidth={2} fill="none" markerEnd="url(#loopArr)" />
              )}
              {i < steps.length - 1 && st.edge && (
                <g>
                  <text x={x + bw + gap / 2} y={y0 - 9} textAnchor="middle" fontSize={10.5} fontWeight={700} fill={T.muted}>
                    {st.edge}
                  </text>
                  <path d={`M ${x + bw + gap / 2} ${y0 - 5} V ${y0 + bh / 2 - 8}`} stroke={T.line} strokeWidth={1} strokeDasharray="2 3" fill="none" />
                </g>
              )}
            </g>
          );
        })}
        <path
          d={`M ${x0 + (steps.length - 1) * (bw + gap) + bw / 2} ${y0 + bh + 48} V ${H - 12} H ${x0 + bw / 2} V ${y0 + bh + 50}`}
          stroke={T.line}
          strokeWidth={1.5}
          strokeDasharray="4 4"
          fill="none"
          markerEnd="url(#loopArr)"
        />
      </svg>
      <figcaption className={s.loopCaption}>{caption}</figcaption>
    </figure>
  );
}

export function Terminal({
  cmd,
  out,
  who = "Tester types",
  returns = "Agent returns",
  step,
  lands = [],
}: {
  cmd: string;
  out: string;
  who?: string;
  returns?: string;
  step?: 1 | 2 | 3 | 4;
  lands?: { text: string; kind?: "human" | "plain" }[];
}) {
  return (
    <div className={s.term}>
      <div className={s.termBar}>
        <span className={s.termLabel}>{who}</span>
        <span className={s.termCmd} data-prompt={cmd.startsWith("/") ? "1" : "0"}>
          {cmd}
        </span>
        {step && (
          <span className={s.termSteps} aria-label={`Step ${step} of 4`}>
            {[1, 2, 3, 4].map((n) => (
              <span key={n} data-on={n === step ? "1" : "0"} />
            ))}
          </span>
        )}
      </div>
      <span className={s.termOutLabel}>{returns}</span>
      <pre className={s.termOut}>{out}</pre>
      {lands.length > 0 && (
        <div className={s.termFoot}>
          {lands.map((l) => (
            <span className={s.termChip} data-kind={l.kind || "plain"} key={l.text}>
              {l.text}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
