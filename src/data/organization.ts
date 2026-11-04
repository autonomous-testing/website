export const ORG_ID = "https://wopee.io/#organization";

export const JSONLD_ORG = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORG_ID,
  name: "Wopee.io",
  alternateName: ["Wopee", "Woopee", "wopee labs"],
  legalName: "wopee labs s.r.o.",
  url: "https://wopee.io/",
  logo: "https://wopee.io/img/icon-512.png",
  email: "help@wopee.io",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Pujmanove 883/23",
    addressLocality: "Prague",
    postalCode: "140 00",
    addressCountry: "CZ",
  },
  contactPoint: {
    "@type": "ContactPoint",
    email: "help@wopee.io",
    contactType: "customer support",
    availableLanguage: ["English"],
  },
  sameAs: [
    "https://www.youtube.com/@wopee",
    "https://www.linkedin.com/company/wopee",
    "https://github.com/Wopee-io",
    "https://www.npmjs.com/package/wopee-mcp",
  ],
};

export const ORG_REF = {
  "@type": "Organization",
  "@id": ORG_ID,
  name: "Wopee.io",
  url: "https://wopee.io/",
};
