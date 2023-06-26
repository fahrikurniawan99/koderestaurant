import { createSlice } from "@reduxjs/toolkit";
import { Product } from "./product";

export type CartItem = Product & {
  qty: number;
};

type State = {
  items: CartItem[];
  total: number;
};

const sumTotal = (items: CartItem[]) => {
  const total: number =
    items.length > 0
      ? items.reduce((prev, cur) => prev + cur.price * cur.qty, 0)
      : 0;
  return total;
};

const initialState: State = {
  items: localStorage.getItem("cart-items")
    ? JSON.parse(localStorage.getItem("cart-items") || "[]")
    : [],
  total: localStorage.getItem("cart-items")
    ? sumTotal(
        JSON.parse(localStorage.getItem("cart-items") || "[]") as CartItem[]
      )
    : 0,
};

const slice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setTotal(state, action) {
      state.total = sumTotal(action.payload);
    },
    addItem(state, action) {
      state.items.push(action.payload as CartItem);
      state.total = sumTotal(state.items);
      localStorage.setItem("cart-items", JSON.stringify(state.items));
    },
    removeItem(state, action) {
      const item = state.items.find(
        (value) => value._id === action.payload._id
      );
      if (item) {
        const items = state.items.filter(
          (value) => value._id !== action.payload._id
        );
        state.items = items;
        state.total = sumTotal(items);
        localStorage.setItem("cart-items", JSON.stringify(items));
      }
    },
    clearItem(state) {
      const items = [] as CartItem[];
      state.items = items;
      state.items = items;
      localStorage.setItem("cart-items", JSON.stringify(items));
    },
  },
});

export const reducer = slice.reducer;
export const { addItem, removeItem, clearItem, setTotal } = slice.actions;
