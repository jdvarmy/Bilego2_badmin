import { useMemo } from 'react';
import { ActionCreatorsMapObject, bindActionCreators } from 'redux';

import { useAppDispatch } from '../../domens/store';

export const useActionCreators = (actions: ActionCreatorsMapObject) => {
  const dispatch = useAppDispatch();

  return useMemo(() => bindActionCreators(actions, dispatch), [dispatch]);
};
