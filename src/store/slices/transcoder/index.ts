import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { FILE_LIMIT } from '@config';
import { prepareFiles, findFile, revokeFileURLs } from './utils';
import { loadTranscoder, transcodeSelectedFiles } from './thunks';
import {
    TranscoderFile,
    TranscoderFileOutput,
    TranscoderFileStatus,
    TranscoderStatus,
} from '@types';

type TranscoderSliceState = {
    files: TranscoderFile[];
    status: TranscoderStatus;
};

const initialState: TranscoderSliceState = {
    files: [],
    status: 'idle',
};

const transcoderSlice = createSlice({
    name: 'transcoder',
    initialState,
    reducers: {
        addFiles: {
            reducer: (state, action: PayloadAction<TranscoderFile[]>) => {
                state.files = [...state.files, ...action.payload].slice(0, FILE_LIMIT);
            },
            prepare: prepareFiles,
        },
        setFileSelection: (state, action: PayloadAction<[string, boolean]>) => {
            const [id, isSelected] = action.payload;
            const file = findFile(state.files, id);

            if (file) file.isSelected = isSelected;
        },
        setAllFilesSelection: (state, action: PayloadAction<boolean>) => {
            state.files.forEach((file) => (file.isSelected = action.payload));
        },
        setFileOutput: (state, action: PayloadAction<[string, TranscoderFileOutput]>) => {
            const [id, outputFile] = action.payload;
            const file = findFile(state.files, id);

            if (file) file.output = outputFile;
        },
        setFileStatus: (
            state,
            action: PayloadAction<{
                id: string;
                status: TranscoderFileStatus;
                message?: string;
            }>
        ) => {
            const { id, status, message } = action.payload;
            const file = findFile(state.files, id);

            if (file) {
                file.status = status;
                file.message = message;
            }
        },
        removeSelectedFiles: (state) => {
            state.files = state.files.filter((file) => {
                if (file.isSelected) {
                    return revokeFileURLs(file);
                }
                return true;
            });
        },
        removeAllFiles: (state) => {
            state.files.forEach(revokeFileURLs);
            state.files = [];
        },
        renameFile: (state, action: PayloadAction<[string, string]>) => {
            const [id, newName] = action.payload;
            const file = findFile(state.files, id);

            if (file) {
                file.output.name = newName;
            }
        },
        setStatus: (state, action: PayloadAction<TranscoderStatus>) => {
            state.status = action.payload;
        },
    },
    extraReducers(builder) {
        builder.addCase(loadTranscoder.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(loadTranscoder.rejected, (state) => {
            state.status = 'error';
        });
        builder.addCase(loadTranscoder.fulfilled, (state) => {
            state.status = 'ready';
        });
    },
});

export const reducer = transcoderSlice.reducer;

export * from './selectors';
export { loadTranscoder, transcodeSelectedFiles };
export const {
    addFiles,
    setFileSelection,
    setAllFilesSelection,
    removeSelectedFiles,
    removeAllFiles,
    renameFile,
    setFileOutput,
    setFileStatus,
    setStatus,
} = transcoderSlice.actions;
