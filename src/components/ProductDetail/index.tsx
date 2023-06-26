import * as React from "react";
import { useParams } from "react-router-dom";
import useCart from "../../hooks/useCart";
import { useDetailProduct } from "../../hooks/useProduct";
import toCurrency from "../../utils/currency";
import Container from "../Container";
import { toast } from "react-hot-toast";

export default function ProductDetail() {
  const params = useParams();
  const { data: product, status } = useDetailProduct(String(params.id));
  const cart = useCart();
  const [qty, setQty] = React.useState(1);
  const isItemInCart =
    cart.items.filter((item) => item._id === product?._id).length > 0;

  const plus = () => setQty((prev) => prev + 1);
  const minus = () => setQty((prev) => prev - 1);

  if (status === "error") {
    return (
      <div className="mt-3 py-5 text-center text-gray-400">
        <p className="mx-auto w-[80%]">
          Terjadi kesalahan, silahkan refresh halaman atau coba lagi nanti.
        </p>
      </div>
    );
  }

  return status === "loading" || status === "idle" ? (
    <div className="lg:flex lg:gap-20 lg:px-28">
      <div className="aspect-square w-full animate-pulse bg-gray-300 lg:mt-3 lg:w-[40%] lg:shrink-0 lg:overflow-hidden lg:rounded-2xl"></div>
      <Container className="relative -top-20 w-full rounded-t-3xl bg-gray-100 pt-6 lg:static lg:w-[35%] lg:shrink-0 lg:bg-transparent lg:px-0">
        <h1 className="h-6 w-32 animate-pulse rounded-md bg-gray-300"></h1>
        <p className="mt-2 h-32 w-full animate-pulse rounded-md bg-gray-300"></p>
        <h2 className="mt-3 h-5 w-20 animate-pulse rounded-md bg-gray-300 lg:mt-5"></h2>
        <div className="mt-2 flex items-center text-center">
          <button className="aspect-square h-10 shrink-0 animate-pulse rounded-l-md bg-gray-300"></button>
          <p className="w-20 shrink-0 animate-pulse bg-gray-300 py-[20px] text-center"></p>
          <button className="aspect-square h-10 shrink-0 animate-pulse rounded-r-md bg-gray-300"></button>
        </div>
        <button className="mt-2 w-full rounded-xl bg-gray-300 py-8 lg:mt-5"></button>
      </Container>
    </div>
  ) : product ? (
    <div className="lg:flex lg:gap-20 lg:px-28">
      <div className="aspect-square w-full bg-black lg:mt-3 lg:w-[40%] lg:shrink-0 lg:overflow-hidden lg:rounded-2xl">
        <img alt={product?.image.placeholer} src={product?.image.url} />
      </div>
      <Container className="relative -top-20 w-full rounded-t-3xl bg-white py-6 text-gray-700 lg:static lg:w-[35%] lg:shrink-0 lg:rounded-none lg:px-0">
        <h1 className="text-lg font-bold">{product?.name}</h1>
        <p className="text-sm leading-relaxed tracking-tight text-gray-500">
          {product?.description}
        </p>
        <h2 className="mt-3 font-semibold lg:mt-5">
          {toCurrency(Number(product?.price))}
        </h2>
        <div className="mt-2 flex items-center text-center">
          <button
            disabled={qty >= 99}
            onClick={plus}
            className="aspect-square h-10 shrink-0 rounded-l-md border"
          >
            +
          </button>
          <p className="my-auto w-20 shrink-0 border-y py-[7px] text-center">
            {qty}
          </p>
          <button
            disabled={qty === 1}
            onClick={minus}
            className="aspect-square h-10 shrink-0 rounded-r-md border"
          >
            -
          </button>
        </div>
        <button
          onClick={() => {
            toast.success("Keranjang ditambahkan");
            cart.add({ ...product, qty });
            setQty(1);
          }}
          disabled={isItemInCart}
          className="mt-2 w-full rounded-xl bg-green-500 py-4 font-medium text-white disabled:opacity-80 lg:mt-5"
        >
          {isItemInCart ? "Berhasil di tambahkan" : "Tambahkan Keranjang"}
        </button>
      </Container>
    </div>
  ) : (
    <Container className="py-10 text-center text-gray-400">
      <p>Produk tidak di temukan</p>
    </Container>
  );
}
