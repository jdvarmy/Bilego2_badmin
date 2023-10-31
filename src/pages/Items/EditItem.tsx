import { Box, Grid } from '@mui/material';
import React, { useEffect, useLayoutEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import ContentContainer from '../../components/ContentContainer/ContentContainer';
import { PageHelmet } from '../../components/PageHelmet/PageHelmet';
import SuspenseLoader from '../../components/SuspenseLoader/SuspenseLoader';
import { ItemInfo } from '../../domens/items/components/ItemInfo/ItemInfo';
import { selectItemState } from '../../domens/items/store/itemsSelector';
import { getItemAsync } from '../../domens/items/store/itemsThunk';
import { workerItemClear } from '../../domens/items/store/workers';
import { Controls } from '../../domens/post/components/Controls/Controls';
import { useAppDispatch, useStateSelector } from '../../store/store';
import { PostType } from '../../typings/enum';

const EditItem = () => {
  const dispatch = useAppDispatch();
  const itemState = useStateSelector(selectItemState);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const uid = searchParams.get('uid');
    if (!itemState && uid) {
      dispatch(getItemAsync({ uid }));
    }
  }, [dispatch, itemState, searchParams]);

  useLayoutEffect(
    () => () => {
      dispatch(workerItemClear());
      // todo: удалить пост если тип поста временный, перед этим показать пользователю предупреждение
    },
    [dispatch],
  );

  if (!itemState) {
    return <SuspenseLoader key={1} />;
  }

  return (
    <>
      <PageHelmet title={`Площадка ${itemState.title || itemState.slug || 'не определена во вселенной'}`} />
      <Controls {...{ uid: itemState.uid, slug: itemState.slug, status: itemState.status, type: PostType.item }} />
      <ContentContainer>
        <Box component='form' noValidate autoComplete='off' sx={{ width: '100%' }}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <ItemInfo
                {...{
                  uid: itemState.uid,
                  title: itemState.title,
                  image: itemState.image,
                  city: itemState.city,
                  taxonomy: itemState.taxonomy,
                }}
              />
            </Grid>
          </Grid>
        </Box>
      </ContentContainer>
    </>
  );
};

export default EditItem;
