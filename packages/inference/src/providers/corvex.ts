import { BaseConversationalTask } from "./providerHelper.js";

// Allow override for dev (raw IP), default to prod domain
const CORVEX_API_BASE_URL =
  (typeof process !== "undefined" && (process as any)?.env?.CORVEX_API_BASE_URL) ||
  "https://api.corvex.ai";

/**
 * Minimal provider: rely on BaseConversationalTask for route, headers, payload, and streaming.
 * Only set the provider name and base URL.
 */
export class CorvexConversationalTask extends BaseConversationalTask {
  constructor() {
    super("corvex", CORVEX_API_BASE_URL);
  }
}
