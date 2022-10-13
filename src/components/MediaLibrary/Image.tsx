import React from 'react';
import { Card, CardHeader, IconButton, CardMedia, CardActions, Button } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { MediaFile, MediaSelectData } from '../../typings/types';
import { HTTP_URL } from '../../typings/env';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store/store';
import { removeFileAsync } from '../../store/medialibrarySlice/medialibrarySlice';

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
      selectHandle({ id: file.id, name: file.name || file.originalName || file.path });
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
