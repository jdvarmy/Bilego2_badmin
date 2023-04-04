import { Fab, Zoom } from '@mui/material';
import { FabProps } from '@mui/material/Fab/Fab';
import { useTheme } from '@mui/material/styles';
import React from 'react';

export const FloatingButton: React.FC<FabProps & { show?: boolean }> = ({ show, children, ...props }) => {
  const { transitions, spacing } = useTheme();

  const transitionDuration = {
    enter: transitions.duration.enteringScreen,
    exit: transitions.duration.leavingScreen,
  };

  return (
    <Zoom
      in={show}
      timeout={transitionDuration}
      style={{ transitionDelay: `${show ? transitionDuration.exit : 0}ms` }}
      unmountOnExit
    >
      <Fab
        sx={{ position: 'absolute', top: spacing(15), right: spacing(4) }}
        variant='extended'
        color='success'
        size='medium'
        {...props}
      >
        {children ?? 'Сохранить'}
      </Fab>
    </Zoom>
  );
};
