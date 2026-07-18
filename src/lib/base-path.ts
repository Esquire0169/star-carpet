/** Base path for GitHub Pages (`/star-carpet`) or empty for local/prod root. */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export function withBase(path: string): string {
  if (!path.startsWith("/")) return `${basePath}/${path}`;
  return `${basePath}${path}`;
}
