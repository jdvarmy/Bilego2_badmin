import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Checkbox } from '@mui/material';
import { ICellRendererParams } from 'ag-grid-community';
import { Taxonomy } from '../../../typings/types';
import { editTaxonomyAsync } from '../../../domen/taxonomy/taxonomyThunk';
import { AppDispatch } from '../../../domen/store';

export const RenderCheckbox = (name: keyof Pick<Taxonomy, 'showInMainPage' | 'showInMenu'>) => {
  return function RenderCheckbox(props: ICellRendererParams) {
    const dispatch: AppDispatch = useDispatch();
    const [checked, setChecked] = useState(() => props.data[name] || false);
    const handleChange = (_: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
      setChecked(checked);
      // удаляем картинки и иконки, тк по ним данные сохраняются в другой функции
      const data = Object.fromEntries(
        Object.entries(props.data as Taxonomy).filter(([key]) => !['image', 'icon'].includes(key)),
      );
      data[name] = checked;
      dispatch(editTaxonomyAsync(data as Taxonomy));
    };

    return (
      <Box sx={{ display: 'flex', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <Checkbox checked={checked} onChange={handleChange} />
      </Box>
    );
  };
};
