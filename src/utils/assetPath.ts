/**
 * Safely resolves an asset path regardless of whether the site is running on:
 * - Localhost (Next.js dev / start)
 * - Vercel / Netlify (custom domain or root domain)
 * - GitHub Pages (https://<user>.github.io/<repo>/ subpath)
 */
export function getAssetPath(path: string): string {
  if (!path) return "";
  if (
    path.startsWith("http://") ||
    path.startsWith("https://") ||
    path.startsWith("data:") ||
    path.startsWith("blob:")
  ) {
    return path;
  }

  const clean = path.startsWith("/") ? path.slice(1) : path;

  // Environment variable override (e.g. NEXT_PUBLIC_BASE_PATH)
  const envBase = process.env.NEXT_PUBLIC_BASE_PATH;
  if (envBase) {
    const trimmed = envBase.replace(/^\/|\/$/g, "");
    return trimmed ? `/${trimmed}/${clean}` : `/${clean}`;
  }

  // Runtime detection for GitHub Pages subpath (e.g. /PORTFOLIO/)
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname;
    const pathname = window.location.pathname;

    if (hostname.endsWith("github.io")) {
      const segments = pathname.split("/").filter(Boolean);
      if (segments.length > 0) {
        const repo = segments[0];
        // If the first segment is not a static folder
        if (!["_next", "images", "videos", "sequence"].includes(repo.toLowerCase())) {
          return `/${repo}/${clean}`;
        }
      }
    }
  }

  return `/${clean}`;
}
