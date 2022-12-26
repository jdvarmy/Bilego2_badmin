import React, { useEffect } from 'react';
import Taxonomy from './Taxonomy';
import { TermType } from '../../typings/enum';
import { setTaxonomy } from '../../store/taxonomySlice/taxonomySlice';
import { useDispatch } from 'react-redux';

const Selection = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setTaxonomy(null));
    };
  }, [dispatch]);

  return <Taxonomy type={TermType.eventSelection} />;
};

export default Selection;
