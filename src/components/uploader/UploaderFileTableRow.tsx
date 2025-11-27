import { memo } from 'react';

import XMarkIcon from '@icons/xmark.svg?react';
import { Table } from '../ui';
import { devLog, formatDuration, formatFileSize, splitFileName } from '@/utils';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { removeUploaderItem, selectShowDuration } from '@/store/slices/uploader/index';
import { convertFile, selectConversionStatus } from '@/store/slices/converter';
import type { UploaderItem } from '@/types';

type UploaderFileTableRowProps = {
  item: UploaderItem;
};

function UploaderFileTableRowInner({ item: { signature, data } }: UploaderFileTableRowProps) {
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => selectConversionStatus(state, signature));
  const isDisabled = status === 'loading';
  const showDuration = useAppSelector(selectShowDuration);
  const size = formatFileSize(data.size);
  const duration = showDuration && data.duration ? formatDuration(data.duration) : 'Static';
  const [baseName, extension] = splitFileName(data.name);

  function handleRemoveClick() {
    if (!isDisabled) {
      dispatch(removeUploaderItem(signature));
    }
  }

  function handleRunClick() {
    if (!isDisabled) {
      dispatch(convertFile(signature)).catch(devLog);
    }
  }

  return (
    <Table.Row>
      <Table.ButtonCell
        icon
        color='red'
        title='Remove'
        disabled={isDisabled}
        onClick={handleRemoveClick}
      >
        <XMarkIcon aria-label='Remove' />
      </Table.ButtonCell>

      <Table.Cell grow ellipsis>
        {baseName}
      </Table.Cell>

      <Table.Cell>{data.type}</Table.Cell>
      <Table.Cell>{extension}</Table.Cell>
      <Table.Cell>{size}</Table.Cell>

      {showDuration && <Table.Cell>{duration}</Table.Cell>}

      <Table.ButtonCell color='blue' disabled={isDisabled}>
        Edit
      </Table.ButtonCell>

      <Table.ButtonCell color='green' disabled={isDisabled} onClick={handleRunClick}>
        <span>Run</span>
      </Table.ButtonCell>
    </Table.Row>
  );
}

export const UploaderFileTableRow = memo(UploaderFileTableRowInner);
