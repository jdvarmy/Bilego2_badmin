import { Box, Grid } from '@mui/material';
import React, { useEffect, useLayoutEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

import ContentContainer from '../../components/ContentContainer/ContentContainer';
import { PageHelmet } from '../../components/PageHelmet/PageHelmet';
import SuspenseLoader from '../../components/SuspenseLoader/SuspenseLoader';
import EventDates from '../../domens/eventDates/components/EventDates/EventDates';
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
import { workerEventClear } from '../../domens/events/store/worckers';
import { Controls } from '../../domens/post/components/Controls/Controls';
import { useAppDispatch, useStateSelector } from '../../domens/store';
import { PostType } from '../../typings/enum';

const EditEvent = () => {
  const dispatch = useAppDispatch();
  const eventState = useStateSelector(selectEventState);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const uid = searchParams.get('uid');
    if (!eventState && uid) {
      dispatch(getEventAsync({ uid }));
    }
  }, [dispatch, eventState, searchParams]);

  useLayoutEffect(
    () => () => {
      dispatch(workerEventClear());
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
      <Controls {...{ uid: eventState.uid, slug: eventState.slug, status: eventState.status, type: PostType.event }} />
      <ContentContainer>
        <Box component='form' noValidate autoComplete='off' sx={{ width: '100%' }}>
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
