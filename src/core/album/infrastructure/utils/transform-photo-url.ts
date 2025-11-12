export function transformPhotoUrl(url: string): string {
  const match = url.match(
    /https:\/\/via\.placeholder\.com\/(\d+)\/([0-9a-fA-F]{4,6})/
  );

  if (!match) {
    return url; // Return original URL if it doesn't match the expected pattern
  }

  const size = match[1];
  const color = match[2];

  return `https://placehold.co/${size}x${size}/${color}/${color}`;
}
