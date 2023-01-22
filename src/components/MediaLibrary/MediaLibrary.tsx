import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import CloseIcon from '@mui/icons-material/Close';
import LoadingButton from '@mui/lab/LoadingButton';
import {
  AppBar,
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
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
import { useDispatch, useSelector } from 'react-redux';

import { uploadFileAsync } from '../../domens/medialibrarySlice/medialibrarySlice';
import { selectMedialibrary } from '../../domens/selectors';
import { AppDispatch } from '../../domens/store';
import { MediaFile, MediaSelectData } from '../../typings/types';
import UploadFiles from '../UploadFiles/UploadFiles';
import Image from './Image';

type Props = {
  open: boolean;
  closeHandler: () => void;
  selectHandle: (data: MediaSelectData) => void;
};

const MediaLibrary = ({ open, closeHandler, selectHandle }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const { loading, files } = useSelector(selectMedialibrary);
  const [fileList, setFileList] = useState<FileList | null>(null);

  const handleSetFile = (e: ChangeEvent<HTMLInputElement>) => {
    setFileList(e.target.files || null);
  };
  const handleUpload = useCallback(() => {
    if (fileList) {
      dispatch(uploadFileAsync(fileList));
    }
  }, [fileList, dispatch]);
  const handleSelect = useCallback(
    (data: MediaSelectData) => {
      selectHandle(data);
      closeHandler();
    },
    [selectHandle, closeHandler],
  );

  useEffect(() => {
    setFileList(null);
  }, [files]);

  return (
    <Dialog fullScreen open={open} onClose={closeHandler}>
      <DialogTitle>Медиа библиотека</DialogTitle>
      <AppBar sx={{ position: 'relative', py: 2 }}>
        <Toolbar>
          <IconButton sx={{ mx: 2 }} color='primary' onClick={closeHandler}>
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
            loading={loading}
            loadingPosition='start'
            variant='contained'
            onClick={handleUpload}
            startIcon={<AddTwoToneIcon fontSize='small' />}
          >
            Добавить
          </LoadingButton>
        </Toolbar>
      </AppBar>
      <DialogContent sx={{ overflow: 'scroll-y' }}>
        {files?.map((file: MediaFile) => (
          <Image key={file.id} file={file} loading={loading} selectHandle={handleSelect} />
        ))}
      </DialogContent>
    </Dialog>
  );
};

export default MediaLibrary;
