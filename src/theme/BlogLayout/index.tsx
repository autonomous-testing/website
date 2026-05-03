import React, { type ReactNode } from "react";
import Layout from "@theme/Layout";
import type { Props } from "@theme/BlogLayout";

// Custom blog wrapper: replaces Docusaurus' 3-column (sidebar / main / TOC)
// grid with a single full-width container. Both BlogListPage and BlogPostPage
// own their inner layout so we keep this shell minimal. The `sidebar` and
// `toc` props from Docusaurus are intentionally ignored.
export default function BlogLayout(props: Props): ReactNode {
  const { children, ...layoutProps } = props;

  return (
    <Layout {...layoutProps}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        {children}
      </div>
    </Layout>
  );
}
