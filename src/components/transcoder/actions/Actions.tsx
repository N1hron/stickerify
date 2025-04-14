import { useAppSelector } from '@store/hooks';
import { selectTranscoderStatus } from '@slices/transcoder';
import { Card } from '@/components/ui';
import { Add } from './Add';
import { Remove } from './Remove';
import { Transcode } from './Transcode';
import { Download } from './Download';

import styles from './style.module.scss';

function Actions() {
    const transcoderStatus = useAppSelector(selectTranscoderStatus);

    if (!(transcoderStatus === 'ready' || transcoderStatus === 'transcoding')) return null;
    return (
        <Card className={styles.actions} as='menu' mini>
            <li>
                <Add />
            </li>
            <li>
                <Remove />
            </li>
            <li>
                <Transcode />
            </li>
            <li>
                <Download />
            </li>
        </Card>
    );
}

export { Actions };
