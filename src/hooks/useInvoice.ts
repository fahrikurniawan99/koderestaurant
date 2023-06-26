import * as React from "react";
import { useParams } from "react-router-dom";
import ApiInvoice, { InvoiceType } from "../api/invoice";

export default function useInvoice() {
  const [status, setStatus] = React.useState<
    "loading" | "error" | "idle" | "success"
  >("idle");
  const token = localStorage.getItem("token") ?? "";
  const [data, setData] = React.useState<InvoiceType>();
  const params = useParams();
  const id = String(params.id);

  const fetchInvoice = React.useCallback(async () => {
    if (token) {
      setStatus("loading");
      try {
        const response = await ApiInvoice.getInvoice(id);
        setData(response.data.data);
        setStatus("success");
      } catch (error: any) {
        setStatus("error");
      }
    }
  }, [token]);

  React.useEffect(() => {
    fetchInvoice();
  }, [fetchInvoice]);
  return { status, data };
}
