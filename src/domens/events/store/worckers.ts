import { createAsyncThunk } from '@reduxjs/toolkit';

import { City } from '../../../typings/enum';
import { addAlertErrorAsync } from '../../alert/store/alertThunk';
import { ServerErrorStatus } from '../../alert/types/types';
import { fetchArtistsRequest } from '../../artists/api/artistsRequest';
import { eventDatesActions } from '../../eventDates/store/eventDatesSlice';
import { fetchItemsRequest } from '../../items/api/itemsRequest';
import { EventRequest, IEvent, eventsScope } from '../types/types';
import { eventsActions } from './eventsSlice';

export const workerEventClear = createAsyncThunk(`${eventsScope}/workerEventClear`, (_, { dispatch }) => {
  dispatch(eventsActions.setEvent(null));
  dispatch(eventsActions.setEventState(null));
  dispatch(eventDatesActions.setSelectedDateUid(undefined));
});

export function workerPrepareData(event: IEvent): EventRequest {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { eventDates, create, update, taxonomy, image, headerImage, item, artist, eventManager, ...other } = event;

  const filteredEventDates = eventDates?.map((eventDate) => {
    const { uid, type, dateFrom, dateTo, closeDateTime } = eventDate;
    return { uid, type, dateFrom, dateTo, closeDateTime };
  });
  const filteredTaxonomy = taxonomy?.map((tax) => +tax.id);
  const filteredImage = !Number.isNaN(+image?.id) ? +image?.id : undefined;
  const filteredHeaderImage = !Number.isNaN(+headerImage?.id) ? +headerImage?.id : undefined;

  const filteredItem = item?.uid;
  const filteredArtist = artist?.map((a) => a.uid);
  const filteredEventManager = eventManager?.uid;

  return {
    ...other,
    ageRestriction: !isNaN(Number(other.ageRestriction)) ? +other.ageRestriction : 0,
    concertManagerPercentage: !isNaN(Number(other.concertManagerPercentage)) ? +other.concertManagerPercentage : 0,
    eventDates: filteredEventDates,
    taxonomy: filteredTaxonomy,
    image: filteredImage,
    headerImage: filteredHeaderImage,
    eventManager: filteredEventManager,
    item: filteredItem,
    artist: filteredArtist,
  };
}

export const workerGetArtistListForEvent = createAsyncThunk(
  `${eventsScope}/workerGetArtistListForEvent`,
  async ({ search }: { search: string }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await fetchArtistsRequest({ search });

      return data;
    } catch (error) {
      dispatch(addAlertErrorAsync(error as ServerErrorStatus));
      return rejectWithValue(error);
    }
  },
);

export const workerGetItemListForEvent = createAsyncThunk(
  `${eventsScope}/workerGetItemListForEvent`,
  async ({ search, params }: { search: string; params: { city?: City } }, { dispatch, rejectWithValue }) => {
    try {
      const { data } = await fetchItemsRequest({ search, ...params });

      return data;
    } catch (error) {
      dispatch(addAlertErrorAsync(error as ServerErrorStatus));
      return rejectWithValue(error);
    }
  },
);
