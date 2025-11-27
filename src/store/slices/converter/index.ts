import { createAsyncThunk, createSlice, nanoid, type PayloadAction } from '@reduxjs/toolkit';

import { addUploaderItem, removeUploaderItem } from '../uploader';
import { StaticConverter } from '@/converter';
import { loadImage, loadVideoMetadata, seekVideo, splitFileName } from '@/utils';
import type { ConverterItem, ResultData } from '@/types';
import type { AppDispatch, AppState } from '../..';

type ConverterState = {
  items: Record<string, ConverterItem>;
  results: ResultData[];
};

const initialState: ConverterState = {
  items: {},
  results: [],
};

const converterSlice = createSlice({
  name: 'converter',
  initialState,
  reducers: {
    addResult(state, action: PayloadAction<ResultData>) {
      state.results.push(action.payload);
    },
    removeResult(state, action: PayloadAction<string>) {
      state.results = state.results.filter((result) => result.id !== action.payload);
    },
  },
  selectors: {
    selectConversionStatus(state, signature: string) {
      return state.items[signature].status;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(addUploaderItem, (state, action) => {
        const { signature, data } = action.payload;

        state.items[signature] = {
          status: 'idle',
          settings: {
            type: data.type === 'image' ? 'static' : 'video',
            from: 0,
            to: Math.min(data.duration, 3),
          },
        };
      })
      .addCase(removeUploaderItem, (state, action) => {
        delete state.items[action.payload];
      })
      .addCase(convertFile.pending, (state, action) => {
        state.items[action.meta.arg].status = 'loading';
      })
      .addCase(convertFile.fulfilled, (state, action) => {
        state.items[action.meta.arg].status = 'success';
      })
      .addCase(convertFile.rejected, (state, action) => {
        state.items[action.meta.arg].status = 'error';
      });
  },
});

export const converterReducer = converterSlice.reducer;
export const { addResult, removeResult } = converterSlice.actions;
export const { selectConversionStatus } = converterSlice.selectors;

export const convertFile = createAsyncThunk<
  void,
  string,
  {
    dispatch: AppDispatch;
    state: AppState;
  }
>('converter/convertFile', async (signature, { dispatch, getState }) => {
  const state = getState();
  const item = state.uploader.items.find((item) => item.signature === signature);

  if (!item) {
    return;
  }

  const settings = state.outputSettings.items;
  const staticConverter = new StaticConverter();

  let source: HTMLImageElement | HTMLVideoElement;

  if (item.data.type === 'image') {
    source = await loadImage(item.data.url);
  } else {
    source = await loadVideoMetadata(item.data.url);
    await seekVideo(source, 0);
  }

  staticConverter.setSettings(state.outputSettings.items);
  staticConverter.setSource(source);

  const blob = await staticConverter.run();
  const url = URL.createObjectURL(blob);

  staticConverter.clearSource();

  dispatch(
    addResult({
      id: nanoid(),
      name: splitFileName(item.data.name)[0] + '.' + settings.staticFormat,
      url,
    })
  );
});
