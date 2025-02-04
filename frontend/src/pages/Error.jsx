import { Box, Button, Container, Heading, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <Container
      centerContent
      height={"70vh"}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box textAlign={"center"}>
        <Heading fontSize={"6xl"} color={"red.500"}>
          404
        </Heading>
        <Text fontSize={"2xl"} marginTop={4}>
          Oops! Page not found.
        </Text>
        <Text fontSize={"lg"} marginTop={2}>
          The page you are looking for does not exist.
        </Text>
        <Link to={"/"}>
          <Button marginTop={6} colorPalette={"green"}>
            Go Home
          </Button>
        </Link>
      </Box>
    </Container>
  );
};

export default Error;
