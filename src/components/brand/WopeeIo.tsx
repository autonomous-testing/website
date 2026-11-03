import React from "react";

// "Wopee.io" as text. `display` (nav, big headings) always sets the W in Bungee;
// in body copy the W follows the switch in src/css/custom.css (--wopee-io-body-first-letter).
export default function WopeeIo({ display = false }: { display?: boolean }) {
  return <span className={display ? "wopee-io wopee-io--display" : "wopee-io"}>Wopee.io</span>;
}
