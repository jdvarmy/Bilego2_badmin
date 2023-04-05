import { Button, ButtonProps, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { ReactNode } from 'react';

const DialogContentStyled = styled(DialogTitle)(
  ({ theme }) => `
  text-transform: uppercase;
  font-weight: bold;
  font-size: ${theme.typography.pxToRem(12)};
  margin: ${theme.spacing(2, 0, 0, 0)};
  line-height: 1.4;
`,
);

type Props = {
  title: string;
  open: boolean;
  onClose: () => void;
  onDeleteButton?: () => void;
  onSuccessButton?: () => void;
  actionButton?: ButtonProps & { label?: string };
  children?: ReactNode;
  contentActions?: ReactNode;
};

const ModalDialog = ({ open, onClose, actionButton, title, children, contentActions }: Props) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth='xl'>
      <DialogContentStyled>{title}</DialogContentStyled>
      <DialogContent sx={{ pb: 5 }}>{contentActions}</DialogContent>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        {actionButton && <Button {...actionButton}>{actionButton.label}</Button>}
        <Button variant='outlined' onClick={onClose}>
          Отмена
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalDialog;
