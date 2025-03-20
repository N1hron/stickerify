import { isAction, PayloadAction } from '@reduxjs/toolkit';

function isPayloadAction(param: unknown): param is PayloadAction<unknown> {
    return isAction(param) && 'payload' in param;
}

export { isPayloadAction };
