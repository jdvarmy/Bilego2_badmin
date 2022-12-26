import React, { useEffect } from 'react';
import Taxonomy from './Taxonomy';
import { TermType } from '../../typings/enum';
import { useDispatch } from 'react-redux';
import { setTaxonomy } from '../../store/taxonomySlice/taxonomySlice';

const Feeling = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setTaxonomy(null));
    };
  }, [dispatch]);

  return <Taxonomy type={TermType.eventFeeling} />;
};

export default Feeling;
