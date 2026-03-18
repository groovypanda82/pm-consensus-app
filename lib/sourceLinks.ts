let cache: Record<string, string> | null = null;

export async function getSourceLinks(): Promise<Record<string, string>> {
  if (cache) return cache;
  const res = await fetch("/source-links.json");
  cache = await res.json();
  return cache!;
}

export function sourceUrl(links: Record<string, string>, source: string): string {
  return links[source] ?? "#";
}
