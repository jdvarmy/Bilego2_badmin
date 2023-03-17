import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ICellRendererParams } from 'ag-grid-community';
import React from 'react';

import TextFieldImage from '../../../../../components/TextFieldImage/TextFieldImage';
import { MediaSelectData } from '../../../../../typings/types';
import { getImageSrc } from '../../../../medialibrary/helpers/getImageSrc';
import { ImageSizes } from '../../../../medialibrary/types/types';
import { useAppDispatch } from '../../../../store';
import { editTaxonomyAsync } from '../../../store/taxonomyThunk';
import { ITaxonomy } from '../../../types/types';

const Img = styled('img')(
  () => `
    height: 100%;
  `,
);
const style = { display: 'flex', height: '100%', justifyContent: 'space-between', alignItems: 'center' };

export const RenderImage = (name: keyof Pick<ITaxonomy, 'icon' | 'image'>) => {
  return function RenderImage(props: ICellRendererParams) {
    const dispatch = useAppDispatch();
    const handleChangeMedia = (image: MediaSelectData) => {
      if (image?.id && props.data.uid) {
        dispatch(editTaxonomyAsync({ ...props.data, [name]: +image.id }))
          .unwrap()
          .then(() => {
            props.api.refreshInfiniteCache();
          });
      }
    };

    return (
      <Box sx={style}>
        {props.value?.path ? <Img src={getImageSrc(props.value.path, ImageSizes.s)} alt='' /> : <div />}
        <TextFieldImage label='Иконка' size='small' onSelect={handleChangeMedia} onlyIcon />
      </Box>
    );
  };
};
