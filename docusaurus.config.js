// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");
const path = require("path");

/** @type {import('@docusaurus/types').Config} */
const config = {
  // Site title is appended to every page's <title> tag as "Page Title | <site title>".
  // Kept short ("Wopee.io") so per-page titles can fit the descriptive context within
  // Google's ~60-char SERP limit. Per-page Layout `title` props carry the keyword load
  // (e.g. homepage: "AI Testing Agents for Web Apps").
  title: "Wopee.io",
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

  trailingSlash: true,

  onBrokenLinks: "throw",
  onBrokenAnchors: "warn",
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: "warn",
    },
  },

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
            preBodyTags: [
              {
                tagName: "link",
                attributes: {
                  rel: "preload",
                  href: "https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,400;0,600;0,800;1,400;1,600;1,800&display=swap",
                  as: "style",
                  onload: "this.onload=null;this.rel='stylesheet'",
                },
              },
            ],
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
    require.resolve("./src/plugins/blog-related"),
    [
      "@docusaurus/plugin-client-redirects",
      {
        redirects: [
          { from: "/banana", to: "/about-us" },
          { from: "/bananas", to: "/about-us" },
          { from: "/beer", to: "/about-us" },
          { from: "/GetEarlyAccess", to: "/book-demo" },
          { from: "/NoWork", to: "/about-us" },
          { from: "/lisbon", to: "/about-us" },
          { from: "/olena", to: "/about-us" },
          { from: "/jan", to: "/about-us" },
          { from: "/contact", to: "/about-us" },
          { from: "/contact-us", to: "/about-us" },
          { from: "/Web-Summit-Hacks", to: "/" },
          { from: "/WebSummit", to: "/" },
          { from: "/WebSummit-Follow-Up", to: "/" },
          { from: "/QA-and-Testing-Meetup-Lisboa-2024-Nov-13", to: "/" },
          { from: "/testwarez", to: "/" },
          { from: "/brno", to: "/" },
          { from: "/ws240618", to: "/" },
          { from: "/ws240709", to: "/" },
          { from: "/ws240820", to: "/" },
          { from: "/ws240917", to: "/" },
          { from: "/ws241001", to: "/" },
          { from: "/workshops", to: "/" },
          { from: "/protest", to: "/" },
          { from: "/sy-mentoring", to: "/" },
          { from: "/early-access", to: "/" },
          { from: "/like", to: "/" },
          { from: "/vc", to: "/" },
          { from: "/partner", to: "/" },
          { from: "/wopee-commander", to: "/" },
          { from: "/guides/wopee-mcp", to: "/mcp" },
          {
            from: "/blog/top-5-applitools-alternatives-for-visual-testing--2024",
            to: "/blog/applitools-alternatives",
          },
          // /integrations folded into /visual-testing
          { from: "/integrations", to: "/visual-testing" },
        ],
      },
    ],
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
          blogSidebarCount: 0,
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        sitemap: {
          // NOTE: with `trailingSlash: true`, generated URLs end in `/`.
          // Bare-path patterns like "/l" do NOT match "/l/" — use "/l/**" or "/l/" instead.
          // Ahrefs flagged 5 of these as orphan pages (May 2026) because the patterns silently failed.
          ignorePatterns: [
            "/tags/**",
            "/blog/**/page/**",
            "/billing/**",
            "/blog/archive/**",
            "/blog/authors/**",
            "/blog/tags/**",
            "/marcel/**",
            "/jan-beranek/**",
            "/l/**",
            "/bot/**",
            "/team/**",
            "/testing-bot/**",
          ],
        },
        // Only emit analytics in production builds. The gtag plugin's
        // onRouteDidUpdate calls window.gtag() unguarded; in dev (and any
        // browser with an ad/privacy blocker) window.gtag is undefined, so
        // every internal navigation — including in-page anchor clicks like
        // the blog post TOC — throws an "Uncaught runtime error" overlay.
        gtag:
          process.env.NODE_ENV === "production"
            ? { trackingID: "G-PVTHWLV51B" }
            : undefined,
        googleTagManager:
          process.env.NODE_ENV === "production"
            ? { containerId: "GTM-T54MTRSZ" }
            : undefined,
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    {
      // Replace with your project's social card
      image: "img/wopee-social-card.jpg",
      // OG protocol requires og:type. Docusaurus's classic theme doesn't emit a default;
      // the blog plugin overrides this with og:type=article on blog pages.
      metadata: [{ property: "og:type", content: "website" }],
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
            to: "/ai-testing-agents",
            label: "Solutions",
            position: "left",
            items: [
              { to: "/ai-testing-agents", label: "AI Agents for Software Testing" },
              { to: "/visual-testing", label: "Visual Regression Testing" },
              { to: "/mcp", label: "MCP Server" },
              {
                to: "blog/playwright-bot-ai-powered-test-automation",
                label: "Playwright AI Bot (preview)",
              },
            ],
          },
          { to: "/pricing", label: "Pricing", position: "left" },
          { to: "/blog", label: "Blog", position: "left" },
          { to: "/about-us", label: "About us", position: "left" },
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
            label: "Start for free",
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
            title: "Solutions: AI Testing",
            items: [
              { label: "AI Testing Agents 🤖", to: "/ai-testing-agents" },
              {
                label: "Visual Regression Testing",
                to: "/visual-testing",
              },
              {
                label: "MCP Server",
                to: "/mcp",
              },
              {
                label: "Playwright AI Agent",
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
