import { useEffect, useState } from "react";

const PROD = "https://cmd.wopee.io/login";
const DEV = "https://cmd.dev.wopee.io/login";

// Mirrors existing site behavior: production (wopee.io) points at cmd.wopee.io,
// while staging (website.wopee.io), localhost, and previews point at the dev
// Commander (cmd.dev.wopee.io). The statically-rendered HTML defaults to PROD
// and is corrected on the client after mount, so there is no hydration mismatch.
export function useCmdLoginUrl(): string {
  const [url, setUrl] = useState(PROD);
  useEffect(() => {
    const host = window.location.hostname;
    const isProd = host === "wopee.io" || host === "www.wopee.io";
    setUrl(isProd ? PROD : DEV);
  }, []);
  return url;
}
