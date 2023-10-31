import SaveAsTwoToneIcon from '@mui/icons-material/SaveAsTwoTone';
import { Box, Card, CardContent, CardHeader, Divider, Grid, IconButton, Tooltip } from '@mui/material';
import { AgGridReact } from 'ag-grid-react';
import CyrillicToTranslit from 'cyrillic-to-translit-js';
import React, { forwardRef, useCallback, useEffect } from 'react';

import { TermType, TermTypeLink } from '../../../../../typings/enum';
import { useAppDispatch } from '../../../../../store/store';
import { useTaxonomyHeaderFields } from '../../../hooks/useTaxonomyHeaderFields';
import { saveTaxonomyAsync } from '../../../store/taxonomyThunk';
import { ITaxonomy } from '../../../types';

type Props = {
  type: TermType;
  link: TermTypeLink;
  fields?: (keyof ITaxonomy)[];
};

export const TableHeader = forwardRef<AgGridReact, Props>(function TableHeader(props: Props, gridRef) {
  const dispatch = useAppDispatch();
  const { fields, taxonomy, initialTaxonomy, setTaxonomy } = useTaxonomyHeaderFields(props);

  const handleSave = useCallback(() => {
    dispatch(saveTaxonomyAsync(taxonomy))
      .unwrap()
      .then(() => {
        // @ts-ignore
        gridRef?.current?.api.refreshInfiniteCache();
        setTaxonomy(initialTaxonomy);
      });
  }, [dispatch, gridRef, initialTaxonomy, setTaxonomy, taxonomy]);

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
});
