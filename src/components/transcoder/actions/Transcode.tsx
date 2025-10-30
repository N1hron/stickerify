import { useAppDispatch, useAppSelector } from '@store/hooks';
import { selectAllowTranscode, transcodeSelectedFiles } from '@store/slices/transcoder';
import { Button } from '@ui';

function Transcode() {
    const dispatch = useAppDispatch();
    const allowTranscode = useAppSelector(selectAllowTranscode);

    function handleTranscodeClick() {
        if (!allowTranscode) return;
        dispatch(transcodeSelectedFiles());
    }

    return (
        <Button mini disabled={!allowTranscode} onClick={handleTranscodeClick}>
            Convert
        </Button>
    );
}

export { Transcode };
