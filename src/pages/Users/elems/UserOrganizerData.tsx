import React from 'react';
import { Box, Card, CardContent, CardHeader, Divider, Grid, TextField } from '@mui/material';
import { UserState } from '../UserDataContainer';

type Props = {
  userData: UserState;
  setUserData: (values: UserState) => void;
};

const UserOrganizerData = ({ userData, setUserData }: Props) => {
  const { concertManagerPercentage, concertManagerInfo } = userData;

  const handleChange = (field: keyof UserState) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [field]: event.target.value });
  };

  return (
    <Card>
      <CardHeader title='Данные организатора' />
      <Divider />
      <CardContent>
        <Box>
          <Grid container spacing={3} alignItems='center'>
            <Grid item xs={4}>
              <TextField
                label='Процент сделок'
                type='number'
                fullWidth
                value={concertManagerPercentage}
                focused={!!concertManagerPercentage}
                onChange={handleChange('concertManagerPercentage')}
              />
            </Grid>
            <Grid item xs={8}>
              <TextField
                label='ИНН организатора и дополтительная информация'
                type='text'
                fullWidth
                value={concertManagerInfo}
                focused={!!concertManagerInfo}
                onChange={handleChange('concertManagerInfo')}
              />
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default UserOrganizerData;
