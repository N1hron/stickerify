function safeParseJson(text: unknown): unknown {
    if (typeof text !== 'string') return null;
    try {
        const res: unknown = JSON.parse(text);
        return res;
    } catch {
        return null;
    }
}

export { safeParseJson };
