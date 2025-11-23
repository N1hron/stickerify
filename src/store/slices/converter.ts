import { createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit';

import type { ConverterFile, FileData } from '@/types';

type ConverterState = {
  isUploading: boolean;
  files: ConverterFile[];
};

const initialState: ConverterState = {
  isUploading: false,
  files: [],
};

const converter = createSlice({
  name: 'converter',
  initialState,
  reducers: {
    setIsUploading(state, action: PayloadAction<boolean>) {
      state.isUploading = action.payload;
    },
    addFile(state, action: PayloadAction<FileData>) {
      const isImage = action.payload.type.startsWith('image/');

      state.files.push({
        ...action.payload,
        id: nanoid(),
        status: 'idle',
        settings: {
          type: isImage ? 'static' : 'video',
          from: 0,
          to: Math.min(3, action.payload.duration),
        },
      });
    },
  },
  selectors: {
    selectIsUploading(state) {
      return state.isUploading;
    },
    selectFiles(state) {
      return state.files;
    },
  },
});

export const converterReducer = converter.reducer;
export const { setIsUploading, addFile } = converter.actions;
export const { selectIsUploading, selectFiles } = converter.selectors;
