import { VerticalAlignment } from '../../types';

function isVerticalAlignment(param: unknown): param is VerticalAlignment {
    return param === 'top' || param === 'middle' || param === 'bottom';
}

export { isVerticalAlignment };
