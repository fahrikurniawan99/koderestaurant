import { Link } from "react-router-dom";
import { useProducts } from "../../hooks/useProduct";
import toCurrency from "../../utils/currency";
import Container from "../Container";

export default function Products() {
  const { state: productState, status } = useProducts();

  if (status === "error") {
    return (
      <div className="mt-3 py-5 text-center text-gray-400">
        <p className="mx-auto w-[80%]">
          Terjadi kesalahan, silahkan refresh halaman atau coba lagi nanti.
        </p>
      </div>
    );
  }

  return (
    <Container className="mb-5 mt-3 grid grid-cols-2 gap-3 gap-y-5 lg:grid-cols-5 lg:gap-6">
      {status === "loading" || status === "idle" ? (
        Array.from({ length: 8 }).map((_, index) => (
          <div key={index}>
            <div className="h-[150px] w-full rounded-lg bg-gray-300"></div>
            <div className="mt-1 lg:mt-2">
              <h1 className="h-4 w-32 rounded bg-gray-300"></h1>
              <h2 className="mt-2 h-3 w-16 rounded bg-gray-300"></h2>
            </div>
            {/* <button className="mt-3 w-full rounded-lg bg-gray-300 py-4"></button> */}
          </div>
        ))
      ) : (
        <>
          {productState.data.map((product) => (
            <Link
              to={`/product/${product.category.name}/${product._id}`}
              key={product._id}
              className="transition-all duration-500 hover:-translate-y-1"
            >
              <div className="h-[150px] overflow-hidden">
                <img
                  className="h-full w-full rounded-xl object-cover"
                  src={product.image.url}
                  alt={product.image.placeholer}
                />
              </div>
              <div className="mt-1 text-gray-700 lg:mt-2">
                <h1 className="w-full truncate font-semibold">
                  {product.name}
                </h1>
                <h2 className="text-sm text-green-500">
                  {toCurrency(product.price)}
                </h2>
              </div>
              {/* <Link
                to={`/product/${product.category.name}/${product._id}`}
                className="mt-3 inline-block w-full rounded-lg bg-green-500 py-2.5 text-center font-medium text-white"
              >
                Detail
              </Link> */}
            </Link>
          ))}
          {productState.data.length < 1 && (
            <div className="col-span-2 py-5 text-center text-gray-400 lg:col-span-5">
              <p>
                Maaf kategori ini belum tersedia <br />
                datang kembali kami akan sediakan.
              </p>
            </div>
          )}
        </>
      )}
    </Container>
  );
}
