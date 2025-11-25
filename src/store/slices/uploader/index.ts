import {
  createAsyncThunk,
  createSlice,
  isAnyOf,
  nanoid,
  type PayloadAction,
} from '@reduxjs/toolkit';

import { config } from '@/config';
import type { AppDispatch, AppState } from '@/store';
import type { UploaderItem, FileData } from '@/types';
import { generateFileData } from './utils';

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
    selectUploaderItemsCount(state) {
      return state.items.length;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(uploadFiles.pending, (state) => {
        state.isUploading = true;
      })
      .addMatcher(isAnyOf(uploadFiles.fulfilled, uploadFiles.rejected), (state) => {
        state.isUploading = false;
      });
  },
});

export const uploaderReducer = uploaderSlice.reducer;
export const { addUploaderItem, removeUploaderItem, setIsUploading } = uploaderSlice.actions;
export const { selectUploaderItems, selectCanUpload, selectUploaderItemsCount } =
  uploaderSlice.selectors;

export const uploadFiles = createAsyncThunk<
  void,
  FileList,
  { dispatch: AppDispatch; state: AppState }
>('uploader/uploadFiles', async (files, { dispatch, getState }) => {
  const items = getState().uploader.items;
  for await (const fileData of generateFileData(files, items)) {
    dispatch(addUploaderItem(fileData));
  }
});
