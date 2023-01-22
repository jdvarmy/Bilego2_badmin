import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Button, Card, CardActions, CardHeader, CardMedia, IconButton } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';

import { removeFileAsync } from '../../domens/medialibrarySlice/medialibrarySlice';
import { AppDispatch } from '../../domens/store';
import { HTTP_URL } from '../../typings/env';
import { MediaFile, MediaSelectData } from '../../typings/types';

type Props = {
  file: MediaFile;
  loading: boolean;
  selectHandle?: (data: MediaSelectData) => void;
};

const Image = ({ file, loading, selectHandle }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const handleRemove = () => {
    if (file.id) {
      dispatch(removeFileAsync(file.id));
    }
  };
  const handleSelect = () => {
    if (selectHandle && file.id) {
      selectHandle({ id: file.id, name: file.name || file.originalName || file.path, path: file.path });
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
      <CardMedia sx={{ height: 140 }} image={`${HTTP_URL}${file.path}`} title={file.name || file.originalName} />
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
