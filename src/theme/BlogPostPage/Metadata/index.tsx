import React, {type ReactNode} from 'react';
import {PageMetadata} from '@docusaurus/theme-common';
import {useBlogPost} from '@docusaurus/plugin-content-blog/client';
import ogCards from '@site/static/img/og/manifest.json';
import {cardMetaTags, type Card} from '@site/src/components/seo/SocialCard';

export default function BlogPostPageMetadata(): ReactNode {
  const {assets, metadata} = useBlogPost();
  const {title, description, date, tags, authors, frontMatter} = metadata;

  const {keywords} = frontMatter;
  // Share card generated per post (scripts/og-cards/generate.cjs), so link previews show the
  // title. The image: cover stays the on-page hero only; changelog entries set no image:.
  // metadata.permalink has no trailing slash; the manifest keys are the served URLs.
  const card = (ogCards as Record<string, Card>)[metadata.permalink.replace(/\/?$/, '/')];
  const image = card?.image ?? assets.image ?? frontMatter.image;
  return (
    <PageMetadata
      title={frontMatter.title_meta ?? title}
      description={description}
      keywords={keywords}
      image={image}>
      <meta property="og:type" content="article" />
      {card && cardMetaTags(card)}
      <meta property="article:published_time" content={date} />
      {/* TODO double check those article meta array syntaxes, see https://ogp.me/#array */}
      {authors.some((author) => author.url) && (
        <meta
          property="article:author"
          content={authors
            .map((author) => author.url)
            .filter(Boolean)
            .join(',')}
        />
      )}
      {tags.length > 0 && (
        <meta
          property="article:tag"
          content={tags.map((tag) => tag.label).join(',')}
        />
      )}
    </PageMetadata>
  );
}
