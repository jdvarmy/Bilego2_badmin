import React, { useEffect } from 'react';
import Taxonomy from './Taxonomy';
import { TermType } from '../../typings/enum';
import { setTaxonomy } from '../../store/taxonomySlice/taxonomySlice';
import { useDispatch } from 'react-redux';
import { Taxonomy as ITaxonomy } from '../../typings/types';

const columns: (keyof ITaxonomy)[] = [
  'name',
  'slug',
  'description',
  'icon',
  'image',
  'showInMenu',
  'showInMainPage',
  'id',
  'link',
];

const Selection = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setTaxonomy(null));
    };
  }, [dispatch]);

  return <Taxonomy type={TermType.eventSelection} columns={columns} />;
};

export default Selection;
