// Extract only first frame
const oneFrame = ['-frames:v', '1'];

// Set max quality for webp
const maxQualityWebp = ['-quality', '100'];

// Scale up and down, remove empty spaces
const scaleTrimSpaces = (sizePx: number) => [
    '-vf',
    `scale=${sizePx}:${sizePx}:force_original_aspect_ratio=decrease`,
];

// Scale up and down, keep empty spaces
const scaleKeepSpaces = (sizePx: number, padX: string, padY: string) => [
    '-vf',
    `scale=${sizePx}:${sizePx}:force_original_aspect_ratio=decrease, pad=${sizePx}:${sizePx}:${padX}:${padY}:color=0x00000000`,
];

// Scale down if source too big, remove empty spaces where possible
const scaleDownTrimSpaces = (sizePx: number, padX: string) => [
    '-vf',
    `scale='min(iw, ${sizePx})':'min(ih, ${sizePx})':force_original_aspect_ratio=decrease, pad='if(gte(ih, ${sizePx}), min(iw, ${sizePx}), ${sizePx})':'min(ih, ${sizePx})':${padX}:0:color=0x00000000`,
];

// Scale down if source too big, keep empty spaces
const scaleDownKeepSpaces = (sizePx: number, padX: string, padY: string) => {
    return [
        '-vf',
        `scale='min(iw, ${sizePx})':'min(ih, ${sizePx})':force_original_aspect_ratio=decrease, pad=${sizePx}:${sizePx}:${padX}:${padY}:color=0x00000000`,
    ];
};

export {
    oneFrame,
    maxQualityWebp,
    scaleTrimSpaces,
    scaleKeepSpaces,
    scaleDownTrimSpaces,
    scaleDownKeepSpaces,
};
