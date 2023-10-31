import { AppBar, Dialog, DialogTitle } from '@mui/material';
import React, { memo, useEffect } from 'react';

import { StatusLoading } from '../../../../typings/enum';
import { MediaSelectData } from '../../../../typings/types';
import { defaultCountPost } from '../../../post/types';
import { useAppDispatch, useStateSelector } from '../../../../store/store';
import { selectMedialibraryStatus } from '../../store/medialibrarySelectors';
import { fetchMediaFilesAsync } from '../../store/medialibraryThunk';
import MediaDialogContent from './MediaDialogContent/MediaDialogContent';
import MediaToolbar from './MediaToolbar/MediaToolbar';

type Props = {
  open: boolean;
  closeHandler: () => void;
  selectHandle: (data: MediaSelectData) => void;
};

const style = { position: 'relative', py: 2 };

const MediaLibrary = memo(function MediaLibrary({ open, closeHandler, selectHandle }: Props) {
  const dispatch = useAppDispatch();
  const status = useStateSelector(selectMedialibraryStatus);

  useEffect(() => {
    if (status === StatusLoading.init) {
      dispatch(fetchMediaFilesAsync({ count: defaultCountPost }));
    }
  }, [status, dispatch]);

  return (
    <Dialog fullScreen open={open} onClose={closeHandler}>
      <DialogTitle>Медиа библиотека</DialogTitle>
      <MediaToolbar onClose={closeHandler} />
      <AppBar sx={style}></AppBar>
      <MediaDialogContent onClose={closeHandler} onSelect={selectHandle} />
    </Dialog>
  );
});

export default MediaLibrary;
