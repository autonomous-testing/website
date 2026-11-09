import React, { useState } from "react";
import clsx from "clsx";
import { Check, Copy } from "lucide-react";

export const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-wopee dark:focus-visible:outline-primary-wopee";

const BUTTON = {
  // DESIGN.md primary button: yellow with ink text in both themes.
  primary:
    "border-primary-wopee bg-primary-wopee px-5 text-base font-bold text-[#111827] hover:border-[#ffd633] hover:bg-[#ffd633]",
  // DESIGN.md secondary button: a neutral outline; the text never changes colour.
  secondary:
    "border-gray-900 bg-transparent px-3 text-sm font-semibold text-gray-900 hover:bg-gray-900/5 dark:border-white/30 dark:text-white dark:hover:border-white dark:hover:bg-white/10",
};

type CopyButtonProps = {
  text: string;
  label: string;
  primary?: boolean;
  id?: string;
  className?: string;
  onCopy?: () => void;
};

/** A copy-to-clipboard button with a "Copied" state announced to screen readers. */
export function CopyButton({ text, label, primary = false, id, className, onCopy }: CopyButtonProps) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  const copy = () => {
    const done = (next: "copied" | "failed") => {
      setState(next);
      setTimeout(() => setState("idle"), next === "copied" ? 1600 : 4000);
    };
    if (!navigator.clipboard) return done("failed");
    navigator.clipboard.writeText(text).then(
      () => {
        done("copied");
        onCopy?.();
      },
      () => done("failed")
    );
  };
  const copied = state === "copied";
  return (
    <>
      <button
        type="button"
        id={id}
        onClick={copy}
        className={clsx(
          "inline-flex min-h-11 cursor-pointer select-none items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border border-solid transition-colors",
          primary ? BUTTON.primary : BUTTON.secondary,
          focusRing,
          className
        )}
      >
        {copied ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
        {copied ? "Copied" : state === "failed" ? "Select and copy the text" : label}
      </button>
      <span className="sr-only" aria-live="polite">
        {copied ? `${label}: copied` : state === "failed" ? "Copying failed. Select the text and copy it yourself." : ""}
      </span>
    </>
  );
}

type CopyPromptProps = {
  /** The text that is shown and copied. */
  text: string;
  buttonLabel?: string;
  /** Small uppercase label above the text. */
  label?: string;
  /** The button is the view's one primary action (yellow); otherwise a neutral outline. */
  primary?: boolean;
  /** "stack" puts the button under the text; "row" puts it beside the text from the sm breakpoint. */
  layout?: "stack" | "row";
  id?: string;
  onCopy?: () => void;
  className?: string;
  /** A line under the text, e.g. links. */
  children?: React.ReactNode;
};

/** A prompt in a mono box with a copy button (the /brand "Prompt to paste" card, shared). */
export default function CopyPrompt({
  text,
  buttonLabel = "Copy prompt",
  label,
  primary = false,
  layout = "stack",
  id,
  onCopy,
  className,
  children,
}: CopyPromptProps) {
  const row = layout === "row";
  return (
    <div className={clsx("flex flex-col gap-4 text-left", className)}>
      {label && (
        <p className="m-0 text-sm font-semibold uppercase tracking-[0.12em] text-gray-500 dark:text-gray-400">{label}</p>
      )}
      <div className={clsx("flex flex-col gap-3", row && "sm:flex-row sm:items-stretch")}>
        <p
          className={clsx(
            "m-0 rounded-lg bg-gray-50 p-4 font-mono text-sm leading-6 text-gray-800 [overflow-wrap:anywhere] dark:bg-white/[0.04] dark:text-gray-200",
            row && "flex-1 border border-solid border-gray-200 dark:border-white/10"
          )}
        >
          {text}
        </p>
        <div className={clsx(row && "flex sm:flex-col")}>
          <CopyButton
            text={text}
            label={buttonLabel}
            primary={primary}
            id={id}
            onCopy={onCopy}
            className={clsx(row && "w-full sm:h-full")}
          />
        </div>
      </div>
      {children}
    </div>
  );
}
