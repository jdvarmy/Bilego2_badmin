import { Container } from '@mui/material';
import React from 'react';

type Props = {
  children?: React.ReactNode;
};

const ContentContainer = ({ children }: Props) => {
  return (
    <Container maxWidth='xl' sx={{ display: 'flex', flex: '1 1 auto' }}>
      {children}
    </Container>
  );
};

export default ContentContainer;
