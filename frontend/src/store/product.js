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

  fetchProducts: async () => {
    const response = await fetch("/api/products");
    const data = await response.json();
    setter({ products: data.data });
  },

  deleteProduct: async (productId) => {
    const response = await fetch(`/api/products/${productId}`, {
      method: "DELETE",
    });
    const data = await response.json();

    if (!data.success) {
      return { success: false, message: data.message };
    }

    // state.products - the current array of products
    // this updates the ui immediately:
    // state update; create a new array excluding the product with the matching ID
    // returns a new state object with the updated array
    setter((state) => ({
      products: state.products.filter((product) => product._id !== productId),
    }));
    return { success: true, message: data.message };
  },
}));
