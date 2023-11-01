import React, { useEffect } from "react";

import { useHistory } from "@docusaurus/router";

const Bananas = () => {
  const history = useHistory();

  useEffect(() => {
    history.push("https://billing.stripe.com/p/login/5kA4hV8Qw2Od71m4gg");
  }, []);

  return <></>;
};
export default Bananas;
