import { Product } from "../app/product";
import { apiWithBearer } from "./api";

export type ItemsPayload = {
  product: string;
  qty: number;
};

export type CartType = {
  product: Product;
  qty: number;
  _id: string;
};

const ApiCart = {
  updateCart(items: ItemsPayload[]) {
    return apiWithBearer.put("/carts", { items });
  },
  getCart() {
    return apiWithBearer.get("/carts");
  },
};

export default ApiCart;
