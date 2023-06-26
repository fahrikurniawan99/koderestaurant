import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";
import { CartItem, addItem, clearItem, removeItem } from "../app/cart";

export default function useCart() {
  const state = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  const cart = {
    items: state.items,
    total: state.total,
    add(payload: CartItem) {
      dispatch(addItem(payload));
    },
    remove(payload: CartItem) {
      dispatch(removeItem(payload));
    },
    clear() {
      dispatch(clearItem());
    },
  };
  return cart;
}
