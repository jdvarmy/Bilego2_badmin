import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../domen/store';
import { selectEventState } from '../../domen/selectors';
import { saveTemplateEventAsync } from '../../domen/events/eventsThunk';
import SuspenseLoader from '../../components/SuspenseLoader/SuspenseLoader';

const EventDataContainer = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const event = useSelector(selectEventState);

  useEffect(() => {
    dispatch(saveTemplateEventAsync());
  }, [dispatch]);

  useEffect(() => {
    if (event?.uid) {
      navigate({ pathname: '/events/edit', search: `uid=${event.uid}&slug=${event.slug}` });
    }
  }, [event]);

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
