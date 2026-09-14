import React, {type ReactNode} from 'react';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {useBlogPostStructuredData} from '@docusaurus/plugin-content-blog/client';

export default function BlogPostStructuredData(): ReactNode {
  const structuredData = useBlogPostStructuredData();
  const {siteConfig} = useDocusaurusContext();
  const fallbackImage = useBaseUrl(siteConfig.themeConfig.image as string, {
    absolute: true,
  });

  const hasAuthor = Array.isArray(structuredData.author)
    ? structuredData.author.length > 0
    : Boolean(structuredData.author);

  // Google's Article validation flags posts without an image or author
  // (changelog entries and a few older posts have neither in front matter).
  const data = {
    ...structuredData,
    image: structuredData.image ?? {
      '@type': 'ImageObject',
      '@id': fallbackImage,
      url: fallbackImage,
      contentUrl: fallbackImage,
    },
    author: hasAuthor
      ? structuredData.author
      : {'@type': 'Organization', name: 'Wopee.io', url: siteConfig.url},
  };

  return (
    <Head>
      <script type="application/ld+json">{JSON.stringify(data)}</script>
    </Head>
  );
}
