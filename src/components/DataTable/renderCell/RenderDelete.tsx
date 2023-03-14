import { Box } from '@mui/material';
import { AsyncThunk } from '@reduxjs/toolkit';
import { ICellRendererParams } from 'ag-grid-community';
import React, { MouseEventHandler, useCallback } from 'react';

import { DeleteTableCellItemIcon } from '../../../UI/DeleteTableCellItemIcon';
import { PagePostProps } from '../../../domens/post/types/types';
import { useAppDispatch } from '../../../domens/store';
import { PopoverDelete } from '../../PopoverDelete/PopoverDelete';

export const RenderDelete =
  <T extends object>(dispatchAsyncFn: AsyncThunk<T, { uid: string; pageProps?: PagePostProps<T> }, unknown>) =>
  // eslint-disable-next-line react/display-name
  (props: ICellRendererParams): JSX.Element => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const dispatch = useAppDispatch();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);
    const isOpen = Boolean(anchorEl);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const handleOpen: MouseEventHandler<HTMLElement> = useCallback(
      (event) => setAnchorEl(event.currentTarget.parentElement),
      [],
    );
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const handleClose = useCallback(() => setAnchorEl(null), []);

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const handleDelete = useCallback(() => {
      if (props.data?.uid) {
        dispatch(dispatchAsyncFn({ uid: props.data.uid }))
          .unwrap()
          .then(() => {
            props.api.refreshInfiniteCache();
          });
      }
      handleClose();
    }, [props.data?.uid, props.api, handleClose, dispatch]);

    return (
      <Box>
        <DeleteTableCellItemIcon onClick={handleOpen} />
        <PopoverDelete onDelete={handleDelete} onClose={handleClose} open={isOpen} anchorEl={anchorEl} />
      </Box>
    );
  };
