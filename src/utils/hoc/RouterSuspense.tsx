import React, { LazyExoticComponent, Suspense } from 'react';

import SuspenseLoader from '../../components/SuspenseLoader/SuspenseLoader';

export const RouterSuspense = (Element: LazyExoticComponent<() => JSX.Element>) => {
  return (
    <Suspense fallback={<SuspenseLoader key={1} />}>
      <Element />
    </Suspense>
  );
};
