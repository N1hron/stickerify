import {
    HorizontalAlignment,
    OutputSettings,
    StickerMotionType,
    StickerSizeType,
    VerticalAlignment,
} from '@/types';
import {
    maxQualityWebp,
    oneFrame,
    scaleDownKeepSpaces,
    scaleDownTrimSpaces,
    scaleKeepSpaces,
    scaleTrimSpaces,
} from './commands';

function getPaddingX(sizePx: number, horizontalAlignment: HorizontalAlignment) {
    switch (horizontalAlignment) {
        case 'left':
            return '0';
        case 'middle':
            return `(${sizePx}-iw)/2`;
        case 'right':
            return `(${sizePx}-iw)`;
    }
}

function getPaddingY(sizePx: number, verticalAlignment: VerticalAlignment) {
    switch (verticalAlignment) {
        case 'top':
            return '0';
        case 'middle':
            return `(${sizePx}-ih)/2`;
        case 'bottom':
            return `(${sizePx}-ih)`;
    }
}

function getPadding(
    sizePx: number,
    horizontalAlignment: HorizontalAlignment,
    verticalAlignment: VerticalAlignment
) {
    const padX = getPaddingX(sizePx, horizontalAlignment);
    const padY = getPaddingY(sizePx, verticalAlignment);

    return [padX, padY] as const;
}

function getSizePx(stickerSizeType: StickerSizeType) {
    return stickerSizeType === 'emoji' ? 100 : 512;
}

function getOutputExt(stickerMotionType: StickerMotionType) {
    return stickerMotionType === 'static' ? 'webp' : 'webm';
}

function createCommandScale({
    stickerSizeType,
    horizontalAlignment,
    verticalAlignment,
    removeEmptySpaces,
    scaleUpSmallStickers,
}: OutputSettings) {
    const sizePx = getSizePx(stickerSizeType);
    const [padX, padY] = getPadding(sizePx, horizontalAlignment, verticalAlignment);

    switch (stickerSizeType) {
        case 'sticker': {
            if (scaleUpSmallStickers) {
                if (removeEmptySpaces) {
                    return scaleTrimSpaces(sizePx);
                } else {
                    return scaleKeepSpaces(sizePx, padX, padY);
                }
            } else {
                if (removeEmptySpaces) {
                    return scaleDownTrimSpaces(sizePx, padX);
                } else {
                    return scaleDownKeepSpaces(sizePx, padX, padY);
                }
            }
        }
        case 'emoji': {
            if (scaleUpSmallStickers) {
                return scaleKeepSpaces(sizePx, padX, padY);
            } else {
                return scaleDownKeepSpaces(sizePx, padX, padY);
            }
        }
    }
}

function createCommandStatic(inputName: string, outputName: string, settings: OutputSettings) {
    const scale = createCommandScale(settings);

    return ['-i', inputName].concat(oneFrame, scale, maxQualityWebp, [outputName]);
}

// TODO
function createCommandVideo() {
    return [];
}

function createCommand(inputName: string, outputName: string, settings: OutputSettings) {
    switch (settings.stickerMotionType) {
        case 'static':
            return createCommandStatic(inputName, outputName, settings);
        case 'video':
            return createCommandVideo();
    }
}

export { createCommand, getOutputExt };
