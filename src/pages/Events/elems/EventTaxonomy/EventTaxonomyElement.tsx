import React, { memo, useCallback, useEffect, useState } from 'react';
import { MenuItem } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Event } from '../../../../typings/types';
import SelectWithSearch from '../../../../components/SelectWithSearch/SelectWithSearch';
import { TermType } from '../../../../typings/enum';
import { AppDispatch } from '../../../../store/store';
import { ChangeEventType } from '../../../../hooks/useChangeFnEventField';
import { nameMapTaxonomy } from '../../../Taxonomy/Taxonomy';
import { EventStateFieldType, setEventStateField } from '../../../../store/eventsSlice/eventsSlice';
import { selectEvent } from '../../../../store/selectors';

type Props = {
  type: TermType;
  selected: Event['taxonomy'];
  taxonomies: Event['taxonomy'];
};

const EventTaxonomyElement = ({ type, taxonomies, selected }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const { taxonomy } = useSelector(selectEvent);
  const [localTax, setLocalTax] = useState<Event['taxonomy']>(() => taxonomies);

  const handleChangeTaxonomy = useCallback(
    (event: ChangeEventType) => {
      const filterTax = (taxonomy || []).filter((tax) => tax.type !== type);

      dispatch(setEventStateField({ taxonomy: [...filterTax, ...(event.target.value as [])] } as EventStateFieldType));
    },
    [dispatch, taxonomy, type],
  );

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
      value={selected || []}
      label={nameMapTaxonomy[type]}
      fullWidth
      multiple
      onChange={handleChangeTaxonomy}
      fetchFn={fetchFnItems}
    >
      {localTax
        .filter((i) => i?.id)
        .map((i) => (
          <MenuItem key={i?.id} value={i as any}>
            {i?.name}
          </MenuItem>
        ))}
    </SelectWithSearch>
  );
};

export default memo(EventTaxonomyElement);
