import React, { useEffect } from "react";
import Head from "@docusaurus/Head";

import { useHistory } from "@docusaurus/router";

const OldTermsPage = () => {
  const router = useHistory();

  useEffect(() => {
    router.push("/terms-and-conditions");
  }, []);

  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
    </>
  );
};
export default OldTermsPage;
