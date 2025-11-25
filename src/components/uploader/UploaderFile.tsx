import { memo } from 'react';

import XMarkIcon from '@icons/xmark.svg?react';
import { Table } from '../ui';
import { formatFileSize } from '@/utils';
import type { UploaderItem } from '@/types';
import { useAppDispatch } from '@/store/hooks';
import { removeUploaderItem } from '@/store/slices/uploader/index';

type UploaderFileProps = {
  i: number;
  item: UploaderItem;
};

function UploaderFileInner({ i, item: { id, fileData } }: UploaderFileProps) {
  const dispatch = useAppDispatch();

  function handleRemoveClick() {
    dispatch(removeUploaderItem(id));
  }

  return (
    <Table.Row>
      <Table.ButtonCell icon color='red' title='Remove' onClick={handleRemoveClick}>
        <XMarkIcon aria-label='Remove' />
      </Table.ButtonCell>
      <Table.Cell>{i + 1}</Table.Cell>
      <Table.Cell grow ellipsis>
        {fileData.baseName}
      </Table.Cell>
      <Table.Cell>{fileData.extension}</Table.Cell>
      <Table.Cell>{formatFileSize(fileData.size)}</Table.Cell>
      <Table.ButtonCell color='blue'>Edit</Table.ButtonCell>
    </Table.Row>
  );
}

export const UploaderFile = memo(UploaderFileInner);
