import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import store from ".";

export type RootState = ReturnType<typeof store.getState>;

interface AppStore {
  isDrawerOpen: boolean;
}

const initialState: AppStore = {
  isDrawerOpen: false,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setIsDrawerOpen: (state, action: PayloadAction<boolean>) => {
      state.isDrawerOpen = action.payload;
    },
  },
});

export default appSlice.reducer;

export const { setIsDrawerOpen } = appSlice.actions;

export const selectIsDrawerOpen = (state: RootState) => state.app.isDrawerOpen;
