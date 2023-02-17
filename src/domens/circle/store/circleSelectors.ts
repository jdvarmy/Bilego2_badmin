import { select } from '../../selectors';
import { RootState } from '../../store';

export const selectCircleStore = (state: RootState) => select(state)?.circle;

export const selectHoveredCircle = (state: RootState) => selectCircleStore(state)?.hoveredCircle;

export const selectSelectedCircles = (state: RootState) => selectCircleStore(state)?.selectedCircles;
