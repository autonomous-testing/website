import React, { useEffect } from "react";

import { useHistory } from "@docusaurus/router";

const Jan = () => {
  const history = useHistory();

  useEffect(() => {
    history.push("/testwarez");
  }, []);

  return <></>;
};
export default Jan;
