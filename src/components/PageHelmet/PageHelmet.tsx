import React from 'react';
import { Helmet } from 'react-helmet-async';

type Props = {
  title: string;
};

export const PageHelmet = (props: Props) => {
  return (
    <Helmet>
      <title>{props.title}</title>
    </Helmet>
  );
};
