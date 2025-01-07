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
  const [updatedProduct, setUpdatedProduct] = useState(product); // useState initial value is the product passed as a prop
  const { deleteProduct, updateProduct } = useProductStore();

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

  const handleUpdateProduct = async (productId, updatedProduct) => {
    const { success, message } = await updateProduct(productId, updatedProduct);
    if (success) {
      toaster.create({
        title: "Success",
        description: "Product updated successfully",
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

          <Text
            fontWeight={"bold"}
            fontSize={"lg"}
            color={textColor}
            marginBottom={4}
          >
            ${product.price}
          </Text>
        </Box>

        <Box paddingBottom={4} paddingLeft={4} paddingRight={4}>
          <HStack gap={2}>
            {/* Edit button that opens the edit dialog */}
            <DialogRoot>
              <DialogTrigger asChild>
                <IconButton
                  aria-label="Edit icon"
                  variant={"solid"}
                  size={"md"}
                  colorPalette={"blue"}
                >
                  <MdEdit />
                </IconButton>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Update Product</DialogTitle>
                </DialogHeader>
                <DialogBody>
                  <VStack>
                    <Input
                      placeholder="Product Name"
                      name="name"
                      value={updatedProduct.name}
                      onChange={(e) =>
                        setUpdatedProduct({
                          ...updatedProduct,
                          name: e.target.value,
                        })
                      } // spread operator to copy the existing object and update the name property
                      // with the new value from the input field
                    />
                    <Input
                      placeholder="Price"
                      name="price"
                      type="number"
                      min={0}
                      value={updatedProduct.price}
                      onChange={(e) => {
                        const value = e.target.value;
                        if (parseFloat(value) >= 0) {
                          setUpdatedProduct({
                            ...updatedProduct,
                            price: e.target.value,
                          });
                        }
                      }}
                    />
                    <Input
                      placeholder="Image URL"
                      name="image"
                      value={updatedProduct.image}
                      onChange={(e) =>
                        setUpdatedProduct({
                          ...updatedProduct,
                          image: e.target.value,
                        })
                      }
                    />
                  </VStack>
                </DialogBody>
                <DialogFooter>
                  <DialogActionTrigger asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogActionTrigger>
                  <DialogActionTrigger asChild>
                    <Button
                      colorPalette={"blue"}
                      onClick={() =>
                        handleUpdateProduct(product._id, updatedProduct)
                      }
                    >
                      Update
                    </Button>
                  </DialogActionTrigger>
                </DialogFooter>
                <DialogCloseTrigger />
              </DialogContent>
            </DialogRoot>

            {/* Delete button that opens the delete confirmation dialog */}
            <DialogRoot>
              <DialogTrigger asChild>
                <IconButton
                  aria-label="Delete icon"
                  variant={"solid"}
                  size={"md"}
                  colorPalette={"red"}
                >
                  <MdDelete />
                </IconButton>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you sure?</DialogTitle>
                </DialogHeader>
                <DialogBody>
                  <p>
                    This action cannot be undone. This will permanently delete
                    this product from our systems.
                  </p>
                </DialogBody>
                <DialogFooter>
                  <DialogActionTrigger asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogActionTrigger>
                  <DialogActionTrigger asChild>
                    <Button
                      colorPalette={"red"}
                      onClick={() => handleDeleteProduct(product._id)}
                    >
                      Delete
                    </Button>
                  </DialogActionTrigger>
                </DialogFooter>
                <DialogCloseTrigger />
              </DialogContent>
            </DialogRoot>
          </HStack>
        </Box>
      </Box>
    </Container>
  );
};

export default ProductCard;
