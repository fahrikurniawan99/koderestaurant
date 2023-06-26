import * as React from "react";
import { toast } from "react-hot-toast";
import { LuBanknote, LuLoader2, LuSearch } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import ApiCart, { CartType } from "../../api/cart";
import ApiOrder from "../../api/order";
import useAuth from "../../hooks/useAuth";
import toCurrency from "../../utils/currency";
import Alert from "../Alert";
import Container from "../Container";
import Unauthorized from "../Unauthorized";
import DeliveryAddress, { DeliveryAddressForm } from "./DeliveryAddress";
import PaymentMethod, { PaymentMethodType } from "./PaymentMethod";
import useCart from "../../hooks/useCart";

export default function Checkout() {
  const [carts, setCarts] = React.useState<CartType[]>([]);
  const [formDeliveryAddress, setFormDeliveryAddress] =
    React.useState<DeliveryAddressForm>({
      district: "",
      province: "",
      regency: "",
      village: "",
    });
  const [paymentMethod, setPaymentMethod] =
    React.useState<PaymentMethodType>("mandiri");
  const total = carts.reduce(
    (prev, cur) => prev + cur.product.price * cur.qty,
    0
  );
  const auth = useAuth();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const navigate = useNavigate();
  const cart = useCart();

  const fetchCarts = React.useCallback(async () => {
    try {
      const response = await ApiCart.getCart();
      const data = response.data.data;
      setCarts(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  React.useEffect(() => {
    fetchCarts();
  }, [fetchCarts]);

  if (!auth.user) {
    return <Unauthorized />;
  }

  if (carts.length === 0) {
    return (
      <>
        <img
          alt=" web-designing"
          src=" web-designing.png"
          className="mx-auto w-full max-w-[500px]"
        />
        <h1 className="text-center text-2xl font-bold">Item tidak tersedia</h1>
        <p className="text-center text-gray-500">
          Tidak ada item yang di checkout.
        </p>
        <Link
          to={"/"}
          className="mx-auto my-4 mb-10 flex w-full max-w-[300px] items-center justify-center gap-1.5 rounded-md bg-green-500 px-4 py-3 text-sm font-medium text-white active:scale-105"
        >
          <LuSearch className="stroke-[2.5px] text-lg" /> Cari makanan
        </Link>
      </>
    );
  }

  return (
    <Container className="mt-3">
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            setIsSubmitting(true);
            const order = await ApiOrder.createOrder({
              deliveryAddress: formDeliveryAddress,
              totalItem: carts.length,
              totalPayment: total,
              paymentMethod: paymentMethod,
              items: carts.map((cart) => ({
                product: cart.product._id,
                qty: cart.qty,
                totalPrice: cart.product.price * cart.qty,
              })),
            });
            toast.success("Pemesanan selesai");
            cart.clear();
            navigate(`/invoice/${order.data.data.redirect}`);
          } catch (error) {
            console.log(error);
          } finally {
            setIsSubmitting(false);
          }
        }}
      >
        <h1 className="text-sm font-medium uppercase tracking-tight text-gray-400">
          Alamat Pengiriman
        </h1>
        <DeliveryAddress
          form={formDeliveryAddress}
          setForm={setFormDeliveryAddress}
        />
        <h1 className="mt-3 text-sm font-medium uppercase tracking-tight text-gray-400">
          Metode Pembayaran
        </h1>
        <Alert
          message="Anda bisa mengganti metode pembayaran dengan yang tersedia"
          type="Info"
        />
        <div className="mt-3 space-y-3">
          <PaymentMethod
            onButtonSelect={setPaymentMethod}
            active={paymentMethod}
            icon="mandiri"
            text="Bank Mandiri"
          />
          <PaymentMethod
            onButtonSelect={setPaymentMethod}
            active={paymentMethod}
            icon="gopay"
            text="Gopay"
          />
          <PaymentMethod
            onButtonSelect={setPaymentMethod}
            active={paymentMethod}
            icon="paypal"
            text="Paypal"
          />
        </div>
        <h1 className="mt-3 text-sm font-medium uppercase tracking-tight text-gray-400">
          kuitansi
        </h1>
        <div className="mb-10 mt-2 text-gray-700">
          {carts.map((cart) => (
            <div
              key={cart._id}
              className="relative rounded-2xl bg-gray-100 px-6 py-3.5"
            >
              <h1 className="font-medium">{cart.product.name}</h1>
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  {cart.qty} * {toCurrency(cart.product.price)}
                </p>
                <p className="after:content-[' '] font-medium after:absolute after:left-1/2 after:top-0 after:block after:h-full after:w-[98%] after:-translate-x-1/2 after:border-b after:border-dashed after:border-gray-300">
                  {toCurrency(cart.product.price * cart.qty)}
                </p>
              </div>
            </div>
          ))}
          <div className="flex justify-between rounded-2xl bg-gray-100 px-6 py-4">
            <h1 className="font-semibold uppercase text-green-500">
              total bayar
            </h1>
            <p className="text-lg font-bold text-orange-500">
              {toCurrency(total)}
            </p>
          </div>
        </div>
        <button
          disabled={isSubmitting}
          className="my-4 ml-auto flex w-full items-center rounded-md bg-green-500 px-4 py-3 text-sm font-medium text-white active:scale-105 disabled:opacity-70 lg:w-[40%]"
        >
          <span>{toCurrency(total)}</span>
          <span className="ml-auto">
            {isSubmitting ? "Loading" : "Buat pesanan"}
          </span>
          {isSubmitting ? (
            <LuLoader2 className="ml-1 animate-spin text-lg" />
          ) : (
            <LuBanknote className="ml-1 text-lg" />
          )}
        </button>
      </form>
    </Container>
  );
}
