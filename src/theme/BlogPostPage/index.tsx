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
import type { Props } from "@theme/BlogPostPage";

import ReadingProgressBar from "@/components/blog/ReadingProgressBar";
import BlogPostHero from "@/components/blog/BlogPostHero";
import ShareButtons from "@/components/blog/ShareButtons";
import InPostCTA from "@/components/blog/InPostCTA";
import RelatedPosts from "@/components/blog/RelatedPosts";

function BlogPostPageContent({ children }: { children: ReactNode }): ReactNode {
  const { metadata } = useBlogPost();
  const { nextItem, prevItem, permalink, title, tags } = metadata;
  const {
    siteConfig: { url: siteUrl },
  } = useDocusaurusContext();
  const fullUrl = `${siteUrl.replace(/\/+$/, "")}${permalink}`;

  return (
    <BlogLayout>
      <ContentVisibility metadata={metadata} />

      <article className="mx-auto max-w-3xl">
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
