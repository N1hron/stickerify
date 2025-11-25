export function splitFileName(name: string): [baseName: string, extension: string] {
  const ext = name.match(/\.[^.]+$/)?.[0];

  if (!ext) {
    return [name, ''];
  }

  const baseName = name.slice(0, -ext.length);
  const extWithoutDot = ext.slice(1);

  return [baseName, extWithoutDot];
}
