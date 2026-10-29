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

// Convert Loom, YouTube, or Vimeo URLs to embed form.
// Returns null when the URL isn't a recognized video host.
export function getVideoEmbedUrl(input: string): string | null {
  if (!input) return null;
  const trimmed = input.trim();

  const loom = getLoomEmbedUrl(trimmed);
  if (loom) return loom;

  // YouTube: watch?v=, youtu.be/, /shorts/, /embed/
  const yt = trimmed.match(
    /(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{6,})/
  );
  if (yt) {
    return `https://www.youtube.com/embed/${yt[1]}`;
  }

  // Vimeo: vimeo.com/<id>
  const vimeo = trimmed.match(/vimeo\.com\/(\d+)/);
  if (vimeo) {
    return `https://player.vimeo.com/video/${vimeo[1]}`;
  }

  return null;
}
