export function matchesMimeAccept(mimeType: string, mimeAccept: string): boolean {
  if (!mimeAccept) return true;
  const parts = mimeAccept.split(',');
  for (const part of parts) {
    const trimmed = part.trim();

    if (trimmed === mimeType) {
      return true;
    }

    if (trimmed.endsWith('/*') && mimeType.startsWith(trimmed.slice(0, -2))) {
      return true;
    }
  }
  return false;
}
