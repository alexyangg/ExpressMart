import { create } from "zustand";

// Zustand global store for managing product-related state
export const useProductStore = create((setter) => ({
  products: [],
  product: null,
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
    console.log("fetched success");
  },

  fetchProductById: async (productId) => {
    const response = await fetch(`/api/products/${productId}`);
    const data = await response.json();
    setter({ product: data.data });
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

  updateProduct: async (productId, updatedProduct) => {
    const response = await fetch(`/api/products/${productId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });
    const data = await response.json();

    if (!data.success) {
      return { success: false, message: data.message };
    }

    // state update; map over the products array and update the product with the matching ID
    // this updates the ui immediately
    // setter((state) => ({
    //   products: state.products.map(
    //     (product) => (product._id === productId ? data.data : product) // make sure correct field (data.data) is being accessed from the backend
    //   ),
    // }));
    setter((state) => {
      if (state.product._id === productId) {
        return { product: data.data };
      }
      return state;
    });

    return { success: true, message: data.message };
  },
}));
