import { select } from '../../../store/selectors';
import { RootState } from '../../../store/store';

export const selectTaxonomyStore = (state: RootState) => select(state)?.taxonomy;

export const selectTaxonomy = (state: RootState) => selectTaxonomyStore(state)?.taxonomy;
