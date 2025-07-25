// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");
const path = require("path");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Wopee.io, the AI Agents for Software Testing",
  tagline:
    "Boost your testing team. Elevate your quality & speed up release pace.",
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
    function MyAliasPlugin(_context, _options) {
      return {
        name: "my-alias-plugin",
        configureWebpack() {
          return {
            resolve: {
              alias: {
                "@": path.join(__dirname, "src"),
              },
            },
          };
        },
      };
    },

    async function myTailwindPlugin(_context, _options) {
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
    function (_context, _options) {
      return {
        name: "custom-script-plugin",
        injectHtmlTags() {
          return {
            bodyTags: [],
            preBodyTags: [],
            postBodyTags: [
              {
                tagName: "script",
                attributes: {
                  type: "text/javascript",
                  id: "hs-script-loader",
                  async: true,
                  defer: true,
                  src: "//js-eu1.hs-scripts.com/139620033.js",
                },
              },
            ],
          };
        },
      };
    },
  ],

  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: false,
        // docs: {
        //   sidebarPath: require.resolve("./sidebars.js"),
        //   editUrl: "https://github.com/autonomous-testing/wopee.io/",
        // },
        blog: {
          exclude: ["**/blog/2019*"],
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        gtag: { trackingID: "G-PVTHWLV51B" },
        googleTagManager: {
          containerId: "GTM-T54MTRSZ",
        },
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    {
      // Replace with your project's social card
      image: "img/wopee-social-card.jpg",
      // https://docusaurus.io/docs/api/themes/configuration#color-mode---dark-mode
      colorMode: {
        defaultMode: "dark",
        disableSwitch: false,
        // Set dark mode as the default, but allow users switching to light mode.
        // respectPrefersColorScheme: false,
      },
      navbar: {
        title: "Wopee.io",
        logo: {
          alt: "AI-Powered Software Testing Bots",
          src: "img/logo.png",
          className: "margin-left--md",
        },
        items: [
          {
            type: "dropdown",
            to: "/#solutions",
            label: "Solutions",
            position: "left",
            items: [
              { to: "/testing-bot", label: "AI Agents for Software Testing" },
              { to: "/visual-testing", label: "Visual Regression Testing" },
              {
                to: "blog/playwright-bot-ai-powered-test-automation",
                label: "Playwright AI Bot (preview)",
              },
            ],
          },
          { to: "/pricing", label: "Pricing", position: "left" },
          { to: "/blog", label: "Blog", position: "left" },
          { to: "/about-us", label: "About us", position: "left" },
          { to: "/contact", label: "Contact", position: "left" },
          {
            to: "https://cmd.wopee.io",
            target: "_blank",
            label: "Sign In",
            position: "right",
            className: "margin-right--md",
            id: "login-button",
          },
          {
            to: "https://cmd.wopee.io",
            target: "_blank",
            label: "Start free trial",
            position: "right",
            className: "margin-right--md",
            id: "navbar-button",
          },
        ],
      },
      footer: {
        style: "dark",
        links: [
          {
            title: "Solutions: Regression Testing",
            items: [
              { label: "Autonomous Testing Bot 🤖", to: "/testing-bot" },
              {
                label: "Visual Regression Testing",
                to: "/visual-testing",
              },
              {
                label: "Playwright AI Bot (preview)",
                to: "blog/playwright-bot-ai-powered-test-automation",
              },
            ],
          },
          {
            title: "Docs",
            items: [
              {
                label: "Introduction",
                to: "https://docs.wopee.io/",
              },
              {
                label: "Getting started",
                to: "https://docs.wopee.io/getting-started/",
              },
              {
                label: "Cypress Visual Regression Testing",
                to: "https://docs.wopee.io/cypress/01-getting-started/",
              },
              {
                label: "Playwright Visual Regression Testing",
                to: "https://docs.wopee.io/playwright-visual-testing/",
              },
              {
                label: "Robot Framework Visual Regression Testing",
                to: "https://docs.wopee.io/robot-framework/01-getting-started/",
              },
              {
                label: "Webdriver.io Visual Regression Testing",
                to: "https://docs.wopee.io/webdriverio-visual-testing/",
              },
            ],
          },
          {
            title: "Community",
            items: [
              {
                label: "Blog",
                href: "/blog",
              },
              {
                label: "Newsletter",
                href: "/newsletter",
              },
              {
                label: "LinkedIn",
                href: "https://www.linkedin.com/company/wopee",
              },
              {
                label: "GitHub",
                href: "https://github.com/Wopee-io",
              },
              {
                label: "YouTube",
                href: "https://www.youtube.com/@wopee",
              },
            ],
          },
          {
            title: "Legal",
            items: [
              {
                label: "Terms and Conditions",
                to: "/terms-and-conditions",
              },
              {
                label: "GDPR",
                href: "/gdpr",
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} wopee labs, s.r.o.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    },
};

module.exports = config;
