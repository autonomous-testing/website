import React, { useEffect } from "react";

const Billing = () => {
  useEffect(() => {
    window.location.href =
      "https://billing.stripe.com/p/login/5kA4hV8Qw2Od71m4gg";
  }, []);

  return <></>;
};
export default Billing;
