import React, { useEffect } from 'react';
import Taxonomy from './Taxonomy';
import { TermType } from '../../typings/enum';
import { useDispatch } from 'react-redux';
import { setTaxonomy } from '../../store/taxonomySlice/taxonomySlice';

const Category = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setTaxonomy(null));
    };
  }, [dispatch]);

  return <Taxonomy type={TermType.eventCategory} />;
};

export default Category;
