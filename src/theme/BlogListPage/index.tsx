import React, { type ReactNode } from "react";
import clsx from "clsx";

import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import {
  PageMetadata,
  HtmlClassNameProvider,
  ThemeClassNames,
} from "@docusaurus/theme-common";
import BlogLayout from "@theme/BlogLayout";
import BlogListPaginator from "@theme/BlogListPaginator";
import SearchMetadata from "@theme/SearchMetadata";
import type { Props } from "@theme/BlogListPage";
import BlogPostItems from "@theme/BlogPostItems";
import BlogListPageStructuredData from "@theme/BlogListPage/StructuredData";

import FeaturedPostHero from "@/components/blog/FeaturedPostHero";
import BlogPostCard from "@/components/blog/BlogPostCard";

function BlogListPageMetadata(props: Props): ReactNode {
  const { metadata } = props;
  const {
    siteConfig: { title: siteTitle },
  } = useDocusaurusContext();
  const { blogDescription, blogTitle, permalink } = metadata;
  const isBlogOnlyMode = permalink === "/";
  const title = isBlogOnlyMode ? siteTitle : blogTitle;
  return (
    <>
      <PageMetadata title={title} description={blogDescription} />
      <SearchMetadata tag="blog_posts_list" />
    </>
  );
}

function BlogListPageContent(props: Props): ReactNode {
  const { metadata, items } = props;
  const isFirstPage = metadata.page === 1;
  const featured = isFirstPage && items.length > 0 ? items[0] : null;
  const rest = featured ? items.slice(1) : items;

  return (
    <BlogLayout>
      <header className="mb-10 lg:mb-14">
        <p className="text-sm font-bold uppercase tracking-widest text-secondary-wopee dark:text-primary-wopee mb-3">
          Wopee.io · Engineering Blog
        </p>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight m-0 text-gray-900 dark:text-white">
          AI testing agents for web apps
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-400">
          How AI testing agents work in production — from the engineers
          building them at Wopee.io.
        </p>
      </header>

      {featured && (
        <div className="mb-12 lg:mb-16">
          <FeaturedPostHero post={featured.content} />
        </div>
      )}

      {rest.length > 0 && (
        <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <BlogPostItems items={rest} component={BlogPostCard} />
        </div>
      )}

      <div className="mt-12 lg:mt-16">
        <BlogListPaginator metadata={metadata} />
      </div>
    </BlogLayout>
  );
}

export default function BlogListPage(props: Props): ReactNode {
  return (
    <HtmlClassNameProvider
      className={clsx(
        ThemeClassNames.wrapper.blogPages,
        ThemeClassNames.page.blogListPage,
      )}
    >
      <BlogListPageMetadata {...props} />
      <BlogListPageStructuredData {...props} />
      <BlogListPageContent {...props} />
    </HtmlClassNameProvider>
  );
}
