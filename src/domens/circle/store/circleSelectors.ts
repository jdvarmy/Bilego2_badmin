import { select } from '../../../store/selectors';
import { RootState } from '../../../store/store';

export const selectCircleStore = (state: RootState) => select(state)?.circle;

export const selectHoveredCircle = (state: RootState) => selectCircleStore(state)?.hoveredCircle;

export const selectSelectedCircles = (state: RootState) => selectCircleStore(state)?.selectedCircles;
