import { createAsyncThunk } from '@reduxjs/toolkit';

import { load, transcode } from '@/ffmpeg';
import { AppDispatch, RootState } from '@/store';
import { setFileOutput, setFileStatus, setTranscoderStatus } from '@slices/transcoder';

const loadTranscoder = createAsyncThunk('transcoder/loadTranscoder', load);

const transcodeSelectedFiles = createAsyncThunk<
    void,
    undefined,
    { dispatch: AppDispatch; state: RootState }
>('transcoder/transcodeSelectedFiles', async (_, { getState, dispatch }) => {
    const selectedFiles = getState().transcoder.files.filter((file) => file.isSelected);
    const settings = getState().outputSettings.items;

    dispatch(setTranscoderStatus('transcoding'));

    for (let i = 0; i < selectedFiles.length; i++) {
        const { id, input, output } = selectedFiles[i];

        dispatch(setFileStatus([id, 'transcoding']));

        await transcode(input, settings)
            .then((res) => {
                dispatch(setFileOutput([id, { ...output, ...res }]));
                dispatch(setFileStatus([id, 'success']));
            })
            .catch((error) => {
                console.log(error);
                dispatch(setFileStatus([id, 'error']));
            });
    }

    dispatch(setTranscoderStatus('ready'));
});

export { loadTranscoder, transcodeSelectedFiles };
