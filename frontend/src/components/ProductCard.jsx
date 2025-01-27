import {
  Box,
  Button,
  Container,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useColorModeValue } from "./ui/color-mode";
import { MdEdit, MdDelete } from "react-icons/md";
import { useProductStore } from "@/store/product";
import { Toaster, toaster } from "@/components/ui/toaster";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const ProductCard = ({ product }) => {
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");

  return (
    <Container padding={0}>
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

          <Text fontWeight={"bold"} fontSize={"lg"} color={textColor}>
            ${product.price}
          </Text>
        </Box>
      </Box>
    </Container>
  );
};

export default ProductCard;
