import * as React from "react";
import ApiOrder, { OrderType } from "../api/order";
import dayjs from "dayjs";

export default function useOrder() {
  const [status, setStatus] = React.useState<
    "loading" | "error" | "idle" | "success"
  >("idle");
  const token = localStorage.getItem("token") ?? "";
  const [date, setDate] = React.useState({
    startDate: dayjs(new Date()).format("YYYY-MM-DD"),
    endDate: dayjs(new Date()).format("YYYY-MM-DD"),
  });
  const [data, setData] = React.useState<OrderType[]>([]);

  const fetchOrder = React.useCallback(async () => {
    if (token) {
      setStatus("loading");
      try {
        const response = await ApiOrder.getOrders(date);
        setData(response.data.data);
        setStatus("success");
      } catch (error: any) {
        setStatus("error");
      }
    }
  }, [token, date]);

  React.useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);
  return { status, setDate, date, data };
}
