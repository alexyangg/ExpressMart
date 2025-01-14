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

function App() {
  return (
    <Box minH={"100vh"} background={useColorModeValue("gray.50", "black.900")}>
      {<Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </Box>
  );
}

export default App;
