import { ActionCreatorsMapObject, bindActionCreators } from '@reduxjs/toolkit';
import { useMemo } from 'react';

import { useAppDispatch } from '../../domens/store';

export const useActionCreators = (actionsObject: ActionCreatorsMapObject) => {
  const dispatch = useAppDispatch();

  return useMemo(() => bindActionCreators(actionsObject, dispatch), [dispatch]);
};
