import { Box, Container, Grid } from '@mui/material';
import React, { useEffect, useLayoutEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

import ContentContainer from '../../components/ContentContainer/ContentContainer';
import { PageHelmet } from '../../components/PageHelmet/PageHelmet';
import SuspenseLoader from '../../components/SuspenseLoader/SuspenseLoader';
import { Controls } from '../../domens/events/components/Controls/Controls';
import EventDates from '../../domens/events/components/EventDates/EventDates';
import EventGallery from '../../domens/events/components/EventGallery/EventGallery';
import EventHeader from '../../domens/events/components/EventHeader/EventHeader';
import { EventInfo } from '../../domens/events/components/EventInfo/EventInfo';
import { EventPlace } from '../../domens/events/components/EventPlace/EventPlace';
import { EventProps } from '../../domens/events/components/EventProps/EventProps';
import EventSEO from '../../domens/events/components/EventSEO/EventSEO';
import { EventTaxonomy } from '../../domens/events/components/EventTaxonomy/EventTaxonomy';
import TextRedactor from '../../domens/events/components/TextRedactor/TextRedactor';
import Tickets from '../../domens/events/components/Tickets/Tickets';
import { selectEventState } from '../../domens/events/store/eventsSelectors';
import { getEventAsync } from '../../domens/events/store/eventsThunk';
import { workerClearEventState } from '../../domens/events/store/worckers';
import { AppDispatch } from '../../domens/store';

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

  useLayoutEffect(
    () => () => {
      dispatch(workerClearEventState());
      // todo: удалить пост если тип поста временный, перед этим показать пользователю предупреждение
    },
    [dispatch],
  );

  if (!eventState) {
    return <SuspenseLoader />;
  }

  return (
    <>
      <PageHelmet title={`Событие ${eventState.title || eventState.slug || 'не определено во вселенной'}`} />
      <Container maxWidth='lg'>
        <Controls {...{ uid: eventState.uid, slug: eventState.slug, status: eventState.status }} />
      </Container>
      <ContentContainer>
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
              <EventPlace {...{ city: eventState.city, item: eventState.item, artist: eventState.artist }} />
            </Grid>
            <Grid item xs={12}>
              <EventTaxonomy {...{ uid: eventState.uid, stateTaxonomy: eventState.taxonomy }} />
            </Grid>
            <Grid item xs={12}>
              <EventDates {...{ uid: eventState.uid, dates: eventState.eventDates }} />
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
              <EventProps {...{ fragment: eventState.fragment, words: eventState.searchWords }} />
            </Grid>
            <Grid item xs={12}>
              <EventGallery />
            </Grid>
            <Grid item xs={12}>
              <EventSEO />
            </Grid>
          </Grid>
        </Box>
      </ContentContainer>
    </>
  );
};

export default EditEvent;
