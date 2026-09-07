/**
 * API Client Configuration
 */

const API_BASE_URL = import.meta.env.VITE_API_URL;

if (!API_BASE_URL) {
  console.warn("VITE_API_URL is not defined in environment variables");
}

export const API_ENDPOINTS = {
  CONTACT_CREATE: "/contact/create",
} as const;

/**
 * Build full API URL
 */
export function buildApiUrl(endpoint: string): string {
  if (!API_BASE_URL) {
    throw new Error("API_BASE_URL is not configured");
  }
  
  // Remove leading slash from endpoint if present to avoid double slashes
  const cleanEndpoint = endpoint.startsWith("/") ? endpoint.slice(1) : endpoint;
  
  // Ensure base URL doesn't end with slash
  const cleanBaseUrl = API_BASE_URL.endsWith("/") 
    ? API_BASE_URL.slice(0, -1) 
    : API_BASE_URL;
  
  return `${cleanBaseUrl}/${cleanEndpoint}`;
}

/**
 * Default fetch options
 */
export const DEFAULT_HEADERS = {
  "Content-Type": "application/json",
};

export const DEFAULT_TIMEOUT = 30000; // 30 seconds
