import { useAppDispatch, useAppSelector } from '@store/hooks';
import { Card, Divider, Checkbox } from '@ui';
import {
    selectIsAllFilesSelected,
    selectIsFilesEmpty,
    setAllFilesSelection,
} from '@slices/transcoder';

import styles from './style.module.scss';

function TranscoderHeader() {
    const isFilesEmpty = useAppSelector(selectIsFilesEmpty);

    if (isFilesEmpty) return null;
    return (
        <Card className={styles.header} mini>
            <div>№</div>
            <div className={styles.headerName}>Name</div>
            <div className={styles.headerExtension}>Ext</div>
            <div className={styles.headerSize}>Size</div>
            <Divider vertical disableMargin />
            <SelectAll />
        </Card>
    );
}

function SelectAll() {
    const dispatch = useAppDispatch();

    const isAllSelected = useAppSelector(selectIsAllFilesSelected);

    function handleAllSelectedChange(isAllSelected: boolean) {
        dispatch(setAllFilesSelection(isAllSelected));
    }

    return (
        <Checkbox
            label='Select all files'
            hideLabel
            checked={isAllSelected}
            onChange={handleAllSelectedChange}
        />
    );
}

export { TranscoderHeader };
