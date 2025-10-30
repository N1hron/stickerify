import { SettingListItem } from './SettingListItem';

import styles from '../style.module.scss';

function SettingList() {
    return (
        <ul className={styles.settingList}>
            <SettingListItem
                name='stickerSizeType'
                label='Sticker size type'
                options={['sticker', 'emoji']}
            />
            <SettingListItem
                name='horizontalAlignment'
                label='Horizontal alignment'
                options={['left', 'middle', 'right']}
            />
            <SettingListItem
                name='verticalAlignment'
                label='Vertical alignment'
                options={['top', 'middle', 'bottom']}
            />
            <SettingListItem name='outputFormat' label='Output format' options={['webp', 'png']} />
            <SettingListItem name='scaleUpSmallImages' label='Scale up small images' />
            <SettingListItem name='removeEmptySpaces' label='Remove empty spaces if possible' />
        </ul>
    );
}

export { SettingList };
