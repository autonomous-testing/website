import React, { useEffect } from "react";

import { useHistory } from "@docusaurus/router";

const Olena = () => {
  const history = useHistory();

  useEffect(() => {
    history.push("/Lisbon");
  }, []);

  return <></>;
};
export default Olena;
