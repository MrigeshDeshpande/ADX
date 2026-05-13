import { SEO_CONFIG } from "../seo.config.js";

function normalizePath(path = "") {
  if (!path) return "/";

  let normalized = path.startsWith("/") ? path : `/${path}`;

  if (normalized.length > 1 && normalized.endsWith("/")) {
    normalized = normalized.slice(0, -1);
  }

  return normalized;
}

export function absoluteUrl(path = "/") {
  const safePath = normalizePath(path);
  return new URL(safePath, SEO_CONFIG.baseUrl).toString();
}

export function absoluteAssetUrl(path = "/") {
  // For static assets we still want the exact path the caller intends,
  // but anchored to the same baseUrl.
  const safePath = path.startsWith("/") ? path : `/${path}`;
  return new URL(safePath, SEO_CONFIG.baseUrl).toString();
}

export function withFragment(url, fragment) {
  if (!fragment) return url;
  const safeFragment = fragment.startsWith("#") ? fragment : `#${fragment}`;
  return `${url}${safeFragment}`;
}
