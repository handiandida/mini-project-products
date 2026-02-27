import { create } from "zustand";
import type { Product } from "../../types/product.types";

interface ProductState {
  products: Product[];
  setProducts: (data: Product[]) => void;
  addProductLocal: (product: Product) => void;
  updateProductLocal: (product: Product) => void;
  deleteProductLocal: (id: number) => void;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],

  setProducts: (data) => set({ products: data }),

  addProductLocal: (product) =>
    set((state) => ({
      products: [product, ...state.products],
    })),

  updateProductLocal: (updatedProduct) =>
    set((state) => ({
      products: state.products.map((p) =>
        p.id === updatedProduct.id ? { ...p, title: updatedProduct.title } : p,
      ),
    })),

  deleteProductLocal: (id) =>
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
    })),
}));
