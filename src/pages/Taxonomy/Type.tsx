import React, { useEffect } from 'react';

import { taxonomyActions } from '../../domens/taxonomy/store/taxonomySlice';
import { ITaxonomy } from '../../domens/taxonomy/types';
import { TermType, TermTypeLink } from '../../typings/enum';
import { useActionCreators } from '../../utils/hooks/useActionCreators';
import { Taxonomy } from './Taxonomy';

const columns: (keyof ITaxonomy)[] = ['name', 'slug', 'description', 'icon'];

const Type = () => {
  const actions = useActionCreators(taxonomyActions);

  useEffect(
    () => () => {
      actions.setTaxonomy(null);
    },
    [actions],
  );

  return <Taxonomy type={TermType.itemType} termType={TermTypeLink.item} columns={columns} />;
};

export default Type;
