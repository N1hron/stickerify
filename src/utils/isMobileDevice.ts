function isMobileDevice(): boolean {
    return window.navigator.userAgent.includes('Mobi');
}

export { isMobileDevice };
