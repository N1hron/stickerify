import { createSelector, createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { config } from '../../config';

import { FileData } from '../../types';

type FilesSliceState = {
    items: FileData[];
};

const initialState: FilesSliceState = {
    items: [],
};

const filesSlice = createSlice({
    name: 'files',
    initialState,
    reducers: {
        addFiles: {
            reducer: (state, action: PayloadAction<FileData[]>) => {
                state.items = [...state.items, ...action.payload].slice(0, config.fileLimit);
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
            const file = state.items.find((file) => file.id === id);
            if (file) {
                file.isSelected = isSelected;
            }
        },
        setIsSelectedAll: (state, action: PayloadAction<FileData['isSelected']>) => {
            state.items.forEach((file) => {
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
            const file = state.items.find((file) => file.id === id);
            if (file) {
                file.output.name = name;
            }
        },
        removeSelectedFiles: (state) => {
            state.items = state.items.filter((file) => !file.isSelected);
        },
        clearFiles: (state) => {
            state.items = initialState.items;
        },
    },
    selectors: {
        selectAllFiles: (state) => state.items,
        selectIsAllFilesSelected: (state) => {
            if (state.items.length === 0) return false;
            return state.items.every((file) => file.isSelected === true);
        },
        selectHasSelectedFiles: (state) => {
            if (state.items.length === 0) return false;
            return !!state.items.find((file) => file.isSelected === true);
        },
        selectIsFilesEmpty: (state) => state.items.length === 0,
    },
});

export const reducer = filesSlice.reducer;
export const {
    selectAllFiles,
    selectIsAllFilesSelected,
    selectHasSelectedFiles,
    selectIsFilesEmpty,
} = filesSlice.selectors;
export const {
    addFiles,
    setIsSelected,
    setIsSelectedAll,
    removeSelectedFiles,
    clearFiles,
    renameFile,
} = filesSlice.actions;

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
