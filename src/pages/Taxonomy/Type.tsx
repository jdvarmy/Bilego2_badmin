import React, { useEffect } from 'react';

import { taxonomyActions } from '../../domens/taxonomy/store/taxonomySlice';
import { TermType } from '../../typings/enum';
import { Taxonomy as ITaxonomy } from '../../typings/types';
import { useActionCreators } from '../../utils/hooks/useActionCreators';
import Taxonomy from './Taxonomy';

const columns: (keyof ITaxonomy)[] = ['name', 'slug', 'description', 'icon', 'id', 'link'];

const Type = () => {
  const actions = useActionCreators(taxonomyActions);

  useEffect(
    () => () => {
      actions.setTaxonomy(null);
    },
    [actions],
  );

  return <Taxonomy type={TermType.itemType} columns={columns} />;
};

export default Type;
