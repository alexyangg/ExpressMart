import { create } from "zustand";

export const useAuthStore = create((setter) => ({
  user: null,
  isAuthenticated: false,

  login: async (credentials) => {
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        setter({ user: data.user, isAuthenticated: true });
        localStorage.setItem("token", data.token);
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      return { success: false, message: "Login failed" };
    }
  },

  signup: async (userData) => {
    try {
      console.log("before signup");
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();

      if (response.ok) {
        setter({ user: data.user, isAuthenticated: true });
        localStorage.setItem("token", data.token);
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (error) {
      return { success: false, message: "Signup failed" };
    }
  },

  logout: async () => {
    localStorage.removeItem("token");
    setter({ user: null, isAuthenticated: false });
  },

  // check token on app startup/page refresh
  checkAuth: async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await fetch("/api/auth/verify", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();

        if (response.ok) {
          setter({ user: data.user, isAuthenticated: true });
        } else {
          localStorage.removeItem("token");
          setter({ user: null, isAuthenticated: false });
        }
      } catch (error) {
        localStorage.removeItem("token");
        setter({ user: null, isAuthenticated: false });
      }
    }
  },
}));
