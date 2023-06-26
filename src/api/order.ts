import { DeliveryAddressForm } from "../components/Checkout/DeliveryAddress";
import { PaymentMethodType } from "../components/Checkout/PaymentMethod";
import { apiWithBearer } from "./api";
import { InvoiceType } from "./invoice";

export type OrderType = {
  totalItem: number;
  orderId: string;
  status: string;
  createdAt: string;
  totalPayment: number;
  deliveryAddress: DeliveryAddressForm;
  invoice: InvoiceType;
};

export type OrderPayload = {
  deliveryAddress: DeliveryAddressForm;
  totalPayment: number;
  totalItem: number;
  paymentMethod: PaymentMethodType;
  items: {
    product: string;
    qty: number;
    totalPrice: number;
  }[];
};

const ApiOrder = {
  getOrders(date: { startDate: string; endDate: string }) {
    return apiWithBearer.get("/orders", {
      params: date,
    });
  },
  createOrder(payload: OrderPayload) {
    return apiWithBearer.post("/orders", payload);
  },
};

export default ApiOrder;
