import LinkTwoToneIcon from '@mui/icons-material/LinkTwoTone';
import SaveTwoToneIcon from '@mui/icons-material/SaveTwoTone';
import { Box, Button, IconButton, TextField } from '@mui/material';
import CyrillicToTranslit from 'cyrillic-to-translit-js';
import React, { memo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import { setEventStateField } from '../../../domen/events/eventsSlice';
import { editEventAsync } from '../../../domen/events/eventsThunk';
import { AppDispatch } from '../../../domen/store';
import { useLocalSearchParams } from '../../../hooks/useLocalSearchParams';

type Props = {
  uid?: string;
  slug?: string;
};

const EventSlugCreator = ({ uid, slug }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const [, setSearchParams] = useSearchParams();
  const params = useLocalSearchParams();

  console.log('render EventSlugCreator');

  const [edit, setEdit] = useState<boolean>(false);
  const [localSlug, setLocalSlug] = useState<string | undefined>(slug);

  const handleClick = () => {
    setEdit((prev) => !prev);
    setLocalSlug(slug);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalSlug(e.target.value);
  };

  const handleSave = () => {
    setEdit((prev) => !prev);
    if (!localSlug) {
      setLocalSlug(slug);
      return;
    }

    if (uid) {
      // @ts-ignore
      const cyrillicToTranslit = new CyrillicToTranslit();
      const updatedSlug = cyrillicToTranslit.transform(localSlug, '-').toLowerCase();

      dispatch(setEventStateField({ slug: updatedSlug }));

      setSearchParams({ ...params, slug: updatedSlug });
      dispatch(editEventAsync({ uid, slug: updatedSlug }));
    }
  };

  const keyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.code === 'Enter') {
      handleSave();
    }
  };

  return edit ? (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <TextField
        label='Ссылка на событие'
        size='small'
        type='text'
        focused
        autoFocus
        value={localSlug}
        onChange={handleChange}
        onKeyDown={keyPress}
      />
      <IconButton color='primary' onClick={handleSave}>
        <SaveTwoToneIcon />
      </IconButton>
    </Box>
  ) : (
    <Button size='small' startIcon={<LinkTwoToneIcon fontSize='small' />} onClick={handleClick}>
      {slug}
    </Button>
  );
};

export default memo(EventSlugCreator);
