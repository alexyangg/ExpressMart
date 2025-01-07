import { Box, Button, Container, Flex, HStack, Text } from "@chakra-ui/react";
import React from "react";
import { FaPlusSquare } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useColorMode } from "./ui/color-mode";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container maxWidth={"1140px"} paddingX={4}>
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
            fontSize={{ base: "22px", sm: "28px" }}
            fontWeight={"bold"}
            textAlign={"center"}
            backgroundGradient={"to-r"}
            backgroundClip={"text"}
            color={"transparent"}
          >
            <Link to={"/"}>Product Store 🛒</Link>
          </Text>
        </Box>

        <HStack alignItems={"center"}>
          <Link to={"create"}>
            <Button>
              <FaPlusSquare fontSize={20} />
            </Button>
          </Link>
          <Button onClick={toggleColorMode}>
            {colorMode === "light" ? <IoMoon /> : <LuSun />}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
