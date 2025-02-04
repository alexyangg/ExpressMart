import { useAuthStore } from "@/store/auth";
import { Box, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { useColorModeValue } from "./ui/color-mode";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated) {
    return (
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
        minHeight={"50vh"}
        padding={10}
      >
        <VStack>
          <Text fontSize={30}>
            You must be logged in to view this page! Login{" "}
            <Link
              to={"/login"}
              style={{ color: useColorModeValue("green", "lightgreen") }}
            >
              here!
            </Link>
          </Text>
        </VStack>
      </Box>
    );
  }

  return children;
};

export default ProtectedRoute;
