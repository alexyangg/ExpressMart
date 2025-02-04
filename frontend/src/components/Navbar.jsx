import { Box, Button, Container, Flex, HStack, Text } from "@chakra-ui/react";
import React from "react";
import { FaPlusSquare } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useColorMode } from "./ui/color-mode";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { FaShop } from "react-icons/fa6";
import { useAuthStore } from "@/store/auth";
import AccountMenu from "./AccountMenu";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/logout");
  };

  return (
    <Container maxWidth={"1140px"} paddingX={4} paddingY={4}>
      <Flex
        height={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDirection={{ base: "column", sm: "row" }} // column for mobile, row for desktop
      >
        <Box
          bgGradient="to-r"
          gradientFrom={colorMode === "light" ? "green.700" : "green.200"}
          gradientTo={colorMode === "light" ? "green.400" : "green.500"}
          background={"transparent"}
        >
          <Text
            fontSize={{ base: "36px", sm: "42px" }}
            fontWeight={"bold"}
            textAlign={"center"}
            backgroundGradient={"to-r"}
            backgroundClip={"text"}
            color={"transparent"}
          >
            <Link to={"/"}>ExpressMart 🛒</Link>
          </Text>
        </Box>

        <HStack alignItems={"center"} marginLeft={{ base: 0, sm: 4 }}>
          <Link to={"products"}>
            <Button>
              {/* <FaShop fontSize={20} /> */}
              Products
            </Button>
          </Link>
          <Link to={"create"}>
            <Button width={20}>
              {/* <FaPlusSquare fontSize={20} /> */}
              Create
            </Button>
          </Link>
          {isAuthenticated ? (
            <AccountMenu />
          ) : (
            <Link to={"login"}>
              <Button>Login / Signup</Button>
            </Link>
          )}

          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <IoMoon /> : <LuSun />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
