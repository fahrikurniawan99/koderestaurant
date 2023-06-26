import debounce from "lodash.debounce";
import * as React from "react";
import { LuLoader2, LuSearch } from "react-icons/lu";
import ApiProduct from "../../api/product";
import { Product } from "../../app/product";
import toCurrency from "../../utils/currency";
import Container from "../Container";
import { useNavigate } from "react-router-dom";

export default function Searching() {
  const [products, setProducts] = React.useState<Product[]>([]);
  const [status, setStatus] = React.useState<
    "idle" | "loading" | "error" | "success"
  >("idle");
  const navigate = useNavigate();

  const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const keyword = event.target.value;
    setStatus("loading");
    try {
      const response = await ApiProduct.getAll({
        search: keyword ? keyword : undefined,
      });
      if (!keyword) {
        setProducts([]);
        return setStatus("idle");
      }
      setProducts(response.data.data);
      setStatus("success");
    } catch (error) {
      setStatus("error");
    }
  };

  const debouncedResults = React.useMemo(() => {
    return debounce(handleChange, 300);
  }, []);

  React.useEffect(() => {
    return () => {
      debouncedResults.cancel();
    };
  });

  return (
    <Container>
      <div className="flex h-12 items-center rounded-lg  bg-gray-100">
        <div className="flex aspect-square h-full items-center justify-center text-xl text-green-500">
          <LuSearch />
        </div>
        <input
          onChange={debouncedResults}
          className="h-full w-full bg-transparent pr-3 outline-none"
          placeholder="Cari makanan di sini"
        />
      </div>
      {status === "loading" ? (
        <div className="mt-3">
          <button className="inline-flex h-12 w-full items-center justify-center rounded-lg bg-gray-100 text-gray-500">
            Harap Menunggu... <LuLoader2 className="ml-2 animate-spin" />
          </button>
        </div>
      ) : products.length > 0 ? (
        <>
          <p className="mt-3">Hasil Pencarian :</p>
          {products.map((product) => (
            <button
              onClick={() =>
                navigate(`/product/${product.category.name}/${product._id}`)
              }
              className="mt-2 inline-flex h-[70px] w-full rounded-lg bg-gray-100 p-3 text-gray-700 hover:opacity-70"
            >
              <div className="aspect-square h-full">
                <img
                  className="rounded-md"
                  src={product.image.url}
                  alt={product.image.placeholer}
                />
              </div>
              <div className="ml-3 text-left">
                <h1 className="font-semibold">{product.name}</h1>
                <p>{toCurrency(product.price)}</p>
              </div>
            </button>
          ))}
          <hr className="mt-3" />
        </>
      ) : status === "success" ? (
        <div className="mt-3">
          <button className="inline-flex h-12 w-full items-center justify-center rounded-lg bg-gray-100 text-gray-500">
            Produk tidak di temukan.
          </button>
        </div>
      ) : null}
    </Container>
  );
}
