import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const SidebarWrapper = styled(Box)(
  ({ theme }) => `
    width: ${theme.sidebar.width};
    color: ${theme.sidebar.textColor};
    background: ${theme.sidebar.background};
    box-shadow: ${theme.sidebar.boxShadow};
    height: 100%;
    
    @media (min-width: ${theme.breakpoints.values.lg}px) {
        position: fixed;
        z-index: 10;
        border-top-right-radius: ${theme.general.borderRadius};
        border-bottom-right-radius: ${theme.general.borderRadius};
    }
`,
);

export const TopSection = styled(Box)(
  ({ theme }) => `
    height: 88px;
    margin: 0 ${theme.spacing(2)} ${theme.spacing(2)};
    border-bottom: ${theme.sidebar.dividerBg} solid 1px;
`,
);
