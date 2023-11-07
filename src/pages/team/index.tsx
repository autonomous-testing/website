import React from "react";

import Layout from "@theme/Layout";
import Team from "@site/src/components/team/Team";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

const TeamPage = () => {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Autonomous testing platform for web applications | Wopee.io"
    >
      <main className="container overflow-visible">
        <Team />
      </main>
    </Layout>
  );
};
export default TeamPage;
