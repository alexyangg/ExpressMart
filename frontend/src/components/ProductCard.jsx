import {
  Box,
  Container,
  Heading,
  HStack,
  IconButton,
  Image,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { useColorModeValue } from "./ui/color-mode";
import { MdEdit, MdDelete } from "react-icons/md";
import { useProductStore } from "@/store/product";
import { Toaster, toaster } from "@/components/ui/toaster";

const ProductCard = ({ product }) => {
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");
  const { deleteProduct } = useProductStore();
  const handleDeleteProduct = async (productId) => {
    const { success, message } = await deleteProduct(productId);
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
  };

  return (
    <Container>
      <Toaster />
      <Box
        shadow={"lg"}
        rounded={"lg"}
        overflow={"hidden"}
        transition={"all 0.3s"}
        _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
        background={bg}
      >
        <Image
          src={product.image}
          alt={product.name}
          height={48}
          width={"full"}
          objectFit={"cover"}
        />

        <Box padding={4}>
          <Heading as={"h3"} size={"xl"} marginBottom={1}>
            {product.name}
          </Heading>

          <Text
            fontWeight={"bold"}
            fontSize={"lg"}
            color={textColor}
            marginBottom={4}
          >
            ${product.price}
          </Text>

          <HStack gap={2}>
            <IconButton
              aria-label="Edit icon"
              variant={"solid"}
              size={"md"}
              colorPalette={"blue"}
            >
              <MdEdit />
            </IconButton>
            <IconButton
              aria-label="Delete icon"
              variant={"solid"}
              size={"md"}
              colorPalette={"red"}
              onClick={() => handleDeleteProduct(product._id)}
            >
              <MdDelete />
            </IconButton>
          </HStack>
        </Box>
      </Box>
    </Container>
  );
};

export default ProductCard;
