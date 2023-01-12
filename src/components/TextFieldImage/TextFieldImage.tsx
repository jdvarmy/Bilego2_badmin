import AddPhotoAlternateTwoToneIcon from '@mui/icons-material/AddPhotoAlternateTwoTone';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import { Box, IconButton, TextField } from '@mui/material';
import { OverridableStringUnion } from '@mui/types';
import React, { useState } from 'react';

import { MediaSelectData } from '../../typings/types';
import MediaLibrary from '../MediaLibrary/MediaLibrary';

export type MediaTextFieldProps = {
  label?: React.ReactNode;
  value?: MediaSelectData;
  onSelect?: (image: MediaSelectData) => void;
  onDelete?: () => void;
  size?: OverridableStringUnion<'small' | 'medium'>;
  onlyIcon?: boolean;
};

const TextFieldImage = ({ label, value, onSelect, onDelete, size, onlyIcon }: MediaTextFieldProps) => {
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
      {!onlyIcon && (
        <TextField
          label={label}
          type='text'
          fullWidth
          InputProps={{ readOnly: true }}
          value={typeof value === 'object' ? value.name : ''}
          focused={!!value}
          size={size}
        />
      )}
      {!!value && (
        <IconButton size={size} color='error' onClick={handleDeleteMedia}>
          <DeleteForeverTwoToneIcon />
        </IconButton>
      )}
      <IconButton size={size} color='primary' onClick={handleOpenMedia}>
        <AddPhotoAlternateTwoToneIcon />
      </IconButton>
      <MediaLibrary open={openMedia} closeHandler={handleCloseMedia} selectHandle={handleSelectMedia} />
    </Box>
  );
};

export default TextFieldImage;
