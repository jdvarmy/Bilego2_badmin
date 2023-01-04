import { MenuItem } from '@mui/material';
import React, { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import SelectWithSearch from '../../../../components/SelectWithSearch/SelectWithSearch';
import { selectEvent, selectEventState } from '../../../../domen/events/eventsSelectors';
import { EventStateFieldType, setEventStateField } from '../../../../domen/events/eventsSlice';
import { editEventAsync } from '../../../../domen/events/eventsThunk';
import { AppDispatch } from '../../../../domen/store';
import { ChangeEventType } from '../../../../hooks/useChangeFnEventField';
import { TermType } from '../../../../typings/enum';
import { Event } from '../../../../typings/types';
import { isEqual } from '../../../../utils/functions/isEqual';
import { nameMapTaxonomy } from '../../../Taxonomy/Taxonomy';

type Props = {
  type: TermType;
  eventUid: Event['uid'];
  selected: Event['taxonomy'];
  taxonomies: Event['taxonomy'];
};

const EventTaxonomyElement = ({ type, eventUid, taxonomies, selected }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const { taxonomy } = useSelector(selectEvent, isEqual);
  const { taxonomy: stateTaxonomy } = useSelector(selectEventState, isEqual);
  const [localTax, setLocalTax] = useState<Event['taxonomy']>(() => taxonomies);

  const handleChangeTaxonomy = useCallback(
    (event: ChangeEventType) => {
      const filterTax = (stateTaxonomy || []).filter((tax) => tax.type !== type);

      dispatch(
        setEventStateField({
          taxonomy: [...filterTax, ...(event.target.value as []).map((value) => JSON.parse(value))],
        } as EventStateFieldType),
      );
    },
    [dispatch, stateTaxonomy, type],
  );

  const handleSaveEventTaxonomy = useCallback(() => {
    if (Array.isArray(stateTaxonomy) && stateTaxonomy.length && !isEqual(stateTaxonomy, taxonomy)) {
      dispatch(editEventAsync({ uid: eventUid, taxonomy: stateTaxonomy }));
    }
    setLocalTax(taxonomies);
  }, [stateTaxonomy, taxonomy, taxonomies, dispatch, eventUid]);

  const fetchFnItems = useCallback(
    (search: string) => {
      setLocalTax(taxonomies.filter((tax) => tax.name.toLocaleLowerCase().includes(search)));
    },
    [taxonomies],
  );

  useEffect(() => {
    setLocalTax(taxonomies);
  }, [taxonomies]);

  return (
    <SelectWithSearch
      value={selected.map((v) => JSON.stringify(v)) || []}
      label={nameMapTaxonomy[type]}
      fullWidth
      multiple
      renderValue={(value) => (Array.isArray(value) ? value.map((s) => JSON.parse(s).name).join(', ') : '')}
      fetchFn={fetchFnItems}
      onChange={handleChangeTaxonomy}
      onClose={handleSaveEventTaxonomy}
    >
      {localTax
        .filter((i) => i?.id)
        .map((i) => (
          <MenuItem key={i.id} value={JSON.stringify(i)}>
            {i.name}
          </MenuItem>
        ))}
    </SelectWithSearch>
  );
};

export default memo(EventTaxonomyElement);
