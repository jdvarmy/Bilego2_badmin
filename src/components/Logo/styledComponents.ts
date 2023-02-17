import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';

export const LogoWrapper = styled(Link)(
  ({ theme }) => `
    color: ${theme.palette.text.primary};
    padding: ${theme.spacing(0, 1, 0, 0)};
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 88px;
    align-items: flex-start;
    text-decoration: none;
    font-weight: ${theme.typography.fontWeightBold};
`,
);

export const LogoSignWrapper = styled(Box)(
  () => `
    height: 38px;
    margin-top: 4px;
    transform: scale(.8);
`,
);

export const LogoTextWrapper = styled(Box)(
  ({ theme }) => `
    padding-left: ${theme.spacing(1)};
`,
);

export const VersionBadge = styled(Box)(
  ({ theme }) => `
    background: ${theme.palette.success.main};
    color: ${theme.palette.success.contrastText};
    padding: ${theme.spacing(0.4, 1)};
    margin-left: ${theme.spacing(1)};
    border-radius: ${theme.general.borderRadiusSm};
    text-align: center;
    display: inline-block;
    line-height: 1;
    vertical-align: top;
    font-size: ${theme.typography.pxToRem(11)};
`,
);

export const LogoText = styled(Box)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(10)};
    font-weight: ${theme.typography.fontWeightBold};
`,
);
