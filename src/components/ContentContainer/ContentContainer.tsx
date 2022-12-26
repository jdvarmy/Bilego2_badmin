import React from 'react';
import { Container } from '@mui/material';

type Props = {
  children?: React.ReactNode;
};

const ContentContainer = ({ children }: Props) => {
  return (
    <Container maxWidth='lg' sx={{ display: 'flex', flex: '1 1 auto' }}>
      {children}
    </Container>
  );
};

export default ContentContainer;
