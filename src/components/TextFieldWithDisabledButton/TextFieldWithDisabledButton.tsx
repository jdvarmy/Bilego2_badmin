import React, { useState } from 'react';
import { TextField, Box, IconButton, Tooltip } from '@mui/material';
import { TextFieldProps } from '@mui/material/TextField/TextField';
import LockTwoToneIcon from '@mui/icons-material/LockTwoTone';
import LockOpenTwoToneIcon from '@mui/icons-material/LockOpenTwoTone';

const TextFieldWithDisabledButton = ({ disabled = true, sx, ...props }: TextFieldProps): JSX.Element => {
  const [localDisabled, setLocalDisabled] = useState<boolean>(disabled);

  const handleClick = () => {
    setLocalDisabled((prev) => !prev);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', ...sx }}>
      <TextField {...props} disabled={localDisabled} />
      <Tooltip arrow placement='top' title={`Разблокировать ${props.label?.toString().toLowerCase()}`}>
        <IconButton color={localDisabled ? 'secondary' : 'success'} size='small' onClick={handleClick}>
          {localDisabled ? <LockTwoToneIcon /> : <LockOpenTwoToneIcon />}
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default TextFieldWithDisabledButton;
