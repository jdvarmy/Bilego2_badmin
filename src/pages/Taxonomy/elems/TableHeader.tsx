import React, { useCallback, useEffect, useState } from 'react';
import { Box, Card, CardContent, CardHeader, Divider, Grid, IconButton, TextField, Tooltip } from '@mui/material';
import { TermLink, TermType } from '../../../typings/enum';
import { MediaSelectData, Taxonomy } from '../../../typings/types';
import { useDispatch, useSelector } from 'react-redux';
import { selectTaxonomyStore } from '../../../store/selectors';
import TextFieldImage from '../../../components/TextFieldImage/TextFieldImage';
import CyrillicToTranslit from 'cyrillic-to-translit-js';
import SaveAsTwoToneIcon from '@mui/icons-material/SaveAsTwoTone';
import { AppDispatch } from '../../../store/store';
import { saveTaxonomyAsync } from '../../../store/taxonomySlice/taxonomySlice';

type Props = {
  type: TermType;
  link: TermLink;
};

const TableHeader = ({ type, link }: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const initialState: Taxonomy = { name: '', type, link, slug: '' };
  const [taxonomy, setTaxonomy] = useState<Taxonomy>(initialState);

  const disabled = !(taxonomy.name && taxonomy.slug && taxonomy.icon);

  const handleChangeText = (field: keyof Taxonomy) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaxonomy({ ...taxonomy, [field]: event.target.value });
  };
  const handleChangeMedia = (field: keyof Taxonomy) => (image: MediaSelectData) => {
    setTaxonomy({ ...taxonomy, [field]: image });
  };
  const handleDeleteMedia = (field: keyof Taxonomy) => () => {
    setTaxonomy({ ...taxonomy, [field]: undefined });
  };
  const handleSave = useCallback(() => {
    dispatch(saveTaxonomyAsync(taxonomy));
    setTaxonomy(initialState);
  }, [taxonomy]);

  useEffect(() => {
    const cyrillicToTranslit = CyrillicToTranslit();
    const slug = cyrillicToTranslit.transform(taxonomy.name, '-').toLowerCase();

    setTaxonomy((prev) => ({ ...prev, slug }));
  }, [taxonomy.name]);

  return (
    <Card>
      <CardHeader title='Добавить новую запись' />
      <Divider />
      <CardContent>
        <Box component='form' noValidate autoComplete='off'>
          <Grid container spacing={3} alignItems='center'>
            <Grid item xs>
              <TextField
                label='Название'
                type='text'
                size='small'
                fullWidth
                value={taxonomy.name}
                focused={!!taxonomy.name}
                onChange={handleChangeText('name')}
              />
            </Grid>
            <Grid item xs>
              <TextField
                label='Ярлык'
                type='text'
                size='small'
                value={taxonomy.slug || ''}
                focused={!!taxonomy.slug}
                onChange={handleChangeText('slug')}
                fullWidth
                inputProps={{ pattern: '[A-Za-z]' }}
              />
            </Grid>
            <Grid item xs>
              <TextField
                label='Описание'
                type='text'
                size='small'
                fullWidth
                value={taxonomy.description || ''}
                focused={!!taxonomy.description}
                onChange={handleChangeText('description')}
              />
            </Grid>
            <Grid item xs>
              <TextFieldImage
                label='Иконка'
                size='small'
                value={taxonomy.icon as MediaSelectData}
                onSelect={handleChangeMedia('icon')}
                onDelete={handleDeleteMedia('icon')}
              />
            </Grid>
            <Grid item xs={1} container justifyContent='center' alignItems='stretch'>
              <Tooltip sx={{ ml: 2, my: 0.5 }} placement='top' arrow title='Сохранить'>
                <span>
                  <IconButton color='success' disabled={disabled} onClick={handleSave}>
                    <SaveAsTwoToneIcon />
                  </IconButton>
                </span>
              </Tooltip>
            </Grid>
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TableHeader;
