import React, { useEffect } from 'react';
import Taxonomy from './Taxonomy';
import { TermType } from '../../typings/enum';
import { useDispatch } from 'react-redux';
import { setTaxonomy } from '../../domen/taxonomy/taxonomySlice';
import { Taxonomy as ITaxonomy } from '../../typings/types';

const columns: (keyof ITaxonomy)[] = ['name', 'slug', 'description', 'icon', 'id', 'link'];

const Genre = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setTaxonomy(null));
    };
  }, [dispatch]);

  return <Taxonomy type={TermType.eventGenre} columns={columns} />;
};

export default Genre;
