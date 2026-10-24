import type React from "react";
import DocusaurusHead from "@docusaurus/Head";
import DocusaurusLink, { type Props as LinkProps } from "@docusaurus/Link";
import ThemeLayout from "@theme/Layout";

// Docusaurus types these components as returning ReactNode, which this repo's
// React types reject as a JSX element (TS2786). Same components, JSX-safe types.
export const Link = DocusaurusLink as unknown as (props: LinkProps) => JSX.Element;
export const Head = DocusaurusHead as unknown as (props: {
  children?: React.ReactNode;
}) => JSX.Element;
export const Layout = ThemeLayout as unknown as (props: {
  title?: string;
  description?: string;
  children?: React.ReactNode;
}) => JSX.Element;
