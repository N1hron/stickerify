import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectIsAllFilesSelected, setIsSelectedAll } from '../../store/slices/transcoder';
import { Card, Divider, Checkbox } from '../ui';

import styles from './style.module.scss';

function FileListHeader() {
    const dispatch = useAppDispatch();
    const isAllSelected = useAppSelector(selectIsAllFilesSelected);

    function handleAllSelectedChange(isAllSelected: boolean) {
        dispatch(setIsSelectedAll(isAllSelected));
    }

    return (
        <Card className={styles.header} mini>
            <div className={styles.headerItems}>
                <div>№</div>
                <div>Name</div>
                <div>Ext</div>
                <div>Size</div>
                <div>State</div>
                <Divider horizontal />
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

export { FileListHeader };
