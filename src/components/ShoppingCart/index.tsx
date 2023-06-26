import * as React from "react";
import { toast } from "react-hot-toast";
import { LuArrowRight, LuLoader2, LuSearch, LuTrash2 } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import ApiCart, { ItemsPayload } from "../../api/cart";
import useCart from "../../hooks/useCart";
import toCurrency from "../../utils/currency";
import Container from "../Container";
import useAuth from "../../hooks/useAuth";
import Unauthorized from "../Unauthorized";

export default function ShoppingCart() {
  const cart = useCart();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const navigate = useNavigate();
  const auth = useAuth();

  if (!auth.user) {
    return <Unauthorized />;
  }

  return (
    <Container>
      {cart.items.length ? (
        <>
          <button
            onClick={() => {
              toast.success("Keranjang di kosongkan");
              cart.clear();
            }}
            className="ml-auto flex items-center justify-center gap-2 tracking-tight text-gray-400"
          >
            Hapus Semua <LuTrash2 className="text-xl " />
          </button>
          <div className="mt-3 border-y py-5">
            <h1 className="tracking-tight text-gray-400">Items</h1>
            <div className="mt-3 space-y-5">
              {cart.items.map((product) => (
                <div key={product._id} className="flex text-gray-700">
                  <img
                    className="aspect-square w-14 rounded-full"
                    alt={product.image.placeholer}
                    src={product.image.url}
                  />
                  <div className="ml-4">
                    <h1 className="font-semibold">{product.name}</h1>
                    <p className="-mt-1 tracking-tight text-gray-500">
                      {toCurrency(product.price)}
                    </p>
                  </div>
                  <p className="my-auto ml-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-sm">
                    {product.qty}
                  </p>
                  <LuTrash2
                    onClick={() => {
                      toast.success("1 item terhapus");
                      cart.remove(product);
                    }}
                    className="my-auto ml-2 text-2xl text-red-500"
                  />
                </div>
              ))}
            </div>
          </div>
          <button
            disabled={isSubmitting}
            onClick={async () => {
              try {
                setIsSubmitting(true);
                const items = cart.items.map((item) => ({
                  product: item._id,
                  qty: item.qty,
                })) as ItemsPayload[];
                await ApiCart.updateCart(items);
                toast.success("Checkout berhasil");
                navigate("/checkout");
              } catch (error) {
                console.log(error);
              } finally {
                setIsSubmitting(false);
              }
            }}
            className="my-4 ml-auto flex w-full items-center rounded-md bg-green-500 px-4 py-3 text-sm font-medium text-white active:scale-105 disabled:opacity-70 lg:w-[40%]"
          >
            <span>{toCurrency(cart.total)}</span>
            <span className="ml-auto">
              {isSubmitting ? "Loading" : "Checkout"}
            </span>
            {isSubmitting ? (
              <LuLoader2 className="ml-1 animate-spin text-lg" />
            ) : (
              <LuArrowRight className="ml-1 text-lg" />
            )}
          </button>
        </>
      ) : (
        <>
          <img
            alt="marketing"
            src="/marketing.png"
            className="mx-auto w-full max-w-[500px]"
          />
          <h1 className="text-center text-2xl font-bold">
            Keranjang belanja kosong
          </h1>
          <p className="text-center text-gray-500">
            Anda bisa memilih beberapa makanan kami.
          </p>
          <Link
            to={"/"}
            className="mx-auto my-4 mb-10 flex w-full max-w-[300px] items-center justify-center gap-1.5 rounded-md bg-green-500 px-4 py-3 text-sm font-medium text-white active:scale-105"
          >
            <LuSearch className="stroke-[2.5px] text-lg" /> Cari makanan
          </Link>
        </>
      )}
    </Container>
  );
}
