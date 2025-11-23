export function devLog(...params: unknown[]) {
  if (import.meta.env.DEV) {
    console.log(...params);
  }
}
