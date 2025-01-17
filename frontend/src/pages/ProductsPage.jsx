import { useColorMode } from "@/components/ui/color-mode";
import { Box, Container, VStack, Text, SimpleGrid } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { useProductStore } from "@/store/product";
import ProductCard from "@/components/ProductCard";

const ProductsPage = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { fetchProducts, products } = useProductStore(); // destructure the fetchProducts function and products array from the useProductStore hook

  useEffect(() => {
    fetchProducts(); // fetch products when the component mounts (added to the DOM)
  }, [fetchProducts]); // dependency array ensures effect runs when fetchProducts changes; prevents infinite loop

  console.log("products", products);

  return (
    <Container maxWidth={"container.xl"} paddingY={12}>
      <VStack>
        <Box
          bgGradient="to-r"
          gradientFrom={colorMode === "light" ? "green.700" : "green.200"}
          gradientTo={colorMode === "light" ? "green.400" : "green.500"}
          background={"transparent"}
        >
          <Text
            fontSize={{ base: "28px", sm: "34px" }}
            fontWeight={"bold"}
            textAlign={"center"}
            backgroundGradient={"to-r"}
            backgroundClip={"text"}
            color={"transparent"}
            marginBottom={4}
          >
            Current Products 🏷️
          </Text>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={7} width={"full"}>
          {products.map((product) => (
            <Link to={`/products/${product._id}`}>
              <ProductCard key={product._id} product={product} />
            </Link>
          ))}
        </SimpleGrid>

        {/* If the number of products is 0, then display the text */}
        {products.length === 0 && (
          <Text
            fontSize={{ base: "14px", sm: "20px" }}
            fontWeight={"bold"}
            textAlign={"center"}
            color="gray.200"
          >
            No products found 🔎{" "}
            <Link to={"/create"}>
              <Text
                as={"span"}
                color={"green.500"}
                _hover={{ textDecoration: "underline" }}
              >
                Create a product
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
};

export default ProductsPage;
