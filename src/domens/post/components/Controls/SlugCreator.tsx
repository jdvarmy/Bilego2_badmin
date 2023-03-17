import LinkTwoToneIcon from '@mui/icons-material/LinkTwoTone';
import SaveTwoToneIcon from '@mui/icons-material/SaveTwoTone';
import { Box, Button, IconButton, TextField } from '@mui/material';
import React, { memo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { PostType } from '../../../../typings/enum';
import { translitSlug } from '../../../../utils/helpers/translitSlug';
import { useActionCreators } from '../../../../utils/hooks/useActionCreators';
import { useLocalSearchParams } from '../../../../utils/hooks/useLocalSearchParams';
import { eventsActions } from '../../../events/store/eventsSlice';
import { saveEventAsync } from '../../../events/store/eventsThunk';
import { itemsActions } from '../../../items/store/itemsSlice';
import { saveItemAsync } from '../../../items/store/itemsThunk';
import { useAppDispatch } from '../../../store';

type Props = {
  uid?: string;
  slug?: string;
  type: PostType;
};

export const SlugCreator = memo(function SlugCreator({ uid, slug, type }: Props) {
  const dispatch = useAppDispatch();
  const eventActions = useActionCreators(eventsActions);
  const itemActions = useActionCreators(itemsActions);
  const params = useLocalSearchParams();
  const [, setSearchParams] = useSearchParams();

  console.log('render SlugCreator');

  const [edit, setEdit] = useState<boolean>(false);
  const [localSlug, setLocalSlug] = useState<string | undefined>(slug);

  const workerHandler = ({ uid, slug }: { uid: string; slug: string }) => {
    switch (type) {
      case PostType.event:
        return () => {
          eventActions.setEventStateField({ slug });
          dispatch(saveEventAsync({ slug }));
        };
      case PostType.item:
        return () => {
          itemActions.setItemStateField({ slug });
          dispatch(saveItemAsync({ uid, slug }));
        };
      case PostType.artist:
        return () => ({});
    }
  };

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
      const updatedSlug = translitSlug(slug);

      workerHandler({ uid, slug: updatedSlug })();
      setSearchParams({ ...params, slug: updatedSlug });
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
});
