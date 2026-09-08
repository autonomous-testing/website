export type FooterLink = { label: string; to: string };
export type FooterColumn = { title: string; links: FooterLink[] };

export const footerColumns: FooterColumn[] = [
  {
    title: "Product",
    links: [
      { label: "AI Testing Agents", to: "/ai-testing-agents/" },
      { label: "AI Testing", to: "/ai-testing/" },
      { label: "Visual Regression Testing", to: "/visual-testing/" },
      { label: "MCP Server", to: "/mcp/" },
      { label: "Integrations", to: "/integrations/" },
      { label: "How it works", to: "/how-it-works/" },
      { label: "Compare tools", to: "/compare/" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Enterprise", to: "/enterprise/" },
      { label: "Pilot projects", to: "/pilot/" },
      { label: "Customers", to: "/customers/" },
      { label: "Pricing", to: "/pricing/" },
      { label: "Security & Trust", to: "/security/" },
      { label: "About us", to: "/about-us/" },
      { label: "Book a demo", to: "/book-demo/" },
    ],
  },
  {
    title: "Docs",
    links: [
      { label: "Introduction", to: "https://docs.wopee.io/" },
      { label: "Getting started", to: "https://docs.wopee.io/getting-started/" },
      { label: "AI Testing Agent", to: "https://docs.wopee.io/ai-agent/" },
      { label: "MCP Server", to: "https://docs.wopee.io/guides/wopee-mcp/" },
      {
        label: "Enterprise Connectivity",
        to: "https://docs.wopee.io/security/enterprise-connectivity/",
      },
      {
        label: "Visual Testing SDKs",
        to: "https://docs.wopee.io/playwright-visual-testing/",
      },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "Blog", to: "/blog/" },
      { label: "Newsletter", to: "/newsletter/" },
      { label: "Changelog", to: "/changelog/" },
      { label: "LinkedIn", to: "https://www.linkedin.com/company/wopee" },
      { label: "GitHub", to: "https://github.com/Wopee-io" },
      { label: "YouTube", to: "https://www.youtube.com/@wopee" },
    ],
  },
];

export const footerLegal: FooterLink[] = [
  { label: "Terms and Conditions", to: "/terms-and-conditions/" },
  { label: "GDPR", to: "/gdpr/" },
];
