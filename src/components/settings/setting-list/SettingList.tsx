import clsx from 'clsx';

import { SettingListItem } from './SettingListItem';

import styles from '../style.module.scss';

function SettingList() {
    const cl = clsx(styles.settingsItem, styles.settingList);

    return (
        <ul className={cl}>
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
            <SettingListItem name='scaleUpSmallStickers' label='Scale up small stickers' />
            <SettingListItem name='removeEmptySpaces' label='Remove empty spaces if possible' />
        </ul>
    );
}

export { SettingList };
