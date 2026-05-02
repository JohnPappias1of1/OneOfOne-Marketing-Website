// Convert any Loom URL to its embed form.
// Accepts:
//   https://www.loom.com/share/<id>
//   https://www.loom.com/embed/<id>
//   raw <id>
export function getLoomEmbedUrl(input: string): string | null {
  if (!input) return null;
  const trimmed = input.trim();
  // raw id (alphanumeric, ~32 chars)
  if (/^[a-f0-9]{20,}$/i.test(trimmed)) {
    return `https://www.loom.com/embed/${trimmed}`;
  }
  const match = trimmed.match(/loom\.com\/(?:share|embed)\/([a-zA-Z0-9]+)/);
  if (match) {
    return `https://www.loom.com/embed/${match[1]}`;
  }
  return null;
}
