import {
    createAsyncThunk,
    createSelector,
    createSlice,
    nanoid,
    PayloadAction,
} from '@reduxjs/toolkit';

import { FileData, TranscoderStatus } from '../../types';
import { config } from '../../config';
import { load } from '../../ffmpeg';

const loadFFmpeg = createAsyncThunk('transcoder/loadFFmpeg', load);

type TranscoderSliceState = {
    files: FileData[];
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
        setStatus: (state, action: PayloadAction<TranscoderSliceState['status']>) => {
            state.status = action.payload;
        },
        addFiles: {
            reducer: (state, action: PayloadAction<FileData[]>) => {
                state.files = [...state.files, ...action.payload].slice(0, config.fileLimit);
            },
            prepare(files: File[]) {
                return {
                    payload: files.map<FileData>((file) => {
                        const ext = file.name.match(/\.[^.]+$/)?.[0] || '';
                        const name = file.name.replace(ext, '');

                        return {
                            id: nanoid(),
                            input: { name, ext, size: file.size, url: URL.createObjectURL(file) },
                            output: { name, ext: null, size: null, url: null },
                            status: 'idle',
                            isSelected: false,
                        };
                    }),
                };
            },
        },
        setIsSelected: (
            state,
            action: PayloadAction<{
                id: FileData['id'];
                isSelected: FileData['isSelected'];
            }>
        ) => {
            const { id, isSelected } = action.payload;
            const file = state.files.find((file) => file.id === id);
            if (file) {
                file.isSelected = isSelected;
            }
        },
        setIsSelectedAll: (state, action: PayloadAction<FileData['isSelected']>) => {
            state.files.forEach((file) => {
                file.isSelected = action.payload;
            });
        },
        renameFile: (
            state,
            action: PayloadAction<{
                id: FileData['id'];
                name: string;
            }>
        ) => {
            const { id, name } = action.payload;
            const file = state.files.find((file) => file.id === id);
            if (file) {
                file.output.name = name;
            }
        },
        removeSelectedFiles: (state) => {
            state.files = state.files.filter((file) => !file.isSelected);
        },
        clearFiles: (state) => {
            state.files = initialState.files;
        },
    },
    extraReducers(builder) {
        builder.addCase(loadFFmpeg.pending, (state) => {
            state.status = 'loading';
        });
        builder.addCase(loadFFmpeg.rejected, (state) => {
            state.status = 'error';
        });
        builder.addCase(loadFFmpeg.fulfilled, (state) => {
            state.status = 'ready';
        });
    },
    selectors: {
        selectTranscoderStatus: (state) => state.status,
        selectAllFiles: (state) => state.files,
        selectIsAllFilesSelected: (state) => {
            if (state.files.length === 0) return false;
            return state.files.every((file) => file.isSelected === true);
        },
        selectHasSelectedFiles: (state) => {
            if (state.files.length === 0) return false;
            return !!state.files.find((file) => file.isSelected === true);
        },
        selectIsFilesEmpty: (state) => state.files.length === 0,
    },
});

export const reducer = transcoderSlice.reducer;
export { loadFFmpeg };

export const {
    selectTranscoderStatus,
    selectAllFiles,
    selectIsAllFilesSelected,
    selectHasSelectedFiles,
    selectIsFilesEmpty,
} = transcoderSlice.selectors;

export const {
    setStatus,
    addFiles,
    setIsSelected,
    setIsSelectedAll,
    removeSelectedFiles,
    clearFiles,
    renameFile,
} = transcoderSlice.actions;

export const selectSelectedFiles = createSelector([selectAllFiles], (files) =>
    files.filter((file) => file.isSelected)
);

export const selectAllowTranscode = createSelector([selectSelectedFiles], (selectedFiles) => {
    return !!(selectedFiles.length && selectedFiles.every((file) => !file.output.url));
});

export const selectAllowDownload = createSelector([selectSelectedFiles], (selectedFiles) => {
    return !!(selectedFiles.length && selectedFiles.every((file) => file.output.url));
});

export const selectAllowRemove = createSelector([selectSelectedFiles], (selectedFiles) => {
    return !!selectedFiles.length;
});
