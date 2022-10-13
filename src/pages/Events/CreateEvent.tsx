import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { AppDispatch } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { saveTemplateEventAsync } from '../../store/eventsSlice/eventsSlice';
import SuspenseLoader from '../../components/SuspenseLoader/SuspenseLoader';
import { useNavigate } from 'react-router-dom';
import { selectEvent } from '../../store/selectors';

const EventDataContainer = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const event = useSelector(selectEvent);

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
