import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import { removeUploaderItem } from '../slices/uploader';
import { removeResult } from '../slices/converter';
import type { AppState } from '..';

const listener = createListenerMiddleware<AppState>();

listener.startListening({
  matcher: isAnyOf(removeUploaderItem, removeResult),
  effect(action, { getOriginalState }) {
    if (removeUploaderItem.match(action)) {
      const item = getOriginalState().uploader.items.find((i) => i.signature === action.payload);

      if (item) {
        URL.revokeObjectURL(item.data.url);
      }
    }

    if (removeResult.match(action)) {
      const result = getOriginalState().converter.results.find((r) => r.id === action.payload);

      if (result) {
        URL.revokeObjectURL(result.url);
      }
    }
  },
});

export const revokeObjectURLsMiddleware = listener.middleware;
