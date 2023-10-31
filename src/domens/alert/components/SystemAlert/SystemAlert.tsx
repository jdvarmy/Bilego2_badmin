import { Alert, AlertTitle, Snackbar } from '@mui/material';
import React from 'react';

import { useActionCreators } from '../../../../utils/hooks/useActionCreators';
import { useStateSelector } from '../../../../store/store';
import { selectAlertMessage, selectAlertShow } from '../../store/alertSelectors';
import { alertActions } from '../../store/alertSlice';
import { AlertState, isAxiosErrorGuard } from '../../types';
import { AlertWrapper } from './styledComponents';

const SystemAlert = () => {
  const actions = useActionCreators(alertActions);
  const show = useStateSelector(selectAlertShow);
  const message = useStateSelector(selectAlertMessage);
  const errorMessage: { severity: AlertState['severity']; title: string; text: string } = {
    severity: 'info',
    title: '',
    text: '',
  };

  const handleClose = () => {
    actions.clearAlert(message);
  };

  if (isAxiosErrorGuard(message?.text)) {
    errorMessage.text = `${message?.text?.message}`;
    errorMessage.title = `${message?.text?.name} ${message?.text?.code}`;
  } else {
    errorMessage.title = typeof message?.title === 'string' ? message.title : '';
    errorMessage.text = typeof message?.text === 'string' ? message.text : '';
  }
  errorMessage.severity = typeof message?.severity === 'string' ? message.severity : 'info';

  return (
    <Snackbar
      open={show}
      autoHideDuration={message?.delay || 0}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
    >
      <AlertWrapper>
        <Alert severity={errorMessage.severity}>
          <AlertTitle>{errorMessage.title}</AlertTitle>
          {errorMessage.text}
        </Alert>
      </AlertWrapper>
    </Snackbar>
  );
};

export default SystemAlert;
