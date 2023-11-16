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
      "https://www.linkedin.com/feed/update/urn:li:activity:7130843936557846528";
  }, [isMounted]);

  return <></>;
};
export default Billing;
