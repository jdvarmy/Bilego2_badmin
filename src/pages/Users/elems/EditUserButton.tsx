import React from 'react';
import { IconButton, Tooltip, useTheme } from '@mui/material';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import { useNavigate } from 'react-router-dom';

const EditUserButton = ({ uid }: { uid?: string }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleClick = () => {
    if (uid) {
      navigate(`edit/${uid}`, { state: { edit: true } });
    }
  };

  return (
    <Tooltip placement='top' title='Редактировать' arrow>
      <IconButton
        sx={{
          '&:hover': { background: theme.colors.primary.lighter },
          color: theme.palette.primary.main,
        }}
        color='inherit'
        size='small'
        onClick={handleClick}
      >
        <EditTwoToneIcon fontSize='small' />
      </IconButton>
    </Tooltip>
  );
};

export default EditUserButton;
