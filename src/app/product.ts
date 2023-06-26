import { createSlice } from "@reduxjs/toolkit";

export type Product = {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: {
    url: string;
    publicId: string;
    placeholer: string;
  };
  category: {
    name: string;
  };
};

type State = {
  data: Product[];
};

const initialState: State = {
  data: [],
};

const slice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setDataProduct(state, action) {
      state.data = action.payload;
    },
  },
});

export const reducer = slice.reducer;
export const { setDataProduct } = slice.actions;
