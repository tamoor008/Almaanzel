import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  inProgress: false
};

export const visitSlice = createSlice({
  name: 'visit',
  initialState,
  reducers: {
    setInProgress: (state, action) => {
      state.inProgress = action.payload;
    }
  }
});

const visitReducer = visitSlice.reducer;

export const visitActions = visitSlice.actions;
export default visitReducer;
