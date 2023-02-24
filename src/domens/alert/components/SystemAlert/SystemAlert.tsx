import { Alert, AlertTitle, Snackbar } from '@mui/material';
import React from 'react';

import { useActionCreators } from '../../../../utils/hooks/useActionCreators';
import { useStateSelector } from '../../../store';
import { selectAlertMessage, selectAlertShow } from '../../store/alertSelectors';
import { alertActions } from '../../store/alertSlice';
import { AlertWrapper } from './styledComponents';

const SystemAlert = () => {
  const actions = useActionCreators(alertActions);
  const show = useStateSelector(selectAlertShow);
  const message = useStateSelector(selectAlertMessage);

  const handleClose = () => {
    actions.clearAlert(message);
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
