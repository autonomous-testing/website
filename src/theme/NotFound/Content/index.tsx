import React, {type ReactNode} from 'react';
import clsx from 'clsx';
import Translate from '@docusaurus/Translate';
import type {Props} from '@theme/NotFound/Content';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';

const LINKS = [
  {label: 'Home', to: '/'},
  {label: 'Pricing', to: '/pricing/'},
  {label: 'Blog', to: '/blog/'},
  {label: 'Free tutorials', to: '/learn/'},
];

export default function NotFoundContent({className}: Props): ReactNode {
  return (
    <main className={clsx('container px-5 py-16 md:py-24', className)}>
      <div className="mx-auto max-w-xl">
        <Heading as="h1" className="hero__title mb-5 leading-tight">
          <Translate
            id="theme.NotFound.title"
            description="The title of the 404 page">
            Page Not Found
          </Translate>
        </Heading>
        <p className="mb-3 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          <Translate
            id="theme.NotFound.p1"
            description="The first paragraph of the 404 page">
            We could not find what you were looking for.
          </Translate>
        </p>
        <p className="mb-8 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          <Translate
            id="theme.NotFound.p2"
            description="The 2nd paragraph of the 404 page">
            Please contact the owner of the site that linked you to the
            original URL and let them know their link is broken.
          </Translate>
        </p>
        <nav aria-label="Popular pages">
          <ul className="m-0 grid list-none grid-cols-2 gap-3 p-0 sm:flex sm:flex-wrap">
            {LINKS.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  className="inline-flex min-h-11 w-full items-center justify-center rounded-lg sm:w-auto sm:justify-start border border-solid border-gray-300 px-4 font-semibold text-gray-900 no-underline transition-colors hover:border-secondary-wopee hover:text-secondary-wopee hover:no-underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary-wopee dark:border-white/15 dark:text-white dark:hover:border-primary-wopee dark:hover:text-primary-wopee dark:focus-visible:outline-primary-wopee">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </main>
  );
}
