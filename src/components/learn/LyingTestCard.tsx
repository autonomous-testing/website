import React from "react";
import { cn } from "@/lib/utils";

// The real moment the series is about, from our 22 Sep rehearsal: an AI agent
// wrote this assertion, the run is green, and the spec says the total is $30.04.
export default function LyingTestCard({ className }: { className?: string }) {
  return (
    <figure className={cn("m-0", className)}>
      <div className="overflow-hidden rounded-2xl border border-solid border-gray-800 bg-gray-950 text-gray-100 shadow-2xl shadow-purple-900/30 text-left">
        <div className="flex items-center gap-2 border-0 border-b border-solid border-gray-800 px-4 py-2.5">
          <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-gray-700" />
          <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-gray-700" />
          <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-gray-700" />
          <span className="ml-2 font-mono text-xs text-gray-400">order.agent.spec.ts</span>
        </div>
        <div className="px-4 py-4 sm:px-5 text-[12px] sm:text-sm leading-relaxed [&_*]:!font-mono">
          <p className="m-0 text-gray-400">$ npx playwright test</p>
          <p className="m-0 mt-1 inline-flex items-center gap-2 rounded-md bg-green-500/15 px-2 py-0.5 font-semibold text-green-400">
            ✓ 1 passed
          </p>
          <p className="m-0 mt-4 text-gray-500">
            {"// Total = Subtotal − 20 % discount + delivery + service"}
          </p>
          <p className="m-0 break-words rounded-md bg-red-500/10 px-1 -mx-1 ring-1 ring-red-500/60">
            await expect(cart.getByText(
            <span className="font-bold text-red-300 line-through decoration-red-500 decoration-2">'$36.43'</span>
            )).toBeVisible();
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-2 border-0 border-t border-solid border-gray-800 bg-primary-wopee/10 px-4 py-3 sm:px-5">
          <span className="text-sm text-gray-200">
            Spec FD-05 says the total is
          </span>
          <span className="rounded-md bg-primary-wopee px-2.5 py-0.5 font-mono text-sm font-bold text-secondary-wopee">
            $30.04
          </span>
        </div>
      </div>
      <figcaption className="mt-3 text-xs sm:text-sm opacity-60">
        From our rehearsal: an AI agent wrote this test. It passes, and it's wrong.
      </figcaption>
    </figure>
  );
}
