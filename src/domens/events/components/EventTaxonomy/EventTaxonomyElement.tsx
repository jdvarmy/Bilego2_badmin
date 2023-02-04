import { MenuItem } from '@mui/material';
import React, { memo, useCallback, useEffect, useState } from 'react';

import SelectWithSearch from '../../../../components/SelectWithSearch/SelectWithSearch';
import { nameMapTaxonomy } from '../../../../pages/Taxonomy/Taxonomy';
import { TermType } from '../../../../typings/enum';
import { IEvent } from '../../../../typings/types';
import { isEqual } from '../../../../utils/helpers/isEqual';
import { useActionCreators } from '../../../../utils/hooks/useActionCreators';
import { useAppDispatch, useStateSelector } from '../../../store';
import { ChangeEventFieldType } from '../../hooks/useChangeFnFieldEventField';
import { selectEvent } from '../../store/eventsSelectors';
import { eventsActions } from '../../store/eventsSlice';
import { editEventAsync } from '../../store/eventsThunk';

type Props<T> = { type: TermType; eventUid: IEvent['uid']; selected: T; taxonomies: T; stateTaxonomy: T };

export const EventTaxonomyElement = memo(function EventTaxonomyElement<T extends IEvent['taxonomy']>({
  type,
  eventUid,
  taxonomies,
  selected,
  stateTaxonomy,
}: Props<T>) {
  const dispatch = useAppDispatch();
  const actionsEvents = useActionCreators(eventsActions);
  const taxonomy = useStateSelector((state) => selectEvent(state).taxonomy);
  const [localTax, setLocalTax] = useState<IEvent['taxonomy']>(() => taxonomies);

  console.info('render EventTaxonomyElement');

  const handleChangeTaxonomy = useCallback(
    (event: ChangeEventFieldType) => {
      const filterTax = (stateTaxonomy || []).filter((tax) => tax.type !== type);

      actionsEvents.setEventStateField({
        taxonomy: [...filterTax, ...(event.target.value as []).map((value) => JSON.parse(value))],
      });
    },
    [actionsEvents, stateTaxonomy, type],
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
},
isEqual);
