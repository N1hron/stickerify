import { HorizontalAlignment, Settings, TranscoderFile, VerticalAlignment } from '@types';
import { FILE_SIZE_PX } from '@config';
import { isOutputFormat } from '@/utils/typeguards/isOutputFormat';
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

function createCommandScale({
    stickerSizeType,
    horizontalAlignment,
    verticalAlignment,
    removeEmptySpaces,
    scaleUpSmallStickers,
}: Settings) {
    const sizePx = FILE_SIZE_PX[stickerSizeType];
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

function createTransformOptions(settings: Settings) {
    const scale = createCommandScale(settings);

    return [...oneFrame, ...scale, ...maxQualityWebp];
}

function createCommand(file: TranscoderFile, settings: Settings) {
    const id = file.id;

    const inputExt = file.input.ext;
    const outputExt = isOutputFormat(settings.outputFormat) ? settings.outputFormat : 'webp';
    const writeName = `file-${id}.${inputExt}`;
    const readName = `file-${id}-out.${outputExt}`;

    const inputOptions = ['-i', writeName];
    const transformOptions = createTransformOptions(settings);
    const outputOptions = [readName];

    const command = [...inputOptions, ...transformOptions, ...outputOptions];

    return {
        command,
        writeName,
        readName,
        outputExt,
    };
}

export { createCommand };
