import { Box } from '@mui/material';
import { ICellRendererParams } from 'ag-grid-community';
import React, { MouseEventHandler, useCallback } from 'react';

import { DeleteTableCellItemIcon } from '../../../../UI/DeleteTableCellItemIcon';
import { PopoverDelete } from '../../../../components/PopoverDelete/PopoverDelete';
import { useAppDispatch } from '../../../store';
import { deleteItemAsync } from '../../store/itemsThunk';

export const RenderDeleteItem = (props: ICellRendererParams) => {
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
  const isOpen = Boolean(anchorEl);

  const handleOpen: MouseEventHandler<HTMLElement> = useCallback(
    (event) => setAnchorEl(event.currentTarget.parentElement),
    [],
  );
  const handleClose = useCallback(() => setAnchorEl(null), []);

  const handleDeleteMedia = useCallback(() => {
    if (props.data.uid) {
      dispatch(deleteItemAsync({ uid: props.data.uid }))
        .unwrap()
        .then(() => {
          props.api.refreshInfiniteCache();
        });
    }
    handleClose();
  }, [handleClose, dispatch]);

  const Component = DeleteTableCellItemIcon();

  return (
    <Box>
      <Component onClick={handleOpen} />
      <PopoverDelete onDelete={handleDeleteMedia} onClose={handleClose} open={isOpen} anchorEl={anchorEl} />
    </Box>
  );
};
