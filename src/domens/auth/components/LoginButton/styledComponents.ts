import { Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const LoginBoxButton = styled(Button)(
  ({ theme }) => `
    padding-left: ${theme.spacing(1)};
    padding-right: ${theme.spacing(1)};
`,
);

export const LoginBoxLabel = styled(Typography)(
  ({ theme }) => `
    font-weight: ${theme.typography.fontWeightBold};
    display: block;
`,
);
