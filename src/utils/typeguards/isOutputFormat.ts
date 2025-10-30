import { OutputFormat } from '@types';

function isOutputFormat(param: unknown): param is OutputFormat {
    return param === 'webp' || param === 'png';
}

export { isOutputFormat };
