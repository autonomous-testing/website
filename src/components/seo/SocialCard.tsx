import React from "react";
import Head from "@docusaurus/Head";
import { PageMetadata } from "@docusaurus/theme-common";
import ogCards from "@site/static/img/og/manifest.json";

export type Card = { image: string; width: number; height: number; alt: string };

const cards = ogCards as Record<string, Card>;

// Generated share card for a route (scripts/og-cards/generate.cjs). "*" is the site default.
export function cardFor(permalink: string): Card | undefined {
  return cards[permalink];
}

export const DEFAULT_CARD = cards["*"];

const typeOf = (src: string) => {
  const ext = src.split("?")[0].split(".").pop()?.toLowerCase();
  return ext === "png" ? "image/png" : ext === "jpg" || ext === "jpeg" ? "image/jpeg" : undefined;
};

// The size, type and alt that go with an og:image, as an array so it can sit directly
// inside a <Head> (Helmet accepts arrays of tags, not components or fragments).
export function cardMetaTags(card: Card) {
  const type = typeOf(card.image);
  return [
    <meta key="w" property="og:image:width" content={String(card.width)} />,
    <meta key="h" property="og:image:height" content={String(card.height)} />,
    ...(type ? [<meta key="t" property="og:image:type" content={type} />] : []),
    <meta key="a" property="og:image:alt" content={card.alt} />,
    <meta key="ta" name="twitter:image:alt" content={card.alt} />,
  ];
}

// Root emits these for the default card; a page that sets its own image overrides them.
export function SocialCardMeta({ card }: { card: Card }) {
  return <Head>{cardMetaTags(card)}</Head>;
}

// og:image and twitter:image for a page, plus its size, type and alt.
export default function SocialCard({ card, permalink }: { card?: Card; permalink?: string }) {
  const c = card ?? (permalink ? cardFor(permalink) : undefined);
  if (!c) return null;
  return (
    <>
      <PageMetadata image={c.image} />
      <SocialCardMeta card={c} />
    </>
  );
}

// /learn/ and its pages share this hand-made card.
export const LEARN_CARD: Card = { image: "/img/learn/learn-og.jpg", width: 1200, height: 630, alt: "Green Is Not Correct: free hands-on tutorials on AI testing agents, for QA testers" };
