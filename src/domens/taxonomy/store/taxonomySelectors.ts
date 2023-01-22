import { select } from '../../selectors';
import { RootState } from '../../store';

export const selectTaxonomyStore = (state: RootState) => select(state)?.taxonomy;

export const selectTaxonomy = (state: RootState) => selectTaxonomyStore(state)?.taxonomy;
