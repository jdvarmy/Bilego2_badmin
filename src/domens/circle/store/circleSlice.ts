import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { DrawCircleType } from '../../../typings/types';

type State = {
  hoveredCircle: DrawCircleType | null;
  selectedCircles: DrawCircleType[];
};
const initialState: State = {
  hoveredCircle: null,
  selectedCircles: [],
};

const slice = createSlice({
  initialState,
  name: 'circle',
  reducers: {
    setHoveredCircle: (state, action: PayloadAction<DrawCircleType>) => {
      state.hoveredCircle = action.payload;
    },
    deleteHoveredCircle: (state) => {
      state.hoveredCircle = null;
    },
    setSelectedCircles: (state, action: PayloadAction<DrawCircleType>) => {
      const { selectedCircles } = state;

      if (selectedCircles.length > 0 && selectedCircles[0]?.multi !== action.payload.multi) {
        return;
      }

      const ifExist = selectedCircles.findIndex((circle) => circle.uid === action.payload.uid);
      if (ifExist !== -1) {
        state.selectedCircles?.splice(ifExist, 1);
      } else {
        state.selectedCircles?.push(action.payload);
      }
    },
    deleteSelectedCircle: (state, action: PayloadAction<string>) => {
      const ifExist = state.selectedCircles?.findIndex((circle) => circle.uid === action.payload);

      if (ifExist !== undefined && ifExist !== -1) {
        state.selectedCircles?.splice(ifExist, 1);
      }
    },
    clearSelectedCircle: (state) => {
      state.selectedCircles = [];
    },
  },
});

export const { actions: circleActions, reducer: circleReducer } = slice;
