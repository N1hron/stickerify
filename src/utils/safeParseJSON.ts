export function safeParseJSON(json: unknown): unknown {
  try {
    if (typeof json !== 'string') {
      return null;
    }

    return JSON.parse(json);
  } catch {
    return null;
  }
}
