import { Product } from "../app/product";
import { PaymentMethodType } from "../components/Checkout/PaymentMethod";
import { apiWithBearer } from "./api";
import { OrderType } from "./order";

export type InvoiceType = {
  _id: string;
  paymentMethod: PaymentMethodType;
  items: {
    product: Product;
    qty: number;
    totalPrice: number;
    _id: string;
  }[];
  order: OrderType;
};

const ApiInvoice = {
  getInvoice(id: string) {
    return apiWithBearer.get(`/invoices/${id}`);
  },
};

export default ApiInvoice;
