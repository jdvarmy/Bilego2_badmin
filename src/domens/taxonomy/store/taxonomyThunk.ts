import { Key } from 'react';

import { TermType, TermTypeLink } from '../../../typings/enum';
import { Taxonomy } from '../../../typings/types';
import { AppThunk } from '../../store';
import {
  deleteTaxonomyRequest,
  fetchTaxonomyRequest,
  patchTaxonomyRequest,
  saveTaxonomyRequest,
} from '../api/taxonomyRequest';
import { selectTaxonomy } from './taxonomySelectors';
import { setTaxonomy } from './taxonomySlice';

export const getTaxonomyAsyncReq = async (link = TermTypeLink.event, type?: TermType) => {
  try {
    const { data } = await fetchTaxonomyRequest(link, type);

    return data;
  } catch (e) {
    console.log(e);
  }
};

export const getTaxonomyAsync =
  (type: TermType): AppThunk =>
  async (dispatch) => {
    const data = await getTaxonomyAsyncReq(TermTypeLink.event, type);
    dispatch(setTaxonomy(data.length ? data : null));
  };

export const saveTaxonomyAsync =
  (tax: Taxonomy): AppThunk =>
  async (dispatch) => {
    try {
      const clearTax = {
        ...tax,
        icon: typeof tax.icon === 'object' ? +tax.icon.id : tax.icon,
        image: typeof tax.image === 'object' ? +tax.image.id : tax.image,
      };

      const { data } = await saveTaxonomyRequest(clearTax);
      dispatch(setTaxonomy(data));
    } catch (e) {
      console.error(e);
    }
  };

export const editTaxonomyAsync =
  (tax: Partial<Taxonomy>): AppThunk =>
  async () => {
    try {
      patchTaxonomyRequest(tax);
    } catch (e) {
      // todo: если поймали ошибку, нужно показать пользователю и откатить изменения в таблице
      console.error(e);
    }
  };

export const saveTaxonomyMediaAsync =
  (tax: Pick<Taxonomy, 'id' | 'image' | 'icon'>): AppThunk =>
  async (dispatch, getState) => {
    try {
      const taxonomy = selectTaxonomy(getState());
      const { data } = await patchTaxonomyRequest(tax);

      const changeTaxIndex = taxonomy.findIndex((tax) => tax.id === data?.id);
      if (changeTaxIndex !== -1) {
        const changeTaxonomyArray = [...taxonomy];
        changeTaxonomyArray.splice(changeTaxIndex, 1, data);

        // todo: при изменении моргают все иконки в таблице, подумать как это исправить
        dispatch(setTaxonomy(changeTaxonomyArray));
      }
    } catch (e) {
      console.error(e);
    }
  };

// см пример в удалении события
export const deleteTaxonomyAsync =
  (id: Key): AppThunk =>
  async (dispatch, getState) => {
    try {
      const taxonomy = selectTaxonomy(getState());
      await deleteTaxonomyRequest(id);

      const changeTaxIndex = taxonomy.findIndex((tax) => tax.id === id);
      if (changeTaxIndex !== -1) {
        const changeTaxonomyArray = [...taxonomy];
        changeTaxonomyArray.splice(changeTaxIndex, 1);

        dispatch(setTaxonomy(changeTaxonomyArray));
      }
    } catch (e) {
      console.error(e);
    }
  };
