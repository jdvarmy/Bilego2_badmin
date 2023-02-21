import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const HeaderWrapper = styled(Box)(
  ({ theme }) => `
    height: ${theme.header.height};
    color: ${theme.header.textColor};
    padding: ${theme.spacing(0, 2)};
    right: 0;
    z-index: 5;
    background-color: ${theme.header.background};
    box-shadow: ${theme.header.boxShadow};
    position: fixed;
    justify-content: space-between;
    width: 100%;
    @media (min-width: ${theme.breakpoints.values.lg}px) {
        left: ${theme.sidebar.width};
        width: auto;
    }
`,
);

export const Greeting = styled(Typography)(
  ({ theme }) => `
    margin-right: ${theme.spacing(1)};
    font-weight: ${theme.typography.fontWeightBold};
    color: ${theme.palette.secondary.main};
    display: block;
`,
);
