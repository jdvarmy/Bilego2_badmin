import { Box, DialogContent } from '@mui/material';
import React, { useEffect, useRef } from 'react';

import { StatusLoading } from '../../../../../typings/enum';
import { MediaFile, MediaSelectData } from '../../../../../typings/types';
import { useIntersectionObserver } from '../../../../../utils/hooks/useIntersectionObserver';
import { defaultCountPost } from '../../../../post/types/types';
import { useAppDispatch, useStateSelector } from '../../../../store';
import {
  selectMedialibraryFiles,
  selectMedialibraryProps,
  selectMedialibraryStatus,
} from '../../../store/medialibrarySelectors';
import { fetchMediaFilesAsync } from '../../../store/medialibraryThunk';
import Image from '../Image';

type Props = {
  onClose: () => void;
  onSelect: (data: MediaSelectData) => void;
};

const MediaDialogContent = ({ onClose, onSelect }: Props) => {
  const dispatch = useAppDispatch();
  const trigger = useRef<HTMLDivElement>(null);
  const files = useStateSelector(selectMedialibraryFiles);
  const status = useStateSelector(selectMedialibraryStatus);
  const { total, offset } = useStateSelector(selectMedialibraryProps);
  const show = useIntersectionObserver(trigger);

  const handleSelect = (data: MediaSelectData) => {
    onSelect(data);
    onClose();
  };

  useEffect(() => {
    if (show && total > offset && StatusLoading.success === status) {
      console.log('status', status);
      dispatch(fetchMediaFilesAsync({ count: defaultCountPost, offset }));
    }
  }, [show, dispatch]);

  return (
    <DialogContent sx={{ overflow: 'scroll-y' }}>
      {Array.isArray(files) &&
        !!files.length &&
        files.map((file: MediaFile) => (
          <Image
            key={file.id}
            file={file}
            loading={[StatusLoading.init, StatusLoading.loading].includes(status)}
            selectHandle={handleSelect}
          />
        ))}
      <Box ref={trigger} />
    </DialogContent>
  );
};

export default MediaDialogContent;
