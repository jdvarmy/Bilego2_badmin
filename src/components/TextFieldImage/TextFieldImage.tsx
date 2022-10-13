import React, { useState } from 'react';
import { Box, IconButton, TextField } from '@mui/material';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import CloudUploadTwoToneIcon from '@mui/icons-material/CloudUploadTwoTone';
import MediaLibrary from '../MediaLibrary/MediaLibrary';
import { MediaSelectData } from '../../typings/types';
import { OverridableStringUnion } from '@mui/types';

type Props = {
  label?: React.ReactNode;
  value?: MediaSelectData;
  onSelect?: (image: MediaSelectData) => unknown;
  onDelete?: () => unknown;
  size?: OverridableStringUnion<'small' | 'medium'>;
};

// todo: добавить это в редактирование и создание юзера
const TextFieldImage = ({ label, value, onSelect, onDelete, size }: Props) => {
  const [openMedia, setOpenMedia] = useState<boolean>(false);

  const handleOpenMedia = () => {
    setOpenMedia(true);
  };
  const handleCloseMedia = () => {
    setOpenMedia(false);
  };
  const handleSelectMedia = (image: MediaSelectData) => {
    if (onSelect) {
      onSelect(image);
    }
  };
  const handleDeleteMedia = () => {
    if (onDelete) {
      onDelete();
    }
  };

  return (
    <Box display='flex'>
      <TextField
        label={label}
        type='text'
        fullWidth
        InputProps={{ readOnly: true }}
        value={typeof value === 'object' ? value?.name : ''}
        focused={!!value}
        size={size}
      />
      {!!value && (
        <IconButton size={size} color='error' onClick={handleDeleteMedia}>
          <DeleteForeverTwoToneIcon />
        </IconButton>
      )}
      <IconButton size={size} color='primary' onClick={handleOpenMedia}>
        <CloudUploadTwoToneIcon />
      </IconButton>
      <MediaLibrary open={openMedia} closeHandler={handleCloseMedia} selectHandle={handleSelectMedia} />
    </Box>
  );
};

export default TextFieldImage;
