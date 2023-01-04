import React, { useCallback, useEffect } from 'react';
import { Box, Card, CardContent, CardHeader, Divider, Grid, IconButton, Tooltip } from '@mui/material';
import { TermTypeLink, TermType } from '../../../typings/enum';
import { Taxonomy } from '../../../typings/types';
import { useDispatch } from 'react-redux';
import CyrillicToTranslit from 'cyrillic-to-translit-js';
import SaveAsTwoToneIcon from '@mui/icons-material/SaveAsTwoTone';
import { AppDispatch } from '../../../domen/store';
import { saveTaxonomyAsync } from '../../../domen/taxonomy/taxonomyThunk';
import { useTaxonomyHeaderFields } from '../helpers/useTaxonomyHeaderFields';

type Props = {
  type: TermType;
  link: TermTypeLink;
  fields?: (keyof Taxonomy)[];
};

const TableHeader = (props: Props) => {
  const dispatch: AppDispatch = useDispatch();
  const { fields, taxonomy, initialTaxonomy, setTaxonomy } = useTaxonomyHeaderFields(props);

  const handleSave = useCallback(() => {
    dispatch(saveTaxonomyAsync(taxonomy));
    setTaxonomy(initialTaxonomy);
  }, [dispatch, initialTaxonomy, setTaxonomy, taxonomy]);

  const disabled = !(taxonomy.name && taxonomy.slug);

  useEffect(() => {
    const cyrillicToTranslit = CyrillicToTranslit();
    const slug = cyrillicToTranslit.transform(taxonomy.name, '-').toLowerCase();

    setTaxonomy((prev) => ({ ...prev, slug }));
  }, [setTaxonomy, taxonomy.name]);

  return (
    <Card>
      <CardHeader title='Добавить новую запись' />
      <Divider />
      <CardContent>
        <Box component='form' noValidate autoComplete='off'>
          <Grid container spacing={3} alignItems='center'>
            {fields.map(({ Component, ...props }, i) => (
              <Grid key={i} item xs>
                {
                  // @ts-ignore
                  <Component {...props} />
                }
              </Grid>
            ))}
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
