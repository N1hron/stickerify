function safeStringify(value: unknown): string | null {
    try {
        const res = JSON.stringify(value);
        return res;
    } catch {
        return null;
    }
}

export { safeStringify };
