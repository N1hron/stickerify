import { config } from '@/config';
import type { UploaderItem, FileData } from '@/types';
import { createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit';

type UploaderState = {
  items: UploaderItem[];
  isUploading: boolean;
};

const initialState: UploaderState = {
  items: [],
  isUploading: false,
};

const uploaderSlice = createSlice({
  name: 'uploader',
  initialState,
  reducers: {
    addUploaderItem: {
      reducer(state, action: PayloadAction<UploaderItem>) {
        state.items.push(action.payload);
      },
      prepare(fileData: FileData): { payload: UploaderItem } {
        return {
          payload: {
            id: nanoid(),
            fileData,
          },
        };
      },
    },
    removeUploaderItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    setIsUploading(state, action: PayloadAction<boolean>) {
      state.isUploading = action.payload;
    },
  },
  selectors: {
    selectUploaderItems(state) {
      return state.items;
    },
    selectCanUpload(state) {
      return !state.isUploading && state.items.length < config.maxFiles;
    },
  },
});

export const uploaderReducer = uploaderSlice.reducer;
export const { selectUploaderItems, selectCanUpload } = uploaderSlice.selectors;
export const { addUploaderItem, removeUploaderItem, setIsUploading } = uploaderSlice.actions;
