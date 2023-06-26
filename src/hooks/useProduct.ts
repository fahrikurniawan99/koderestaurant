import * as React from "react";
import { useParams } from "react-router-dom";
import ApiProduct from "../api/product";
import { useDispatch, useSelector } from "react-redux";
import { Product, setDataProduct } from "../app/product";
import { RootState } from "../app/store";

export function useProducts() {
  const [status, setStatus] = React.useState<
    "loading" | "error" | "idle" | "success"
  >("idle");
  const params = useParams();
  const dispatch = useDispatch();
  const state = useSelector((state: RootState) => state.product);

  const fetchProduct = React.useCallback(async () => {
    setStatus("loading");
    try {
      const response = await ApiProduct.getAll({ category: params.category });
      const products = response.data.data;
      dispatch(setDataProduct(products));
      setStatus("success");
    } catch (error) {
      setStatus("error");
    }
  }, [params]);

  React.useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return { status, state };
}

export function useDetailProduct(id: string) {
  const [status, setStatus] = React.useState<
    "loading" | "error" | "idle" | "success"
  >("idle");
  const params = useParams();
  const [data, setData] = React.useState<Product>();

  const fetchProduct = React.useCallback(async () => {
    setStatus("loading");
    try {
      const response = await ApiProduct.getDetail(id);
      const product = response.data.data;
      setData(product);
      setStatus("success");
    } catch (error) {
      setStatus("error");
    }
  }, [params]);

  React.useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return { status, data };
}
