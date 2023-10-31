import { ActionCreatorsMapObject, bindActionCreators } from '@reduxjs/toolkit';
import { useMemo } from 'react';

import { useAppDispatch } from '../../store/store';

export const useActionCreators = (actionsObject: ActionCreatorsMapObject): ActionCreatorsMapObject => {
  const dispatch = useAppDispatch();

  return useMemo(() => bindActionCreators(actionsObject, dispatch), [dispatch]);
};
