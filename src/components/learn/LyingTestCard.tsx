import React from "react";
import { cn } from "@/lib/utils";

// The moment the series is about, from our 22 Sep rehearsal: an AI agent wrote
// the FD-05 assertion from what the app showed, the run is green, and the spec
// says the total is $30.04 because the app forgets the 20 % discount.
const TESTS = [
  { id: "FD-01", name: "menu lists dishes", time: "0.4s" },
  { id: "FD-03", name: "add two dishes", time: "0.6s" },
  { id: "FD-05", name: "total after discount", time: "0.5s", lie: true },
  { id: "FD-07", name: "needs an address", time: "0.4s" },
];

const CART = [
  ["Beef Burger, Large", "$15.95"],
  ["Double Smash Burger", "$15.99"],
];

const Tick = () => (
  <svg viewBox="0 0 16 16" aria-hidden="true" className="h-3.5 w-3.5 flex-shrink-0 text-green-400" fill="none">
    <path d="M3 8.5 6.5 12 13 4.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

function Report() {
  return (
    <div className="min-w-0 p-4 sm:p-5">
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <span className="font-semibold text-gray-300">Playwright report</span>
        <span className="ml-auto rounded-full bg-green-500/15 px-2 py-0.5 font-mono font-bold text-green-400">
          4 passed
        </span>
      </div>
      <ul className="m-0 mt-3 list-none p-0 text-[13px]">
        {TESTS.map((t) => (
          <li
            key={t.id}
            className={cn(
              "flex items-center gap-2 rounded-md px-2 py-1.5",
              t.lie && "bg-white/[0.06] ring-1 ring-inset ring-white/10",
            )}
          >
            <Tick />
            <span className="whitespace-nowrap font-mono text-gray-400">{t.id}</span>
            <span className="min-w-0 truncate text-gray-100">{t.name}</span>
            {t.lie ? (
              <span className="ml-auto whitespace-nowrap rounded-full bg-red-500/15 px-2 py-0.5 font-mono text-[11px] font-bold text-red-300">
                wrong
              </span>
            ) : (
              <span className="ml-auto hidden font-mono text-xs text-gray-400 min-[420px]:inline">{t.time}</span>
            )}
          </li>
        ))}
      </ul>
      <pre
        aria-hidden="true"
        className="!m-0 !mt-3 !rounded-lg !border-0 !bg-black/40 !p-3 overflow-x-auto font-mono text-[12px] leading-relaxed !text-gray-100"
      >
        <code className="!border-0 !bg-transparent !p-0 whitespace-pre">
          <span className="text-gray-400">{"// FD-05: subtotal − 20 % + fees"}</span>
          {"\nawait expect(\n  cart.getByText("}
          <del className="rounded-sm bg-red-500/15 px-0.5 font-bold text-red-300 decoration-red-400 decoration-2">
            '$36.43'
          </del>
          {")\n).toBeVisible();"}
        </code>
      </pre>
      <p aria-hidden="true" className="m-0 mt-2 flex items-center gap-1.5 text-xs font-semibold text-red-300">
        <span className="inline-block h-0.5 w-4 rounded bg-red-400" />
        The agent's value, copied from the app
      </p>
    </div>
  );
}

function Cart() {
  return (
    <div className="relative min-w-0 p-4">
      <div aria-hidden="true" className="rounded-xl bg-white p-3.5 text-gray-900 shadow-lg">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold tracking-tight">
            Food<span className="text-orange-700">Dash</span>
          </span>
          <span className="text-xs text-gray-600">Your cart</span>
        </div>
        <ul className="m-0 mt-3 list-none p-0 text-[13px]">
          {CART.map(([k, v]) => (
            <li key={k} className="flex justify-between gap-3 py-1">
              <span className="min-w-0 truncate">{k}</span>
              <span className="font-mono">{v}</span>
            </li>
          ))}
        </ul>
        <dl className="m-0 mt-2 grid grid-cols-[1fr_auto] gap-x-3 gap-y-1 border-0 border-t border-dashed border-gray-300 pt-2 text-[13px] text-gray-700">
          <dt>Subtotal</dt>
          <dd className="m-0 text-right font-mono">$31.94</dd>
          <dt>Delivery</dt>
          <dd className="m-0 text-right font-mono">$2.99</dd>
          <dt>Service</dt>
          <dd className="m-0 text-right font-mono">$1.50</dd>
          <dt className="mt-1 self-center font-bold text-gray-900">Total</dt>
          <dd className="relative m-0 mt-1 text-right font-mono text-base font-bold text-gray-900">
            $36.43
            <span className="pointer-events-none absolute -inset-x-2 -inset-y-1 -rotate-6 rounded-[50%] border-2 border-solid border-red-500" />
          </dd>
        </dl>
      </div>
      <div
        aria-hidden="true"
        className="relative -mt-3 ml-auto mr-1 w-fit rotate-[-2deg] rounded-lg bg-primary-wopee px-3 py-2 text-secondary-wopee shadow-xl"
      >
        <span className="block text-[11px] font-bold uppercase tracking-wider">Spec FD-05 says</span>
        <span className="block font-mono text-xl font-bold leading-tight">$30.04</span>
        <span className="block text-[11px] font-semibold">20 % off food</span>
      </div>
    </div>
  );
}

export default function LyingTestCard({ className }: { className?: string }) {
  return (
    <figure className={cn("m-0", className)}>
      <div className="relative overflow-hidden rounded-2xl border border-solid border-white/10 bg-[#141416] text-left text-gray-100 shadow-xl shadow-purple-900/15 dark:shadow-2xl dark:shadow-purple-900/40">
        <div className="flex items-center gap-2 border-0 border-b border-solid border-white/10 px-4 py-2.5">
          <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-white/20" />
          <span className="ml-2 font-mono text-xs text-gray-400">order.agent.spec.ts</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          <Report />
          <div className="border-0 border-t border-solid border-white/10 sm:border-l sm:border-t-0">
            <Cart />
          </div>
        </div>
        <p className="sr-only">
          The Playwright report shows all four tests passing. The FD-05 test
          expects the cart total $36.43, the value the app showed, and the
          agent wrote it into the test. The spec FD-05 says the total is
          $30.04, because the app forgets the 20 % discount. The test is green
          and wrong.
        </p>
      </div>
      <figcaption className="mt-3 text-sm text-gray-700 dark:text-gray-300">
        From our rehearsal: an AI agent wrote this test. It passes, and it's wrong.
      </figcaption>
    </figure>
  );
}
