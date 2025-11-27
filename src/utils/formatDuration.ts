export function formatDuration(seconds: number) {
  const s = seconds % 60;
  const m = ((seconds - s) / 60) % 60;
  const h = (seconds - s - m * 60) / 60 / 60;

  const ss = Math.floor(s).toString().padStart(2, '0');
  const mm = m.toString().padStart(2, '0');
  const hh = h.toString().padStart(2, '0');

  return `${hh}:${mm}:${ss}`;
}
