import React, { useEffect } from "react";

import { useHistory } from "@docusaurus/router";

const BotPage = () => {
  const router = useHistory();

  useEffect(() => {
    router.push("/testing-bot");
  }, []);

  return <></>;
};
export default BotPage;
