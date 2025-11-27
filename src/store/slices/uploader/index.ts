import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { config } from '@/config';
import { createFileSignature, getVideoDuration } from './utils';
import type { UploaderItem } from '@/types';
import type { AppDispatch, AppState } from '@/store';

type UploaderState = {
  items: UploaderItem[];
  searchTable: Record<string, true>;
};

const initialState: UploaderState = {
  items: [],
  searchTable: {},
};

const uploaderSlice = createSlice({
  name: 'uploader',
  initialState,
  reducers: {
    addUploaderItem(state, action: PayloadAction<UploaderItem>) {
      state.items.push(action.payload);
      state.searchTable[action.payload.signature] = true;
    },
    removeUploaderItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.signature !== action.payload);
      delete state.searchTable[action.payload];
    },
  },
  selectors: {
    selectUploaderItems(state) {
      return state.items;
    },
    selectCanUpload(state) {
      return state.items.length < config.maxFiles;
    },
    selectUploaderItemsCount(state) {
      return state.items.length;
    },
    selectShowDuration(state) {
      return !!state.items.find((item) => item.data.duration > 0);
    },
  },
});

export const uploaderReducer = uploaderSlice.reducer;
export const { addUploaderItem, removeUploaderItem } = uploaderSlice.actions;
export const {
  selectUploaderItems,
  selectCanUpload,
  selectUploaderItemsCount,
  selectShowDuration,
} = uploaderSlice.selectors;

export const uploadFiles = createAsyncThunk<
  void,
  FileList,
  {
    dispatch: AppDispatch;
    state: AppState;
  }
>('uploader/uploadFiles', async (files, { getState, dispatch }) => {
  for (const file of files) {
    const state = getState();
    const items = state.uploader.items;

    if (items.length >= config.maxFiles) {
      break;
    }

    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');

    if (!isImage && !isVideo) {
      continue;
    }

    const searchTable = state.uploader.searchTable;
    const signature = createFileSignature(file);
    const isNew = searchTable[signature] !== true;

    if (isNew) {
      let duration = 0;

      if (isVideo) {
        duration = await getVideoDuration(file);
      }

      dispatch(
        addUploaderItem({
          signature,
          data: {
            name: file.name,
            mime: file.type,
            type: isImage ? 'image' : 'video',
            size: file.size,
            duration,
            url: URL.createObjectURL(file),
          },
        })
      );
    }
  }
});
