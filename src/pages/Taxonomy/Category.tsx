import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { setTaxonomy } from '../../domens/taxonomy/store/taxonomySlice';
import { TermType } from '../../typings/enum';
import { Taxonomy as ITaxonomy } from '../../typings/types';
import Taxonomy from './Taxonomy';

const columns: (keyof ITaxonomy)[] = ['name', 'slug', 'description', 'icon', 'id', 'link'];

const Category = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setTaxonomy(null));
    };
  }, [dispatch]);

  return <Taxonomy type={TermType.eventCategory} columns={columns} />;
};

export default Category;
