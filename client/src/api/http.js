// I'm so proud to 100% copy this from InvoiceDoc2
// Backend API base URL (override via .env VITE_API_BASE)
export const API_BASE = import.meta.env.VITE_API_BASE !== undefined ? import.meta.env.VITE_API_BASE : "http://localhost:6700";

/**
 * Calls the backend API.
 * Response: { success, data, meta? } or { success: false, error: { message } }.
 * Throws Error if success is false or status is not 2xx.
 */
export async function http(path, options = {}){
  const baseUrl = API_BASE.endsWith("/") ? API_BASE.slice(0, -1) : API_BASE;
  const headers = { "Content-Type": "application/json", ...(options.headers || {}) };
  const res = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers,
  });
  const ct = res.headers.get("content-type") || "";
  const isJson = ct.includes("application/json");
  const body = isJson ? await res.json() : await res.text();

  if(!res.ok){
    const message = isJson && body?.error?.message ? body.error.message : (typeof body === "string" ? body : `HTTP ${res.status}`);
    throw new Error(message);
  }
  return body;
}

/**
 * Constructs the full image URL from a relative path
 * @param {string} imagePath - The image path (e.g., 'events/cooktail_2025.jpg')
 * @returns {string} Full image URL
 */
export function getImageUrl(imagePath) {
  if (!imagePath) return '';
  const baseUrl = API_BASE.endsWith("/") ? API_BASE.slice(0, -1) : API_BASE;
  // Ensure path starts with / for proper concatenation
  const path = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  return `${baseUrl}/api${path}`;
}
