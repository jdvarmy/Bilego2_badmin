import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import CloseIcon from '@mui/icons-material/Close';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';

import UploadFiles from '../../../../../components/UploadFiles/UploadFiles';
import { StatusLoading } from '../../../../../typings/enum';
import { useAppDispatch, useStateSelector } from '../../../../../store/store';
import { selectMedialibraryFiles, selectMedialibraryStatus } from '../../../store/medialibrarySelectors';
import { uploadFileAsync } from '../../../store/medialibraryThunk';

type Props = {
  onClose: () => void;
};

const MediaToolbar = ({ onClose }: Props) => {
  const dispatch = useAppDispatch();
  const files = useStateSelector(selectMedialibraryFiles);
  const status = useStateSelector(selectMedialibraryStatus);
  const [fileList, setFileList] = useState<FileList | null>(null);

  const handleSetFile = (e: ChangeEvent<HTMLInputElement>) => {
    setFileList(e.target.files || null);
  };
  const handleUpload = useCallback(() => {
    if (fileList) {
      dispatch(uploadFileAsync({ files: fileList }));
    }
  }, [fileList, dispatch]);

  useEffect(() => {
    setFileList(null);
  }, [files]);

  return (
    <Toolbar sx={{ mt: 1, mb: 2, flex: '0 0 auto' }}>
      <IconButton sx={{ mx: 2 }} color='primary' onClick={onClose}>
        <CloseIcon />
      </IconButton>
      <Box width={150}>
        <FormControl fullWidth variant='outlined'>
          <InputLabel>Показать</InputLabel>
          <Select value='all' label='Показать' autoWidth>
            <MenuItem value='all'>Все</MenuItem>
            <MenuItem value='icon'>Только иконки</MenuItem>
            <MenuItem value='icon'>Только картинки</MenuItem>
            <MenuItem value='map'>Только карты площадок</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Typography sx={{ ml: 2, flex: 1 }} variant='h6' component='div'>
        Название и информация о выбранной картинке
      </Typography>
      <UploadFiles onChange={handleSetFile}>
        <TextField
          sx={{ minWidth: 255 }}
          value={
            fileList
              ? fileList.length === 1
                ? fileList[0].name
                : `Выбрано файлов: ${fileList.length}`
              : 'Выберите файл. Файл не выбран'
          }
          InputProps={{ readOnly: true }}
          label='Загрузите файлы (максимум 10)'
          type='text'
          focused
        />
      </UploadFiles>
      <LoadingButton
        sx={{ mx: 2 }}
        loading={[StatusLoading.init, StatusLoading.loading].includes(status)}
        loadingPosition='start'
        variant='contained'
        onClick={handleUpload}
        startIcon={<AddTwoToneIcon fontSize='small' />}
      >
        Добавить
      </LoadingButton>
    </Toolbar>
  );
};

export default MediaToolbar;
