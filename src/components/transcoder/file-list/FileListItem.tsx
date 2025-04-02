import { ChangeEvent, memo } from 'react';

import { useAppDispatch } from '@store/hooks';
import { renameFile, setFileSelection } from '@slices/transcoder';
import { TranscoderFile } from '@types';
import { Divider, Checkbox, Card } from '@components/ui';
import { formatFileSize } from '@utils';

import styles from '../style.module.scss';

type FileListItemProps = {
    number: number;
    file: TranscoderFile;
};

function FileListItemInner({ number, file }: FileListItemProps) {
    const dispatch = useAppDispatch();

    const { id, isSelected } = file;
    const name = file.output.name;

    const inputExt = file.input.ext;
    const inputSize = file.input.size;

    const outputExt = file.output.ext;
    const outputSize = file.output.size;

    function handleFileSelect(value: boolean) {
        dispatch(setFileSelection([id, value]));
    }

    function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
        dispatch(renameFile([id, event.target.value]));
    }

    return (
        <Card className={styles.fileListItem} as='li'>
            <div>{number}</div>
            <input type='text' value={name} onChange={handleNameChange} />
            <div>{outputExt || inputExt}</div>
            <div>{formatFileSize(outputSize || inputSize)}</div>
            <Divider vertical />
            <Checkbox
                label='Select file'
                hideLabel
                checked={isSelected}
                onChange={handleFileSelect}
            />
        </Card>
    );
}

const FileListItem = memo(FileListItemInner) as typeof FileListItemInner;

export { FileListItem };
