import React, { forwardRef, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  FormControl,
  Grid,
  IconButton,
  Input,
  InputLabel,
  TextField,
} from '@mui/material';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import CloudUploadTwoToneIcon from '@mui/icons-material/CloudUploadTwoTone';
import MediaLibrary from '../../../components/MediaLibrary/MediaLibrary';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers';
import { UserState } from '../UserDataContainer';
import { IMaskInput } from 'react-imask';
import { MediaSelectData } from '../../../typings/types';

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const TextMaskCustom = forwardRef<HTMLElement, CustomProps>(function TextMaskCustom(props, ref) {
  const { onChange, ...other } = props;
  return (
    <IMaskInput
      {...other}
      mask='+{7}(000) 000-00-00'
      // @ts-ignore
      inputRef={ref}
      onAccept={(value: any) => onChange({ target: { name: props.name, value } })}
      overwrite
    />
  );
});

type Props = {
  userData: UserState;
  setUserData: (values: UserState) => void;
};

const UserSubData = ({ userData, setUserData }: Props) => {
  const { avatar, name, surname, phone, birthdate } = userData;
  const [openMedia, setOpenMedia] = useState<boolean>(false);

  const handleOpenMedia = () => {
    setOpenMedia(true);
  };
  const handleCloseMedia = () => {
    setOpenMedia(false);
  };
  const handleChange = (field: keyof UserState) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserData({ ...userData, [field]: event.target.value });
  };
  const handleChangeDate = (value: Date | null) => {
    setUserData({ ...userData, birthdate: value });
  };
  const handleSelectAvatar = (image: MediaSelectData) => {
    setUserData({ ...userData, avatar: image });
  };
  const handleDeleteAvatar = () => {
    setUserData({ ...userData, avatar: '' });
  };

  return (
    <Card>
      <CardHeader title='Дополнительные данные' />
      <Divider />
      <CardContent>
        <Box>
          <Grid container spacing={3} alignItems='center'>
            <Grid item xs={4} sx={{ display: 'flex' }}>
              <TextField
                label='Аватар'
                type='text'
                fullWidth
                InputProps={{ readOnly: true }}
                value={typeof avatar === 'object' ? avatar?.name : ''}
                focused={!!avatar}
              />
              {!!avatar && (
                <IconButton color='error' onClick={handleDeleteAvatar}>
                  <DeleteForeverTwoToneIcon />
                </IconButton>
              )}
              <IconButton color='primary' onClick={handleOpenMedia}>
                <CloudUploadTwoToneIcon />
              </IconButton>
              <MediaLibrary open={openMedia} closeHandler={handleCloseMedia} selectHandle={handleSelectAvatar} />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label='Имя'
                type='text'
                fullWidth
                value={name}
                focused={!!name}
                onChange={handleChange('name')}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label='Фамилия'
                type='text'
                fullWidth
                value={surname}
                focused={!!surname}
                onChange={handleChange('surname')}
              />
            </Grid>
            <Grid item xs={4}>
              <FormControl variant='outlined' fullWidth focused={!!phone}>
                <InputLabel>Телефон</InputLabel>
                <Input value={phone} onChange={handleChange('phone')} inputComponent={TextMaskCustom as any} />
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label='Дата рождения'
                  inputFormat='dd/MM/yyyy'
                  value={birthdate}
                  onChange={handleChangeDate}
                  renderInput={(params) => <TextField focused={!!birthdate} fullWidth {...params} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={4} />
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default UserSubData;
