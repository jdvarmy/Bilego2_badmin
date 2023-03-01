import { Box, Checkbox, FormControlLabel } from '@mui/material';
import { IFilterParams, ISetFilter, SetFilterModel } from 'ag-grid-community';
import React, { SyntheticEvent, forwardRef, useEffect, useImperativeHandle, useMemo, useState } from 'react';

import { isEqual } from '../../../utils/helpers/isEqual';
import { postStatusMap } from '../../../utils/helpers/mappers/postStatusMap';
import { useIsFirstRender } from '../../../utils/hooks/useIsFirstRender';

export const StatusColumnFilter = forwardRef(function TextColumnFilter(props: IFilterParams, ref) {
  const isFirstRender = useIsFirstRender();
  const [status, setStatus] = useState<string[]>(Object.keys(postStatusMap));
  const filterActive = useMemo(() => !isEqual(status.length, Object.keys(postStatusMap).length), [status]);

  useImperativeHandle(
    ref,
    (): Partial<ISetFilter> => ({
      isFilterActive() {
        return filterActive;
      },
      getModel(): SetFilterModel | null {
        return filterActive ? { filterType: 'set', values: status } : null;
      },
    }),
  );

  const handleChangeCheckbox = (key: string) => (_event: SyntheticEvent<Element, Event>, checked: boolean) => {
    if (checked) {
      setStatus((prev) => [...new Set([...prev, key])]);
    } else {
      setStatus((prev) => prev.filter((item) => item !== key));
    }
  };

  useEffect(() => {
    if (!isFirstRender) {
      props.filterChangedCallback();
    }
  }, [filterActive, status]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '328px', p: 2 }}>
      {Object.entries(postStatusMap).map(([key, value]) => (
        <FormControlLabel
          key={key}
          value={key}
          control={<Checkbox checked={!!status.find((item) => item === key)} size='small' color='success' />}
          label={value}
          labelPlacement='end'
          onChange={handleChangeCheckbox(key)}
        />
      ))}
    </Box>
  );
});
