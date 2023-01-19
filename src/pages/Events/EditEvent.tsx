import { Box, Container, Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import SuspenseLoader from '../../components/SuspenseLoader/SuspenseLoader';
import Tickets from '../../components/Tickets/Tickets';
import { selectEventState } from '../../domen/events/eventsSelectors';
import { setEvent, setEventState } from '../../domen/events/eventsSlice';
import { getEventAsync } from '../../domen/events/eventsThunk';
import { AppDispatch } from '../../domen/store';
import EventDates from './elems/EventDates';
import EventGallery from './elems/EventGallery';
import EventHeader from './elems/EventHeader/EventHeader';
import { EventInfo } from './elems/EventInfo/EventInfo';
import { EventPlace } from './elems/EventPlace/EventPlace';
import { EventProps } from './elems/EventProps';
import EventSEO from './elems/EventSEO';
import { EventSlugCreator } from './elems/EventSlugCreator';
import { EventStatus } from './elems/EventStatus';
import { EventTaxonomy } from './elems/EventTaxonomy/EventTaxonomy';
import { SaveEventButtons } from './elems/SaveEventButtons';
import TextRedactor from './elems/TextRedactor';

const EditEvent = () => {
  const dispatch: AppDispatch = useDispatch();
  const eventState = useSelector(selectEventState);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const uid = searchParams.get('uid');
    if (!eventState && uid) {
      dispatch(getEventAsync(uid));
    }
  }, [dispatch, eventState, searchParams]);

  useEffect(() => {
    return () => {
      dispatch(setEvent(null));
      dispatch(setEventState(null));
      // todo: удалить пост если тип поста временный, перед этим показать пользователю предупреждение
    };
  }, [dispatch]);

  if (!eventState) {
    return <SuspenseLoader />;
  }

  return (
    <>
      <Helmet>
        <title>Событие {`${eventState.title || eventState.slug}` || 'не определено во вселенной'}</title>
      </Helmet>
      <Container maxWidth='lg'>
        <Grid container sx={{ my: 3 }} justifyContent='space-between' alignItems='center'>
          <Grid item xs>
            <EventSlugCreator {...{ uid: eventState.uid, slug: eventState.slug }} />
          </Grid>
          <Grid item xs container justifyContent='flex-end' alignItems='center'>
            <EventStatus status={eventState.status} />
            <SaveEventButtons />
          </Grid>
        </Grid>
      </Container>
      <Container maxWidth='lg'>
        <Box component='form' noValidate autoComplete='off'>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <EventInfo
                {...{
                  title: eventState.title,
                  image: eventState.image,
                  ageRestriction: eventState.ageRestriction,
                  isShowOnSlider: eventState.isShowOnSlider,
                  eventManager: eventState.eventManager,
                  concertManagerInfo: eventState.concertManagerInfo,
                  concertManagerPercentage: eventState.concertManagerPercentage,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <EventPlace city={eventState.city} item={eventState.item} artist={eventState.artist} />
            </Grid>
            <Grid item xs={12}>
              <EventTaxonomy uid={eventState.uid} stateTaxonomy={eventState.taxonomy} />
            </Grid>
            <Grid item xs={12}>
              <EventDates uid={eventState.uid} dates={eventState.eventDates} />
            </Grid>
            <Grid item xs={12}>
              <Tickets />
            </Grid>
            <Grid item xs={12}>
              <EventHeader type={eventState.headerType} />
            </Grid>
            <Grid item xs={12}>
              <TextRedactor text={eventState.text} />
            </Grid>
            <Grid item xs={12}>
              <EventProps fragment={eventState.fragment} words={eventState.searchWords} />
            </Grid>
            <Grid item xs={12}>
              <EventGallery />
            </Grid>
            <Grid item xs={12}>
              <EventSEO />
            </Grid>
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default EditEvent;
