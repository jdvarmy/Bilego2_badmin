import { Dispatch, SetStateAction, useEffect } from 'react';

import { addAlertErrorAsync } from '../../domens/alert/store/alertThunk';
import { PagePostProps } from '../../domens/post/types';
import { useAppDispatch } from '../../store/store';
import { fetchTaxonomyRequest } from '../../domens/taxonomy/api/taxonomyRequest';
import { ITaxonomy } from '../../domens/taxonomy/types';

export function useTaxonomyRequest<T>(
  filter: PagePostProps<ITaxonomy>,
  setTaxonomyFunction: Dispatch<SetStateAction<T>>,
) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    fetchTaxonomyRequest(filter)
      .then(({ data }) => {
        const localRes = data?.items?.map((tax) => ({ uid: tax.uid, name: tax.name, type: tax.type })) ?? [];
        setTaxonomyFunction(localRes as T);
      })
      .catch((reject) => {
        dispatch(addAlertErrorAsync(reject));
      });
  }, [dispatch]);
}
