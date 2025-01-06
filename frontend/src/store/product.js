import { create } from "zustand";

// Zustand global store for managing product-related state
export const useProductStore = create((setter) => ({
  products: [],
  setProducts: (products) => setter({ products }),
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: "Please fill all fields" };
    }

    // POST request to add product to the database
    const response = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });

    // state update; add the new product to the products array
    const data = await response.json();
    setter((state) => ({ products: [...state.products, data.data] }));
    return { success: true, message: "Product created successfully" };
  },
}));
