import React from 'react';
import Taxonomy from './Taxonomy';
import { TermType } from '../../typings/enum';

const Feeling = () => {
  return <Taxonomy type={TermType.eventFeeling} />;
};

export default Feeling;
