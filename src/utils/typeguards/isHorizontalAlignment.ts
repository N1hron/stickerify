import { HorizontalAlignment } from '@types';

function isHorizontalAlignment(param: unknown): param is HorizontalAlignment {
    return param === 'left' || param === 'middle' || param === 'right';
}

export { isHorizontalAlignment };
