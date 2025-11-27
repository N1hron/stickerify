import { clamp, devLog } from '@/utils';
import { config } from '@/config';
import type { OutputSettings, WidthHeight, XY } from '@/types';

export class StaticConverter {
  #canvas: OffscreenCanvas;
  #context: OffscreenCanvasRenderingContext2D;
  #settings: OutputSettings | null = null;
  #source: HTMLImageElement | HTMLVideoElement | null = null;

  constructor() {
    const canvas = new OffscreenCanvas(0, 0);
    const context = canvas.getContext('2d');

    if (!context) {
      throw new Error('Failed to construct StaticConverter, canvas context is empty');
    }

    this.#canvas = canvas;
    this.#context = context;
  }

  async run() {
    if (!this.#source) {
      throw new Error('Conversion error: input is empty');
    }

    if (!this.#settings) {
      throw new Error('Conversion error: settings are empty');
    }

    const inputSize = this.#getSourceSize();
    const outputSize = this.#calcOutputSize(inputSize);
    const canvasSize = this.#calcCanvasSize(outputSize);
    const startingPoint = this.#calcStartingPoint(canvasSize, outputSize);

    devLog('Output size:', outputSize);
    devLog('Canvas size:', canvasSize);
    devLog('Starting pont:', startingPoint);

    this.#clearCanvas();
    this.#setCanvasSize(...canvasSize);

    this.#context.drawImage(
      this.#source,
      startingPoint[0],
      startingPoint[1],
      outputSize[0],
      outputSize[1]
    );

    const type = 'image';
    const subtype = this.#settings.staticFormat;

    return this.#canvas.convertToBlob({
      type: `${type}/${subtype}`,
      quality: 0.99,
    });
  }

  setSettings(settings: OutputSettings) {
    this.#settings = settings;
  }

  setSource(source: HTMLImageElement | HTMLVideoElement) {
    this.#source = source;
  }

  clearSource() {
    this.#source = null;
  }

  #clearCanvas() {
    const { width, height } = this.#canvas;
    this.#context.clearRect(0, 0, width, height);
  }

  #setCanvasSize(width: number, height: number) {
    this.#canvas.width = width;
    this.#canvas.height = height;
  }

  #calcStartingPoint(canvasSize: WidthHeight, outputSize: WidthHeight): XY {
    const x = this.#calcStartingPointX(canvasSize[0], outputSize[0]);
    const y = this.#calcStartingPointY(canvasSize[1], outputSize[1]);

    return [x, y];
  }

  #calcStartingPointX(canvasWidth: number, outputWidth: number) {
    if (!this.#settings) {
      throw new Error('Settings are empty');
    }

    switch (this.#settings.horizontalAlignment) {
      case 'left':
        return 0;
      case 'middle':
        return (canvasWidth - outputWidth) / 2;
      case 'right':
        return canvasWidth - outputWidth;
    }
  }

  #calcStartingPointY(canvasHeight: number, outputHeight: number) {
    if (!this.#settings) {
      throw new Error('Settings are empty');
    }

    switch (this.#settings.verticalAlignment) {
      case 'top':
        return 0;
      case 'middle':
        return (canvasHeight - outputHeight) / 2;
      case 'bottom':
        return canvasHeight - outputHeight;
    }
  }

  #calcCanvasSize(outputSize: WidthHeight): WidthHeight {
    if (!this.#settings) {
      throw new Error('Settings are empty');
    }

    const { sizeType, trim } = this.#settings;
    const stickerSize = config.stickerSize[sizeType];

    if (sizeType === 'sticker' && trim) {
      if (outputSize[0] >= stickerSize || outputSize[1] >= stickerSize) {
        const width = clamp(0, outputSize[0], stickerSize);
        const height = clamp(0, outputSize[1], stickerSize);

        return [width, height];
      }
      return [stickerSize, outputSize[1]];
    }
    return [stickerSize, stickerSize];
  }

  #calcOutputSize(sourceSize: WidthHeight): WidthHeight {
    const [xScale, yScale] = this.#calcOutputScale(sourceSize);
    const outputWidth = sourceSize[0] * xScale;
    const outputHeight = sourceSize[1] * yScale;

    return [outputWidth, outputHeight];
  }

  #calcOutputScale(sourceSize: WidthHeight): XY {
    if (!this.#settings) {
      throw new Error('Settings are empty');
    }

    const stickerSize = config.stickerSize[this.#settings.sizeType];
    const xScale = stickerSize / sourceSize[0];
    const yScale = stickerSize / sourceSize[1];
    const resizeMode = this.#settings.resizeMode;

    switch (resizeMode) {
      case 'fill': {
        return [xScale, yScale];
      }
      case 'contain': {
        const scale = Math.min(xScale, yScale);
        return [scale, scale];
      }
      case 'cover': {
        const scale = Math.max(xScale, yScale);
        return [scale, scale];
      }
      case 'scale down': {
        const scale = Math.min(xScale, yScale, 1);
        return [scale, scale];
      }
    }
  }

  #getSourceSize(): WidthHeight {
    const source = this.#source;

    if (source instanceof HTMLImageElement) {
      return [source.naturalWidth, source.naturalHeight];
    }

    if (source instanceof HTMLVideoElement) {
      return [source.videoWidth, source.videoHeight];
    }

    return [0, 0];
  }
}
