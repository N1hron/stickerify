function scaleToContain(width: number, height: number, maxWidth: number, maxHeight: number) {
    const widthScale = width === 0 ? width : maxWidth / width;
    const heightScale = height === 0 ? height : maxHeight / height;

    const scale = Math.min(widthScale, heightScale);

    return {
        width: scale * width,
        height: scale * height,
    };
}

export { scaleToContain };
