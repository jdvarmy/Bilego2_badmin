import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const AlertWrapper = styled(Box)(
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
