import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button, Card, CardActions, CardHeader, CardMedia, IconButton } from '@mui/material';
import React from 'react';

import { MediaFile, MediaSelectData } from '../../../../typings/types';
import { useAppDispatch } from '../../../../store/store';
import { getImageSrc } from '../../helpers/getImageSrc';
import { removeFileAsync } from '../../store/medialibraryThunk';
import { ImageSizes } from '../../types';

type Props = {
  file: MediaFile;
  loading: boolean;
  selectHandle?: (data: MediaSelectData) => void;
};

const Image = ({ file, loading, selectHandle }: Props) => {
  const dispatch = useAppDispatch();
  const handleRemove = () => {
    if (file.id) {
      dispatch(removeFileAsync({ id: file.id }));
    }
  };
  const handleSelect = () => {
    if (selectHandle && file.id) {
      selectHandle({ id: file.id, name: file.name || file.originalName, path: file.path });
    }
  };

  return (
    <Card sx={{ width: 305, display: 'inline-block', m: 1 }}>
      <CardHeader
        action={
          <IconButton aria-label='settings'>
            <MoreVertIcon />
          </IconButton>
        }
        title={file.name || file.originalName}
        subheader={file.mimetype}
      />
      <CardMedia
        sx={{ height: 140 }}
        image={getImageSrc(file.path, ImageSizes.s)}
        title={file.name || file.originalName}
      />
      <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button disabled={loading} onClick={handleSelect} size='small' variant='contained'>
          Выбрать
        </Button>
        <Button disabled={loading} onClick={handleRemove} size='small' color='warning'>
          Удалить
        </Button>
      </CardActions>
    </Card>
  );
};

export default Image;
