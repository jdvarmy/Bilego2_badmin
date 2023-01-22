import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ICellRendererParams } from 'ag-grid-community';
import React from 'react';
import { useDispatch } from 'react-redux';

import TextFieldImage from '../../../components/TextFieldImage/TextFieldImage';
import { HTTP_URL } from '../../../typings/env';
import { MediaSelectData, Taxonomy } from '../../../typings/types';
import { AppDispatch } from '../../store';
import { saveTaxonomyMediaAsync } from '../store/taxonomyThunk';

const Img = styled('img')(
  () => `
    height: 100%;
  `,
);

export const RenderImage = (name: keyof Pick<Taxonomy, 'icon' | 'image'>) => {
  return function RenderImage(props: ICellRendererParams) {
    const dispatch: AppDispatch = useDispatch();
    const handleChangeMedia = (image: MediaSelectData) => {
      if (image?.id && props.data.id) {
        dispatch(saveTaxonomyMediaAsync({ id: +props.data.id, [name]: +image.id }));
      }
    };

    return (
      <Box sx={{ display: 'flex', height: '100%', justifyContent: 'space-between', alignItems: 'center' }}>
        {props.value?.path ? <Img src={`${HTTP_URL}${props.value.path}`} alt='' /> : <div />}
        <TextFieldImage label='Иконка' size='small' onSelect={handleChangeMedia} onlyIcon />
      </Box>
    );
  };
};
