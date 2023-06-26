import { LuHistory, LuSearch } from "react-icons/lu";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useOrder from "../../hooks/useOrder";
import toCurrency from "../../utils/currency";
import Container from "../Container";
import KRInput from "../KRInput";
import Unauthorized from "../Unauthorized";
import Profile from "./Profile";
import dayjs from "dayjs";

export default function Transaction() {
  const auth = useAuth();
  const { status, data: orders, date, setDate } = useOrder();

  return auth.user ? (
    <>
      <Profile />
      <Container>
        <h2 className="mt-4 flex items-center gap-1 font-semibold">
          Histori Pemesanan
          <LuHistory className="stroke-[2.5px]" />
        </h2>
        <KRInput
          type="date"
          value={date.startDate}
          onChange={(e) => {
            setDate({ ...date, startDate: e.target.value });
          }}
          containerClassName="mt-3"
        />
        <KRInput
          type="date"
          value={date.endDate <= date.startDate ? date.startDate : date.endDate}
          min={date.startDate}
          onChange={(e) => {
            setDate({ ...date, endDate: e.target.value });
          }}
          containerClassName="mt-2"
        />
        {status === "idle" || status === "loading" ? (
          <div className="mt-5 space-y-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="rounded-md border bg-gray-100 p-3 text-gray-700"
              >
                <h1 className="animate-pulse font-bold ">
                  <span className="mr-2 inline-block h-6 w-24 rounded bg-gray-400"></span>
                  <span className="inline-block h-6 w-10 rounded bg-gray-400"></span>
                </h1>
                <div className="mt-3 flex animate-pulse ">
                  <p className="h-4 w-32 rounded bg-gray-400"></p>
                  <p className="ml-auto h-4 w-20 rounded bg-gray-400"></p>
                </div>
                <div className="mt-2 flex animate-pulse ">
                  <p className="h-4 w-20 rounded bg-gray-400"></p>
                  <p className="ml-auto h-4 w-5 rounded bg-gray-400"></p>
                </div>
                <div className="mt-2 flex animate-pulse ">
                  <p className="h-4 w-16 rounded bg-gray-400"></p>
                  <p className="ml-auto h-4 w-24 rounded bg-gray-400"></p>
                </div>
                <div className="mt-2 flex animate-pulse ">
                  <p className="h-4 w-36 rounded bg-gray-400"></p>
                  <div className="ml-auto h-14 w-36 rounded bg-gray-400"></div>
                </div>
                <button
                  disabled
                  className="ml-auto mt-5 block h-10 w-28 animate-pulse rounded-md bg-gray-400"
                ></button>
              </div>
            ))}
          </div>
        ) : orders.length > 0 ? (
          <div className="mt-5 space-y-2">
            {orders.map((order) => (
              <div className="rounded-md border p-3 text-gray-700">
                <h1 className="font-bold">
                  #{order.orderId}
                  <span className="ml-2 rounded bg-green-100 px-2 py-0.5 text-sm font-medium text-green-500">
                    {order.status}
                  </span>
                </h1>
                <div className="mt-3 flex">
                  <p className="text-gray-400">Total pembayaran</p>
                  <p className="ml-auto font-medium text-gray-700">
                    {toCurrency(order.totalPayment)}
                  </p>
                </div>
                <div className="mt-2 flex">
                  <p className="text-gray-400">Total item</p>
                  <p className="ml-auto font-medium text-gray-700">
                    {order.totalItem}x
                  </p>
                </div>
                <div className="mt-2 flex">
                  <p className="text-gray-400">Tanggal</p>
                  <p className="ml-auto font-medium text-gray-700">
                    {dayjs(order.createdAt).format("DD MMM YYYY")}
                  </p>
                </div>
                <div className="mt-2 flex">
                  <p className="text-gray-400">Alamat pengiriman</p>
                  <div className="ml-auto text-right font-medium text-gray-700">
                    <p>
                      {order.deliveryAddress.regency}, Provinsi{" "}
                      {order.deliveryAddress.province}
                    </p>
                  </div>
                </div>
                <Link
                  to={`/invoice/${order.invoice._id}`}
                  className="ml-auto mt-5 block w-fit rounded-md bg-orange-500 px-4 py-3 text-sm font-medium text-white"
                >
                  Lihat invoice
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <>
            <img
              alt="cryptocurrency-mobile-app"
              src="cryptocurrency-mobile-app.png"
              className="mx-auto w-full max-w-[500px]"
            />
            <h1 className="text-center text-2xl font-bold">
              Tidak ada histori transaksi
            </h1>
            <p className="text-center text-gray-500">
              Sepertinya anda belum pernah melakukan pemesanan
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
    </>
  ) : (
    <Unauthorized />
  );
}
