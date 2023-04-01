import React, { memo, useMemo } from 'react';

import ContentContainer from '../../components/ContentContainer/ContentContainer';
import { PageHelmet } from '../../components/PageHelmet/PageHelmet';
import PageTitle from '../../components/PageTitle/PageTitle';
import { TaxonomyTable } from '../../domens/taxonomy/components/TaxonomyTable/TaxonomyTable';
import { ITaxonomy } from '../../domens/taxonomy/types/types';
import { TermType, TermTypeLink } from '../../typings/enum';

type Props = {
  type: TermType;
  termType: TermTypeLink;
  columns: (keyof ITaxonomy)[];
};

export const nameMapTaxonomy = {
  [TermType.eventCategory]: 'Категории',
  [TermType.eventGenre]: 'Жанры',
  [TermType.eventFeeling]: 'Настроения',
  [TermType.eventSelection]: 'Подборки',
  [TermType.itemType]: 'Тип',
};

export const Taxonomy = memo(function Taxonomy(props: Props) {
  const name = useMemo(() => nameMapTaxonomy[props.type], [props.type]);

  return (
    <>
      <PageHelmet title={name} />
      <PageTitle title={name} />
      <ContentContainer>
        <TaxonomyTable {...props} />
      </ContentContainer>
    </>
  );
});
