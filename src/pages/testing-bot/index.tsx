import React, { useEffect } from "react";

import { useHistory } from "@docusaurus/router";

const TestingBotRedirect = () => {
  const router = useHistory();

  useEffect(() => {
    router.push("/ai-testing-agents");
  }, []);

  return <></>;
};
export default TestingBotRedirect;
