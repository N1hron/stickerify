function devLog(...params: Parameters<typeof console.log>) {
    if (import.meta.env.DEV) {
        console.log(...params);
    }
}

export { devLog };
