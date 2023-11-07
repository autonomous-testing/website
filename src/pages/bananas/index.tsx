import React, { useEffect } from "react";

import { useHistory } from "@docusaurus/router";

const Bananas = () => {
  const history = useHistory();

  useEffect(() => {
    history.push("/beer");
  }, []);

  return <></>;
};
export default Bananas;
