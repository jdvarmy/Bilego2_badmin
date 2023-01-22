import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import HourglassDisabledTwoToneIcon from '@mui/icons-material/HourglassDisabledTwoTone';
import SaveTwoToneIcon from '@mui/icons-material/SaveTwoTone';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Grid, Icon, TextField } from '@mui/material';
import React, { ChangeEvent, memo, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { editEventDateAsync } from '../../domens/events/store/eventsSlice';
import { getMapListAsync, uploadFileMapAsync } from '../../domens/medialibrarySlice/medialibrarySlice';
import { selectMedialibrary } from '../../domens/selectors';
import { AppDispatch } from '../../domens/store';
import { TicketType } from '../../typings/enum';
import { EventDate } from '../../typings/types';
import ModalDialog from '../ModalDialog/ModalDialog';
import UploadFiles from '../UploadFiles/UploadFiles';
import MapImage from './MapImage';

export type MapContent = FileList | null;
type Props = { open: boolean; onClose: () => void; selectedDate?: EventDate };
type FileListType = { map: MapContent | null; minimap: MapContent | null };

const initialFileList: FileListType = { map: null, minimap: null };

const AppMapModal = ({ open, onClose, selectedDate }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const { loading, maps } = useSelector(selectMedialibrary);
  const [fileList, setFileList] = useState<FileListType>(initialFileList);
  const [selected, setSelected] = useState<string | null>(null);

  const handleUpload = useCallback(() => {
    if (fileList.map && fileList.minimap) {
      dispatch(uploadFileMapAsync(fileList));
      setFileList(initialFileList);
    }
  }, [fileList, dispatch]);
  const handleSetFile = (flag: keyof typeof fileList) => (e: ChangeEvent<HTMLInputElement>) => {
    setFileList((prev) => ({ ...prev, [flag]: e.target.files || null }));
  };
  const handleAddMap = useCallback(() => {
    if (selected && selectedDate) {
      const { uid, ...data } = selectedDate;
      !!uid && dispatch(editEventDateAsync(uid, { ...data, type: TicketType.map, map: { uid: selected } }));
    }
    onClose();
  }, [selected, selectedDate, onClose, dispatch]);

  useEffect(() => {
    dispatch(getMapListAsync());
  }, [dispatch]);

  return (
    <ModalDialog
      open={open}
      onClose={onClose}
      title='Добавьте карту к дате события'
      actionButton={{
        variant: 'contained',
        color: 'success',
        startIcon: <SaveTwoToneIcon />,
        label: 'Выбрать',
        onClick: handleAddMap,
        disabled: !selected,
      }}
      contentActions={
        <Grid container sx={{ pt: 1 }}>
          <Grid item xs={12} container>
            <UploadFiles onChange={handleSetFile('map')} multiple={false}>
              <TextField
                sx={{ minWidth: 255, mr: 2 }}
                value={fileList.map ? fileList.map[0].name : 'Выберите файл svg. Файл не выбран'}
                InputProps={{ readOnly: true }}
                label='Загрузите карту'
                size='small'
                type='text'
                focused
              />
            </UploadFiles>
            <UploadFiles onChange={handleSetFile('minimap')} multiple={false}>
              <TextField
                sx={{ minWidth: 205 }}
                value={fileList.minimap ? fileList.minimap[0].name : 'Файл не выбран'}
                InputProps={{ readOnly: true }}
                label='Загрузите миникарту'
                size='small'
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
              disabled={!fileList.minimap || !fileList.map}
              startIcon={<AddTwoToneIcon fontSize='small' />}
            >
              Добавить
            </LoadingButton>
          </Grid>
        </Grid>
      }
    >
      <Grid container sx={{ width: '100%' }}>
        <Grid item xs={12}>
          {maps ? (
            <Box sx={{ mx: -1 }}>
              {maps.map((m) => (
                <MapImage key={m.uid} item={m} onClick={setSelected} selected={selected === m.uid} />
              ))}
            </Box>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', m: 1, minHeight: 213 }}>
              <Icon>
                <HourglassDisabledTwoToneIcon />
              </Icon>
            </Box>
          )}
        </Grid>
      </Grid>
    </ModalDialog>
  );
};

export default memo(AppMapModal);
