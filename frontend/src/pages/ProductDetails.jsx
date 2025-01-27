import {
  Container,
  HStack,
  VStack,
  Text,
  Image,
  Box,
  IconButton,
  Input,
  Button,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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

const ProductDetails = () => {
  const { productId } = useParams();
  console.log("Current productId: ", productId);

  const { updateProduct, deleteProduct, fetchProductById, product } =
    useProductStore(); // destructure the fetchProductById function and product from the useProductStore hook
  const [updatedProduct, setUpdatedProduct] = useState(null); // useState initial value is the product passed as a prop,
  // but we need to ensure the updatedProduct is initialized only after product is fetched and defined
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        console.log("Fetching product with ID:", productId);
        await fetchProductById(productId);
      } catch (error) {
        console.error("Error fetching product: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]); // remove `product` from the dependencies array of the fetch useEffect to prevent unnecessary re-fetches

  // console.log("product", product);

  useEffect(() => {
    if (product) {
      setUpdatedProduct(product);
    }
  }, [product]);

  const handleUpdateProduct = async (productId, updatedProduct) => {
    const { success, message } = await updateProduct(productId, updatedProduct);
    console.log("edited product");
    if (success) {
      // await fetchProductById(productId);
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

  const handleDeleteProduct = async (productId) => {
    const { success, message } = await deleteProduct(productId);
    if (success) {
      toaster.create({
        title: "Success",
        description:
          "Product deleted successfully!\nRedirecting you to the products page...",
        type: "success",
        duration: 3000,
      });
      setTimeout(() => {
        navigate("/products");
      }, 3000);
    } else {
      toaster.create({
        title: "Error",
        description: message,
        type: "error",
        duration: 5000,
      });
    }
  };

  if (loading) {
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
        <Text fontSize={"xl"}>Product not found.</Text>
      </Container>
    );
  }

  // Only render product once product has been fetched
  return (
    <Container
      display={"flex"}
      flexDirection={"column"}
      padding={20}
      maxWidth={"90%"}
      overflow={"auto"}
    >
      <Toaster />
      <HStack gap={20} justifyContent={"center"}>
        <Image
          src={product.image}
          alt={product.name}
          height={480}
          width={480}
          objectFit={"cover"}
          borderRadius={30}
        />
        <VStack alignItems="start" gap={"0"}>
          <Text fontSize={"5xl"} fontWeight={"bold"}>
            {product.name}
          </Text>
          <Text fontSize={"5xl"}>${product.price}</Text>

          <Text>
            Created at:{" "}
            {new Date(product.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </Text>
          <Text>
            Updated at:{" "}
            {new Date(product.updatedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </Text>

          <Box paddingTop={4}>
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
        </VStack>
      </HStack>
    </Container>
  );
};

export default ProductDetails;
