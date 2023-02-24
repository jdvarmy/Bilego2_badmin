import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';

import SuspenseLoader from '../../components/SuspenseLoader/SuspenseLoader';
import { saveTemplateEventAsync } from '../../domens/events/store/eventsThunk';
import { workerEventClear } from '../../domens/events/store/worckers';
import { useAppDispatch } from '../../domens/store';

const EventDataContainer = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(workerEventClear());
    dispatch(saveTemplateEventAsync())
      .unwrap()
      .then((eventState) => {
        if (eventState?.uid) {
          navigate({ pathname: '/events/edit', search: `uid=${eventState.uid}&slug=${eventState.slug}` });
        }
      });
  }, [navigate, dispatch]);

  return (
    <>
      <Helmet>
        <title>Создание шаблона события</title>
      </Helmet>
      <SuspenseLoader />
    </>
  );
};

export default EventDataContainer;
