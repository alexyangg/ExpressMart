import { useColorMode, useColorModeValue } from "@/components/ui/color-mode";
import { Toaster, toaster } from "@/components/ui/toaster";
import { useProductStore } from "@/store/product";
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";

const CreatePage = () => {
  const { colorMode } = useColorMode();
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });
  // const toast = useToast();

  const { createProduct } = useProductStore();

  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    if (success) {
      toaster.create({
        title: "Success",
        description: message,
        type: "success",
        duration: 5000,
      });
    } else {
      toaster.create({
        title: "Error",
        description: message,
        type: "error",
        duration: 5000,
      });
    }
    setNewProduct({ name: "", price: "", image: "" }); // clear the input fields
    // console.log("Success: ", success);
    // console.log("message: ", message);
  };

  return (
    <Container maxWidth={"container-sm"}>
      <VStack>
        <Heading as={"h1"} size={"4xl"} textAlign={"center"} marginBottom={8}>
          Create New Product
        </Heading>

        <Box
          width={"full"}
          background={useColorModeValue("white", "gray.900")}
          padding={6}
          boxShadow={"md"}
          rounded={"lg"}
        >
          <VStack>
            <Input
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              } // spread operator to copy the existing object and update the name property
              // with the new value from the input field
            />
            <Input
              placeholder="Price"
              name="price"
              type="number"
              min={0}
              value={newProduct.price}
              onChange={(e) => {
                const value = e.target.value;
                if (parseFloat(value) >= 0) {
                  setNewProduct({ ...newProduct, price: e.target.value });
                }
              }}
            />
            <Input
              placeholder="Image URL"
              name="image"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />
            <Button
              colorScheme="green"
              backgroundColor={"green.500"}
              _hover={{
                backgroundColor:
                  colorMode === "light" ? "green.600" : "green.400",
              }}
              onClick={handleAddProduct}
              width={"full"}
            >
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
      <Toaster />
    </Container>
  );
};

export default CreatePage;
