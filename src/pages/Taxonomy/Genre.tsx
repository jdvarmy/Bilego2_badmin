import React from 'react';
import Taxonomy from './Taxonomy';
import { TermType } from '../../typings/enum';

const Genre = () => {
  return <Taxonomy type={TermType.eventGenre} />;
};

export default Genre;
