import { createSlice } from "@reduxjs/toolkit";

export type User = {
  name: string;
  email: string;
  customerId: string;
  role: string;
};

type State = {
  user: User | null;
};

const initialState: State = {
  user: null,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const reducer = slice.reducer;
export const { setUser } = slice.actions;
