import { Box, Checkbox, FormControlLabel } from '@mui/material';
import { IFilterParams, ISetFilter, SetFilterModel } from 'ag-grid-community';
import React, { SyntheticEvent, forwardRef, useEffect, useImperativeHandle, useMemo, useState } from 'react';

import { isEqual } from '../../../utils/helpers/isEqual';
import { cityMap } from '../../../utils/helpers/mappers/cityMap';
import { useIsFirstRender } from '../../../utils/hooks/useIsFirstRender';

export const CityColumnFilter = forwardRef(function TextColumnFilter(props: IFilterParams, ref) {
  const isFirstRender = useIsFirstRender();
  const [city, setCity] = useState<string[]>(Object.keys(cityMap));
  const filterActive = useMemo(() => !isEqual(city.length, Object.keys(cityMap).length), [city]);

  useImperativeHandle(
    ref,
    (): Partial<ISetFilter> => ({
      isFilterActive() {
        return filterActive;
      },
      getModel(): SetFilterModel | null {
        return filterActive ? { filterType: 'set', values: city } : null;
      },
    }),
  );

  const handleChangeCheckbox = (key: string) => (_event: SyntheticEvent<Element, Event>, checked: boolean) => {
    if (checked) {
      setCity((prev) => [...new Set([...prev, key])]);
    } else {
      setCity((prev) => prev.filter((item) => item !== key));
    }
  };

  useEffect(() => {
    if (!isFirstRender) {
      props.filterChangedCallback();
    }
  }, [filterActive, city]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '328px', p: 2 }}>
      {Object.entries(cityMap).map(([key, value]) => (
        <FormControlLabel
          key={key}
          value={key}
          control={<Checkbox checked={!!city.find((item) => item === key)} size='small' color='success' />}
          label={value}
          labelPlacement='end'
          onChange={handleChangeCheckbox(key)}
        />
      ))}
    </Box>
  );
});
