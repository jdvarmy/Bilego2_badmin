import React, { useEffect } from 'react';
import Taxonomy from './Taxonomy';
import { TermType } from '../../typings/enum';
import { useDispatch } from 'react-redux';
import { setTaxonomy } from '../../domen/taxonomy/taxonomySlice';
import { Taxonomy as ITaxonomy } from '../../typings/types';

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
