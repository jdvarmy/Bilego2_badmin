import React, { ReactNode, useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Divider,
  OutlinedInput,
  IconButton,
  Tooltip,
  FormControl,
  InputAdornment,
  Button,
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { styled } from '@mui/material/styles';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import MailTwoToneIcon from '@mui/icons-material/MailTwoTone';

type TimeLeftType = { days: number; hours: number; minutes: number };
const timeMap: Record<keyof TimeLeftType, string> = { days: 'дни', hours: 'часы', minutes: 'минуты' };

const MainContent = styled(Box)(
  () => `
    height: 100%;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`,
);

const ImageBox = styled(Box)(
  ({ theme }) => `
  background-color: ${theme.colors.alpha.trueWhite[100]};
  border-radius: ${theme.general.borderRadiusXl};
`,
);

const TypographyH1 = styled(Typography)(
  ({ theme }) => `
  font-size: ${theme.typography.pxToRem(75)};
`,
);

const TypographyH3 = styled(Typography)(
  ({ theme }) => `
  color: ${theme.colors.alpha.black[50]};
`,
);

const OutlinedInputWrapper = styled(OutlinedInput)(
  ({ theme }) => `
    background-color: ${theme.colors.alpha.white[100]};
`,
);

const ButtonNotify = styled(Button)(
  ({ theme }) => `
    margin-right: -${theme.spacing(1)};
`,
);

function StatusComingSoon() {
  const [timeLeft, setTimeLeft] = useState<Record<keyof TimeLeftType, number> | undefined>(calculateTimeLeft());
  const timerComponents: ReactNode[] = [];

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  });

  timeLeft &&
    Object.keys(timeLeft).forEach((interval) => {
      if (!timeLeft[interval as keyof TimeLeftType]) {
        return;
      }

      timerComponents.push(
        <Box key={interval} textAlign='center' px={3}>
          <TypographyH1 variant='h1'>{timeLeft[interval as keyof TimeLeftType]}</TypographyH1>
          <TypographyH3 variant='h3'>{timeMap[interval as keyof TimeLeftType]}</TypographyH3>
        </Box>,
      );
    });

  return (
    <>
      <Helmet>
        <title>В разработке</title>
      </Helmet>
      <MainContent>
        <Container maxWidth='md'>
          <Box textAlign='center' mb={3}>
            <Container maxWidth='xs'>
              <Typography variant='h1' sx={{ mt: 4, mb: 2 }}>
                Скоро будет
              </Typography>
              <Typography variant='h3' color='text.secondary' fontWeight='normal' sx={{ mb: 4 }}>
                Мы работаем над внедрением новых функций перед запуском!
              </Typography>
            </Container>
            <ImageBox textAlign='center' mb={3}>
              <img alt='Coming Soon' height={200} src='/static/images/about-lama.svg' />
            </ImageBox>
          </Box>

          <Box display='flex' justifyContent='center'>
            {timerComponents.length ? timerComponents : <>Время вышло!</>}
          </Box>

          <Container maxWidth='sm'>
            <Box sx={{ textAlign: 'center', p: 4 }}>
              <FormControl variant='outlined' fullWidth>
                <OutlinedInputWrapper
                  type='text'
                  placeholder='Введите сюда свой email...'
                  endAdornment={
                    <InputAdornment position='end'>
                      <ButtonNotify variant='contained' size='small'>
                        Оповестить меня
                      </ButtonNotify>
                    </InputAdornment>
                  }
                  startAdornment={
                    <InputAdornment position='start'>
                      <MailTwoToneIcon />
                    </InputAdornment>
                  }
                />
              </FormControl>
              <Divider sx={{ my: 4 }} />
              <Box sx={{ textAlign: 'center' }}>
                <Tooltip arrow placement='top' title='Facebook'>
                  <IconButton color='primary'>
                    <FacebookIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip arrow placement='top' title='Twitter'>
                  <IconButton color='primary'>
                    <TwitterIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip arrow placement='top' title='Instagram'>
                  <IconButton color='primary'>
                    <InstagramIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </Container>
        </Container>
      </MainContent>
    </>
  );
}

export default StatusComingSoon;

function calculateTimeLeft(): TimeLeftType | undefined {
  const difference = +new Date(`2023`) - Date.now();

  if (difference > 0) {
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
    };
  }
}
