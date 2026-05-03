import React, { type ReactNode } from "react";
import clsx from "clsx";
import { HtmlClassNameProvider, ThemeClassNames } from "@docusaurus/theme-common";
import {
  BlogPostProvider,
  useBlogPost,
} from "@docusaurus/plugin-content-blog/client";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import BlogLayout from "@theme/BlogLayout";
import BlogPostPaginator from "@theme/BlogPostPaginator";
import BlogPostPageMetadata from "@theme/BlogPostPage/Metadata";
import BlogPostPageStructuredData from "@theme/BlogPostPage/StructuredData";
import ContentVisibility from "@theme/ContentVisibility";
import TOC from "@theme/TOC";
import type { Props } from "@theme/BlogPostPage";

import ReadingProgressBar from "@/components/blog/ReadingProgressBar";
import BlogPostHero from "@/components/blog/BlogPostHero";
import ShareButtons from "@/components/blog/ShareButtons";
import InPostCTA from "@/components/blog/InPostCTA";
import RelatedPosts from "@/components/blog/RelatedPosts";

function BlogPostPageContent({ children }: { children: ReactNode }): ReactNode {
  const { metadata, toc } = useBlogPost();
  const { nextItem, prevItem, permalink, title, tags, frontMatter } = metadata;
  const {
    hide_table_of_contents: hideTableOfContents,
    toc_min_heading_level: tocMinHeadingLevel,
    toc_max_heading_level: tocMaxHeadingLevel,
  } = frontMatter;
  const showToc = !hideTableOfContents && toc.length > 0;
  const {
    siteConfig: { url: siteUrl },
  } = useDocusaurusContext();
  const fullUrl = `${siteUrl.replace(/\/+$/, "")}${permalink}`;

  return (
    <BlogLayout>
      <ContentVisibility metadata={metadata} />

      <div
        className={clsx(
          "mx-auto",
          showToc
            ? "max-w-6xl lg:grid lg:grid-cols-[minmax(0,1fr)_240px] lg:gap-12"
            : "max-w-3xl",
        )}
      >
        <article className={showToc ? "min-w-0" : undefined}>
          <BlogPostHero />

          <div className="markdown">{children}</div>

          <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-800">
            <ShareButtons url={fullUrl} title={title} />
          </div>

          <InPostCTA />

          <RelatedPosts
            currentPermalink={permalink}
            tags={tags.map((t) => t.label)}
          />

          {(nextItem || prevItem) && (
            <div className="mt-12">
              <BlogPostPaginator nextItem={nextItem} prevItem={prevItem} />
            </div>
          )}
        </article>

        {showToc && (
          <aside className="hidden lg:block">
            <div className="sticky top-[calc(var(--ifm-navbar-height,80px)+1rem)] max-h-[calc(100vh-var(--ifm-navbar-height,80px)-2rem)] overflow-y-auto pb-8">
              <p className="text-xs font-bold uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-3">
                On this page
              </p>
              <TOC
                toc={toc}
                minHeadingLevel={tocMinHeadingLevel}
                maxHeadingLevel={tocMaxHeadingLevel}
              />
            </div>
          </aside>
        )}
      </div>
    </BlogLayout>
  );
}

export default function BlogPostPage(props: Props): ReactNode {
  const BlogPostContent = props.content;
  return (
    <BlogPostProvider content={props.content} isBlogPostPage>
      <HtmlClassNameProvider
        className={clsx(
          ThemeClassNames.wrapper.blogPages,
          ThemeClassNames.page.blogPostPage,
        )}
      >
        <BlogPostPageMetadata />
        <BlogPostPageStructuredData />
        <ReadingProgressBar />
        <BlogPostPageContent>
          <BlogPostContent />
        </BlogPostPageContent>
      </HtmlClassNameProvider>
    </BlogPostProvider>
  );
}
