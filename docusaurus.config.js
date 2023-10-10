// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Wopee.io, autonomous testing bots for web apps",
  tagline:
    "Boots your testing team. Elevate your quality & speed up release pace.",
  favicon: "img/favicon.png",

  // Set the production url of your site here
  url: "https://website.wopee.io",
  // url: "https://wopee.io",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "autonomous-testing", // Usually your GitHub org/user name.
  projectName: "website", // Usually your repo name.
  // projectName: "wopee.io", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },
  plugins: [
    async function myPlugin(context, options) {
      return {
        name: "docusaurus-tailwindcss",
        configurePostCss(postcssOptions) {
          // Appends TailwindCSS and AutoPrefixer.
          postcssOptions.plugins.push(require("tailwindcss"));
          postcssOptions.plugins.push(require("autoprefixer"));
          return postcssOptions;
        },
      };
    },
  ],

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve("./sidebars.js"),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/autonomous-testing/wopee.io/",
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: "https://github.com/autonomous-testing/wopee.io/",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        gtag: { trackingID: "G-PVTHWLV51B" },
      }),

      // "@docusaurus/preset-classic",
      // { gtag: { trackingID: "G-PVTHWLV51B" } },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      // Replace with your project's social card
      image: "img/wopee-social-card.jpg",
      navbar: {
        title: "Wopee.io",
        logo: {
          alt: "Autonomous Testing Bots",
          src: "img/logo.png",
        },
        items: [
          { to: "/", label: "Home", position: "left" },
          { to: "#about", label: "About", position: "left" },
          { to: "#services", label: "Services", position: "left" },
          { to: "#pricing", label: "Pricing", position: "left" },
          { to: "#team", label: "Team", position: "left" },
          { to: "/contact", label: "Contact", position: "left" },
          {
            href: "/book-demo",
            label: "Book demo",
            position: "right",
            className: "primary-button margin-right--md",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Getting started",
                to: "https://docs.wopee.io/getting-started/",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "LinkedIn",
                href: "https://www.linkedin.com/company/wopee",
              },
              {
                label: "Meetup",
                href: "https://www.meetup.com/wopee-io/",
              },
              {
                label: "Twitter",
                href: "https://twitter.com/Wopee_io",
              },
            ],
          },
          {
            title: "Legal",
            items: [
              {
                label: "Terms and Conditions",
                to: "/toc",
              },
              {
                label: "GDPR",
                href: "/gdpr",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "Blog",
                to: "/blog",
              },
              {
                label: "GitHub",
                href: "https://github.com/Wopee-io",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Wopee Labs, s.r.o..`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
};

module.exports = config;
