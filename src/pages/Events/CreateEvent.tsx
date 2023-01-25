import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import SuspenseLoader from '../../components/SuspenseLoader/SuspenseLoader';
import { selectEventState } from '../../domens/events/store/eventsSelectors';
import { saveTemplateEventAsync } from '../../domens/events/store/eventsThunk';
import { AppDispatch } from '../../domens/store';

const EventDataContainer = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const eventState = useSelector(selectEventState);

  useEffect(() => {
    dispatch(saveTemplateEventAsync());
  }, [dispatch]);

  useEffect(() => {
    if (eventState?.uid) {
      navigate({ pathname: '/events/edit', search: `uid=${eventState.uid}&slug=${eventState.slug}` });
    }
  }, [eventState]);

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
