import { Box, Checkbox } from '@mui/material';
import { ICellRendererParams } from 'ag-grid-community';
import React, { useState } from 'react';

import { useAppDispatch } from '../../../../store';
import { editTaxonomyAsync } from '../../../store/taxonomyThunk';
import { ITaxonomy } from '../../../types/types';

export const RenderCheckbox = (name: keyof Pick<ITaxonomy, 'showInMainPage' | 'showInMenu'>) => {
  return function RenderCheckbox(props: ICellRendererParams) {
    const dispatch = useAppDispatch();
    const [checked, setChecked] = useState(() => props.data?.[name] ?? false);
    const handleChange = (_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
      setChecked(checked);
      const data = { ...props.data };
      data[name] = checked;

      dispatch(editTaxonomyAsync(data as ITaxonomy))
        .unwrap()
        .then(() => {
          props.api.refreshInfiniteCache();
        });
    };

    return (
      <Box sx={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <Checkbox checked={checked} onChange={handleChange} />
      </Box>
    );
  };
};
