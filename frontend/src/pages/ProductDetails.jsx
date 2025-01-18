import { useProductStore } from "@/store/product";
import { Container, HStack, VStack, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const ProductDetails = () => {
  const { productId } = useParams();
  console.log(productId);

  const { fetchProductById, product } = useProductStore(); // destructure the fetchProductById function and product from the useProductStore hook

  useEffect(() => {
    console.log("Fetching product with ID:", productId);
    fetchProductById(productId); // fetch product when the component mounts (added to the DOM)
  }, [fetchProductById, productId]); // dependency array ensures effect runs when fetchProductById changes; prevents infinite loop

  console.log("product", product);

  // show loading message if product details haven't been fetched
  if (!product) {
    return (
      <Container
        display="flex"
        flexDirection={"column"}
        justifyItems={"center"}
        justifyContent={"center"}
        alignItems={"center"}
        height={"70vh"}
      >
        <Text fontSize={"xl"}>Loading product details...</Text>
      </Container>
    );
  }

  // Only render product once product has been fetched
  return (
    <Container display={"flex"} flexDirection={"column"}>
      <HStack>
        <VStack></VStack>
      </HStack>
      {productId}
      <br></br>
      {product.name}
    </Container>
  );
};

export default ProductDetails;
