import { useColorMode } from "@/components/ui/color-mode";
import {
  Box,
  Container,
  VStack,
  Text,
  SimpleGrid,
  Button,
  HStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import React, { useEffect } from "react";
import { useProductStore } from "@/store/product";
import ProductCard from "@/components/ProductCard";

const HomePage = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { fetchProducts, products } = useProductStore(); // destructure the fetchProducts function and products array from the useProductStore hook

  useEffect(() => {
    fetchProducts(); // fetch products when the component mounts (added to the DOM)
  }, [fetchProducts]); // dependency array ensures effect runs when fetchProducts changes; prevents infinite loop

  console.log("products", products);

  return (
    <Container
      display={"flex"}
      flex-direction={{ base: "row", sm: "column" }}
      justifyContent={"center"}
      alignItems={"center"}
      maxWidth={"container.xl"}
      paddingY={12}
      height={"75vh"}
      overflow={"hidden"}
      position={"relative"}
    >
      {/* Background gradient */}
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        width="200px"
        height="200px"
        background={
          colorMode === "light"
            ? "linear-gradient(45deg, rgb(0, 123, 255), #1e3a8a)"
            : "linear-gradient(45deg, rgb(9, 185, 9), #86d3a2)"
        }
        borderRadius="50%"
        filter="blur(8rem)"
        opacity={0.4}
        zIndex={-1}
        minHeight={{ base: "5%", sm: "50%" }}
        maxHeight={{ base: "20%", sm: "50%" }}
        minWidth="75%"
      />

      <VStack>
        <Box
          bgGradient="to-r"
          gradientFrom={colorMode === "light" ? "green.700" : "green.200"}
          gradientTo={colorMode === "light" ? "green.400" : "green.500"}
          background={"transparent"}
        >
          <Text
            fontSize={{ base: "50px", sm: "70px" }}
            fontWeight={"bold"}
            textAlign={"center"}
            backgroundGradient={"to-r"}
            backgroundClip={"text"}
            color={"transparent"}
            marginBottom={4}
            lineHeight={"100%"}
          >
            Welcome to ExpressMart!
          </Text>
        </Box>
        <Container
          display={"flex"}
          flex-direction={{ base: "row", sm: "column" }}
          justifyContent={"center"}
          alignItems={"center"}
          padding={10}
          gap={3}
        >
          <Link to="/products">
            <Button size={{ base: "md", sm: "xl" }} borderRadius={"full"}>
              View Current Products
            </Button>
          </Link>

          <Link to="/create">
            <Button
              size={{ base: "md", sm: "xl" }}
              borderRadius={"full"}
              colorPalette="green"
            >
              Create a Product
            </Button>
          </Link>
        </Container>
        {/* <HStack padding={10} gap={3} overflow={"auto"}>
          <Button size={{ base: "md", sm: "xl" }} borderRadius={"full"}>
            <Link to={"/products"}>View Current Products</Link>
          </Button>
          <Button
            size={{ base: "md", sm: "xl" }}
            borderRadius={"full"}
            colorPalette={"green"}
          >
            <Link to={"/create"}>Create a Product</Link>
          </Button>
        </HStack> */}
      </VStack>
    </Container>
  );
};

export default HomePage;
