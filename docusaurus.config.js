// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require("prism-react-renderer/themes/github");
const darkCodeTheme = require("prism-react-renderer/themes/dracula");

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Wopee.io, the autonomous testing bots for web apps",
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
    function (context, options) {
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
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      {
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
      },

      // "@docusaurus/preset-classic",
      // { gtag: { trackingID: "G-PVTHWLV51B" } },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    {
      // Replace with your project's social card
      image: "img/wopee-social-card.jpg",
      navbar: {
        title: "Wopee.io",
        logo: {
          alt: "Autonomous Testing Bots",
          src: "img/logo.png",
          className: "margin-left--md",
        },
        items: [
          {
            to: "/",
            label: "Home",
            position: "left",
          },
          {
            type: "dropdown",
            to: "/#solutions",
            label: "Solutions",
            position: "left",
            items: [
              { to: "/wopee-bot", label: "Wopee Bot" },
              { to: "/wopee-commander", label: "Wopee Commander" },
              { to: "/wopee-copilot", label: "Wopee Copilot" },
            ],
          },
          { to: "/pricing", label: "Pricing", position: "left" },
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
            label: "Try free for 1 month",
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
            title: "Docs",
            items: [
              {
                label: "Getting started",
                to: "https://docs.wopee.io/getting-started/",
              },
            ],
          },
          {
            title: "Solutions",
            items: [
              { label: "Wopee Bot", to: "/wopee-bot" },
              { label: "Wopee Copilot", to: "/wopee-copilot" },
              { label: "Wopee Commander", to: "/wopee-commander" },
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
                to: "/terms-and-conditions",
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
        copyright: `Copyright © ${new Date().getFullYear()} wopee labs, s.r.o.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    },
};

module.exports = config;
