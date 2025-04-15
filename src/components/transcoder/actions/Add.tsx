import { useAppDispatch, useAppSelector } from '@store/hooks';
import { addFiles, selectAllowAdd } from '@slices/transcoder';
import { FILE_ACCEPT } from '@/config';
import { FileInput } from '@ui';

function Add() {
    const dispatch = useAppDispatch();
    const allowAdd = useAppSelector(selectAllowAdd);

    function handleFilesChange(files: File[]) {
        dispatch(addFiles(files));
    }

    return (
        <FileInput
            label='Add'
            accept={FILE_ACCEPT}
            disabled={!allowAdd}
            mini
            onChange={handleFilesChange}
        />
    );
}

export { Add };
