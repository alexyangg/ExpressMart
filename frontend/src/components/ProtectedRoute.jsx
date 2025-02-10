import { useAuthStore } from "@/store/auth";
import { Box, Text, VStack } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useColorModeValue } from "./ui/color-mode";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const token = localStorage.getItem("token");

  const isTokenExpired = (token) => {
    if (!token) {
      return true;
    }
    try {
      const { exp } = jwtDecode(token);
      return Date.now() >= exp * 1000;
    } catch (error) {
      return true;
    }
  };

  useEffect(() => {
    if (token && isTokenExpired(token)) {
      useAuthStore.setState({ isAuthenticated: false });
      localStorage.removeItem("token");
      navigate("/login?sessionExpired=true");
    }
  }, [token, navigate]);

  if (!token || isTokenExpired(token)) {
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
