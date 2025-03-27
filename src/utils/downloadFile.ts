function downloadFile(url: string, name: string) {
    const link = document.createElement('a');

    link.href = url;
    link.download = name;
    link.className = 'visually-hidden';

    document.documentElement.append(link);
    link.click();
    link.remove();
}

export { downloadFile };
