import React, { useEffect } from "react";

import { useHistory } from "@docusaurus/router";

const TeamPage = () => {
  const router = useHistory();

  useEffect(() => {
    router.push("/about-us");
  }, []);

  return <></>;
};
export default TeamPage;
