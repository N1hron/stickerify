import { useAppDispatch, useAppSelector } from '@store/hooks';
import { Card, Divider, Checkbox } from '@components/ui';
import {
    selectIsAllFilesSelected,
    selectIsFilesEmpty,
    setAllFilesSelection,
} from '@slices/transcoder';

import styles from './style.module.scss';

function ListHeader() {
    const dispatch = useAppDispatch();
    const isAllSelected = useAppSelector(selectIsAllFilesSelected);
    const isFilesEmpty = useAppSelector(selectIsFilesEmpty);

    function handleAllSelectedChange(isAllSelected: boolean) {
        dispatch(setAllFilesSelection(isAllSelected));
    }

    if (isFilesEmpty) return null;
    return (
        <Card className={styles.header} mini>
            <div className={styles.headerItems}>
                <div>№</div>
                <div>Name</div>
                <div>Ext</div>
                <div>Size</div>
                <div>State</div>
                <Divider vertical />
                <Checkbox
                    label='Select all files'
                    hideLabel
                    checked={isAllSelected}
                    onChange={handleAllSelectedChange}
                />
            </div>
        </Card>
    );
}

export { ListHeader };
