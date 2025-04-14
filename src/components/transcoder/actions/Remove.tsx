import { Button } from '@ui';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { removeSelectedFiles, selectAllowRemove } from '@slices/transcoder';

function Remove() {
    const dispatch = useAppDispatch();
    const allowRemove = useAppSelector(selectAllowRemove);

    function handleRemoveClick() {
        dispatch(removeSelectedFiles());
    }

    return (
        <Button color='danger' mini disabled={!allowRemove} onClick={handleRemoveClick}>
            Remove
        </Button>
    );
}

export { Remove };
