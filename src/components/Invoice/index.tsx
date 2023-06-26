import dayjs from "dayjs";
import useInvoice from "../../hooks/useInvoice";
import Container from "../Container";
import toCurrency from "../../utils/currency";
import { LuCookie } from "react-icons/lu";
import { Link } from "react-router-dom";

export default function Invoice() {
  const { data: invoice, status } = useInvoice();

  return status === "loading" || status === "idle" ? (
    <Container className="mx-auto w-full max-w-md text-gray-700 lg:px-0">
      <div className="mx-auto my-3 h-8 w-8 animate-pulse rounded bg-gray-400"></div>
      <h1 className="mx-auto h-6 w-36 animate-pulse rounded bg-gray-400"></h1>
      <h2 className="mt-5 h-5 w-36 animate-pulse rounded bg-gray-400"></h2>
      <p className="mt-2 h-5 w-24 animate-pulse rounded bg-gray-400"></p>
      <h2 className="mt-5 h-5 w-36 animate-pulse rounded bg-gray-400"></h2>
      <p className="mt-2 h-16 w-40 animate-pulse rounded bg-gray-400"></p>
      <h2 className="mt-5 h-5 w-10 animate-pulse rounded bg-gray-400"></h2>
      <div className="mt-2">
        <div className="rounded-md border p-3">
          <div className="flex">
            <div className="inline-block aspect-square h-16 animate-pulse rounded-md bg-gray-400"></div>
            <div className="ml-3">
              <h1 className="h-5 w-16 animate-pulse rounded bg-gray-400"></h1>
              <p className="mt-2 h-5 w-20 animate-pulse rounded bg-gray-400"></p>
            </div>
            <p className="ml-auto aspect-square h-5 animate-pulse rounded bg-gray-400"></p>
          </div>
          <h1 className="mt-2 h-5 w-10 animate-pulse rounded bg-gray-400"></h1>
          <p className="mt-2 h-5 w-16 animate-pulse rounded bg-gray-400"></p>
        </div>
        <h2 className="relative z-20 mt-5 h-5 w-40 animate-pulse rounded bg-gray-400"></h2>
        <div className="mt-2 h-7 w-24 animate-pulse rounded bg-gray-400"></div>
        <div className="mt-5 flex justify-between">
          <h1 className="h-6 w-28 animate-pulse rounded bg-gray-400"></h1>
          <p className="h-6 w-32 animate-pulse rounded bg-gray-400"></p>
        </div>
      </div>
    </Container>
  ) : invoice ? (
    <Container className="mx-auto w-full max-w-md text-gray-700 lg:px-0">
      <div className="mx-auto my-3 flex h-8 w-8 items-center justify-center rounded-md border-2 border-green-300 bg-green-500 text-white opacity-50">
        <LuCookie className="text-sm" />
      </div>
      <h1 className="text-center font-bold">
        Invoice #{invoice.order.orderId}
      </h1>
      <h2 className="mt-5 font-medium text-gray-400">Tanggal pemesanan</h2>
      <p>{dayjs(invoice.order.createdAt).format("DD MM YYYY")}</p>
      <h2 className="mt-5 font-medium text-gray-400">Alamat pengiriman</h2>
      <p>
        Desa/kelurahan {invoice.order.deliveryAddress.village}, <br />
        Kecamatan {invoice.order.deliveryAddress.district}, <br />
        Kabupaten/kota {invoice.order.deliveryAddress.regency},{" "}
        {invoice.order.deliveryAddress.province}
      </p>
      <h2 className="relative z-20 mt-5 font-medium text-gray-400">Item</h2>
      <div className="mt-2">
        <div className="space-y-3">
          {invoice.items.map((order) => (
            <div className="rounded-md border p-3">
              <div className="flex">
                <img
                  src={order.product.image.url}
                  alt={order.product.image.placeholer}
                  className="inline-block h-16 rounded-md"
                />
                <div className="ml-3">
                  <h1 className="font-medium">{order.product.name}</h1>
                  <p>{toCurrency(order.product.price)}</p>
                </div>
                <p className="ml-auto">{order.qty}x</p>
              </div>
              <h1 className="mt-2">Total</h1>
              <p>{toCurrency(order.totalPrice)}</p>
            </div>
          ))}
        </div>
        <h2 className="relative z-20 mt-5 font-medium text-gray-400">
          Metode pembayaran
        </h2>
        <div className="h-10 w-fit overflow-hidden rounded">
          <img
            alt={invoice.paymentMethod}
            src={`/${invoice.paymentMethod}.png`}
            className="h-16 -translate-y-3"
          />
        </div>
        <div className="mt-5 flex justify-between">
          <h1 className="font-semibold uppercase text-green-500">
            total bayar
          </h1>
          <p className="text-lg font-bold text-orange-500">
            {toCurrency(invoice.order.totalPayment)}
          </p>
        </div>
      </div>
      <Link
        to={"/transaction"}
        className="ml-auto mt-5 block w-fit rounded bg-green-500 px-4 py-3 font-medium text-white"
      >
        Kembali
      </Link>
    </Container>
  ) : (
    <>
      <img
        alt="marketing"
        src="/marketing.png"
        className="mx-auto w-full max-w-[500px]"
      />
      <h1 className="text-center text-2xl font-bold">
        Invoice tidak di temukan
      </h1>
    </>
  );
}
