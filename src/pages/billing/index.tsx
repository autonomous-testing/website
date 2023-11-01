import React, { useEffect } from "react";

const Billing = () => {
  const [isMounted, setIsMounted] = React.useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) {
      return;
    }
    window.location.href =
      "https://billing.stripe.com/p/login/5kA4hV8Qw2Od71m4gg";
  }, [isMounted]);

  return <></>;
};
export default Billing;
