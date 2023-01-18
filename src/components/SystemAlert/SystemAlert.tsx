import { Alert, AlertTitle, Box, Snackbar } from '@mui/material';
import { styled } from '@mui/material/styles';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectAlertStore } from '../../domen/alert/alertSelectors';
import { clearAlert } from '../../domen/alert/alertSlice';

const AlertWrapper = styled(Box)(
  ({ theme }) => `
    padding: ${theme.spacing(0.5, 1)};
    font-size: ${theme.typography.pxToRem(13)};
    border-radius: ${theme.general.borderRadius};
    display: flex;
    align-items: center;
    justify-content: center;
    
    & .MuiPaper-root.MuiAlert-standardError {
      background-color: ${theme.colors.error.lighter};
      
      & .MuiAlert-message{
        color: ${theme.palette.error.main}
      }
    }
    & .MuiPaper-root.MuiAlert-standardSuccess {
      background-color: ${theme.colors.success.lighter};
      
      & .MuiAlert-message{
        color: ${theme.palette.success.main}
      }
    }
    & .MuiPaper-root.MuiAlert-standardWarning {
      background-color: ${theme.colors.warning.lighter};
      
      & .MuiAlert-message{
        color: ${theme.palette.warning.main}
      }
    }
    & .MuiPaper-root.MuiAlert-standardInfo {
      background-color: ${theme.colors.info.lighter};
      
      & .MuiAlert-message{
        color: ${theme.palette.info.main}
      }
    }
`,
);

const SystemAlert = () => {
  const dispatch = useDispatch();
  const { show, message } = useSelector(selectAlertStore);

  const handleClose = () => {
    dispatch(clearAlert(message));
  };

  return (
    <Snackbar
      open={show}
      autoHideDuration={message?.delay || 0}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <AlertWrapper>
        <Alert severity={message?.severity || 'info'}>
          <AlertTitle>{message?.title || ''}</AlertTitle>
          {message?.text || ''}
        </Alert>
      </AlertWrapper>
    </Snackbar>
  );
};

export default SystemAlert;
