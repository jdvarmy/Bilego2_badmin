import React from 'react';
import Taxonomy from './Taxonomy';
import { TermType } from '../../typings/enum';

const Selection = () => {
  return <Taxonomy type={TermType.eventSelection} />;
};

export default Selection;
