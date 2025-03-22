import { ChangeEvent, memo } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { renameFile, setFileSelection } from '../../store/slices/transcoder';
import { FileData } from '../../types';
import { Divider, Checkbox, Card } from '../ui';
import { formatFileSize } from '../../utils';

import styles from './style.module.scss';

type FileListItemProps = {
    index: number;
    fileData: FileData;
};

function FileListItemInner({ index, fileData }: FileListItemProps) {
    const dispatch = useAppDispatch();

    const number = index + 1;
    const { name } = fileData.output;
    const { ext, size } = fileData.input;
    const { id, status, isSelected } = fileData;

    function handleFileSelect(value: boolean) {
        dispatch(setFileSelection([id, value]));
    }

    function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
        dispatch(renameFile([id, event.target.value]));
    }

    return (
        <Card className={styles.listItem} as='li' mini>
            <div>{number}</div>
            <input className={styles.rename} type='text' value={name} onChange={handleNameChange} />
            <div>{ext.slice(1)}</div>
            <div>{formatFileSize(size)}</div>
            <div>{status}</div>
            <Divider horizontal />
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
