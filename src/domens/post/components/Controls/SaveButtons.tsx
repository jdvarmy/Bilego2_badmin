import PublicTwoToneIcon from '@mui/icons-material/PublicTwoTone';
import SaveAsTwoToneIcon from '@mui/icons-material/SaveAsTwoTone';
import { Box, Button, IconButton, Tooltip } from '@mui/material';
import React, { memo, useRef } from 'react';

import { FloatingButton } from '../../../../components/FloatingButton/FloatingButton';
import { PostStatus, PostType } from '../../../../typings/enum';
import { getPostTitleByType } from '../../../../utils/helpers/getPostTitleByType';
import { useIntersectionObserver } from '../../../../utils/hooks/useIntersectionObserver';
import { saveEventAsync } from '../../../events/store/eventsThunk';
import { saveItemAsync } from '../../../items/store/itemsThunk';
import { useAppDispatch } from '../../../store';

type Props = {
  type: PostType;
};

const tooltipStyle = { ml: 2, my: 0.5 };

export const SaveButtons = memo(function SaveEventButtons({ type }: Props) {
  const dispatch = useAppDispatch();
  const saveButtonRef = useRef<HTMLButtonElement | null>(null);

  const show = useIntersectionObserver(saveButtonRef);

  const handleButtonClick = (status?: PostStatus) => {
    switch (type) {
      case PostType.event:
        return () => {
          dispatch(saveEventAsync(status ? { status } : {}));
        };
      case PostType.item:
        return () => {
          dispatch(saveItemAsync(status ? { status } : {}));
        };
      case PostType.artist:
        return () => ({});
    }
  };

  console.log('render SaveButtons');

  return (
    <>
      <Box>
        <Tooltip sx={tooltipStyle} placement='top' arrow title='Сохранить черновик'>
          <IconButton color='primary' onClick={handleButtonClick(PostStatus.draft)}>
            <SaveAsTwoToneIcon />
          </IconButton>
        </Tooltip>
        <Tooltip sx={tooltipStyle} placement='top' arrow title={`Опубликовать ${getPostTitleByType(type)}`}>
          <IconButton color='success' onClick={handleButtonClick(PostStatus.publish)}>
            <PublicTwoToneIcon />
          </IconButton>
        </Tooltip>
        <Button ref={saveButtonRef} sx={{ mx: 2, my: 0.5 }} variant='contained' onClick={handleButtonClick()}>
          Сохранить
        </Button>
      </Box>
      <FloatingButton show={!show} onClick={handleButtonClick()} />
    </>
  );
});
