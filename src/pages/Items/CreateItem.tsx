import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

import SuspenseLoader from '../../components/SuspenseLoader/SuspenseLoader';
import { saveTemplateItemAsync } from '../../domens/items/store/itemsThunk';
import { workerItemClear } from '../../domens/items/store/workers';
import { itemsScope } from '../../domens/items/type/types';
import { useAppDispatch } from '../../domens/store';

const CreateItem = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(workerItemClear());
    dispatch(saveTemplateItemAsync())
      .unwrap()
      .then((itemState) => {
        if (itemState?.uid) {
          navigate({ pathname: `/${itemsScope}/edit`, search: `uid=${itemState.uid}&slug=${itemState.slug}` });
        }
      });
  }, [navigate, dispatch]);

  return (
    <>
      <Helmet>
        <title>Создание шаблона площадки</title>
      </Helmet>
      <SuspenseLoader key={1} />
    </>
  );
};

export default CreateItem;
