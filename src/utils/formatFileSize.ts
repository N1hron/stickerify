function formatFileSize(bytes: number): string {
    const units = ['B', 'KB', 'MB', 'GB'];

    let amount = bytes;
    let unitIndex = 0;

    while (true) {
        if (amount < 1024 || unitIndex === units.length - 1) {
            return `${amount.toPrecision(4)} ${units[unitIndex]}`;
        }

        amount /= 1024;
        unitIndex++;
    }
}

export { formatFileSize };
