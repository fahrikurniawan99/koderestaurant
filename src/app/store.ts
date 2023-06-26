import { configureStore } from "@reduxjs/toolkit";
import { reducer as productReducer } from "./product";
import { reducer as cartReducer } from "./cart";
import { reducer as authReducer } from "./auth";

const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
