import { cmdBaseUrl } from "../../../cmdBaseUrl";

// cmdBaseUrl is rewritten per environment at deploy time
// (see .github/workflows/deploy.yml), so no runtime hostname detection is needed.
export function useCmdLoginUrl(): string {
  return `${cmdBaseUrl}/login`;
}
