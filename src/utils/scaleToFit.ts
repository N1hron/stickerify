function scaleToFit(width: number, height: number, maxWidth: number, maxHeight: number) {
    const widthScale = maxWidth / width;
    const heightScale = maxHeight / height;

    const scale = Math.min(1, widthScale, heightScale);

    return {
        width: scale * width,
        height: scale * height,
    };
}

export { scaleToFit };
