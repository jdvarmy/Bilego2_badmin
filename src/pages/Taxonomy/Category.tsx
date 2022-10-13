import React from 'react';
import Taxonomy from './Taxonomy';
import { TermType } from '../../typings/enum';

const Category = () => {
  return <Taxonomy type={TermType.eventCategory} />;
};

export default Category;
