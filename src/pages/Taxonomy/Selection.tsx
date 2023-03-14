import React, { useEffect } from 'react';

import { taxonomyActions } from '../../domens/taxonomy/store/taxonomySlice';
import { ITaxonomy } from '../../domens/taxonomy/types/types';
import { TermType } from '../../typings/enum';
import { useActionCreators } from '../../utils/hooks/useActionCreators';
import { Taxonomy } from './Taxonomy';

const columns: (keyof ITaxonomy)[] = ['name', 'slug', 'description', 'icon', 'image', 'showInMenu', 'showInMainPage'];

const Selection = () => {
  const actions = useActionCreators(taxonomyActions);

  useEffect(
    () => () => {
      actions.setTaxonomy(null);
    },
    [actions],
  );

  return <Taxonomy type={TermType.eventSelection} columns={columns} />;
};

export default Selection;
