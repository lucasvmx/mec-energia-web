import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { makeStore } from ".";

export interface AppState {
  isDrawerOpen: boolean;
}

export type AppDispatch = Store["dispatch"];
export type RootState = ReturnType<Store["getState"]>;
type Store = ReturnType<typeof makeStore>;

const initialState: AppState = {
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
