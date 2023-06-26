import { api } from "./api";

const ApiProduct = {
  getAll({ category, search }: { category?: string; search?: string }) {
    return api.get("/products", {
      params: {
        category,
        search,
      },
    });
  },
  getDetail(id: string) {
    return api.get(`/products/${id}`);
  },
};

export default ApiProduct;
