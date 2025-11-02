import { UploadIcon } from '@components/icons';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { addFiles, selectAllowAdd } from '@slices/transcoder';
import { FILE_ACCEPT } from '@/config';
import { FileInput } from '@ui';

function Add() {
    const dispatch = useAppDispatch();
    const allowAdd = useAppSelector(selectAllowAdd);
    const showIcon = useMediaQuery('(max-width: 30em)');

    function handleFilesChange(files: File[]) {
        dispatch(addFiles(files));
    }

    return (
        <FileInput
            label='Upload'
            accept={FILE_ACCEPT}
            disabled={!allowAdd}
            mini
            onChange={handleFilesChange}
        >
            {showIcon ? <UploadIcon /> : 'Upload'}
        </FileInput>
    );
}

export { Add };
