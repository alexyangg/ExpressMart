// import Button from "@chakra-ui/react";
// import { Button } from "@/components/ui/button";

import { Box } from "@chakra-ui/react";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import CreatePage from "./pages/CreatePage";
import ProductsPage from "./pages/ProductsPage";
import { useColorModeValue } from "./components/ui/color-mode";
import ProductDetails from "./pages/ProductDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <Box minH={"100vh"} background={useColorModeValue("gray.50", "black.900")}>
      {<Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="products/:productId" element={<ProductDetails />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Box>
  );
}

export default App;
