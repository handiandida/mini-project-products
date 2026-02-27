import api from "../../services/api";
import type { Product } from "../../types/product.types";

interface ProductResponse {
  products: Product[];
}

export const getProducts = (search?: string) => {
  if (search) {
    return api.get<ProductResponse>("/products/search", {
      params: { q: search },
    });
  }
  return api.get<ProductResponse>("/products");
};

export const getProductById = (id: number) =>
  api.get<Product>(`/products/${id}`);

export const addProduct = (data: Partial<Product>) =>
  api.post<Product>("/products/add", data);

export const updateProduct = (id: number, title: string) =>
  api.patch(`/products/${id}`, {
    title,
  });

export const deleteProduct = (id: number) => api.delete(`/products/${id}`);
