import { Box, Button, Heading, Input, Text, VStack } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useColorModeValue } from "@/components/ui/color-mode";
import { useAuthStore } from "@/store/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [attemptedEmailSubmit, setAttemptedEmailSubmit] = useState(false);
  const [attemptedPasswordSubmit, setAttemptedPasswordSubmit] = useState(false);
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setAttemptedEmailSubmit(true);
    setAttemptedPasswordSubmit(true);

    const result = await login({
      email: email.trim(),
      password: password.trim(),
    });

    if (result.success) {
      navigate("/products");
    } else {
      console.log("Form has errors");
    }
  };

  return (
    <Box
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      minH={"75vh"}
    >
      <Box
        padding={40}
        background={useColorModeValue("white", "gray.900")}
        borderRadius={10}
        boxShadow={"md"}
        height={"700px"}
      >
        <Heading textAlign={"center"} fontSize={"xx-large"} marginBottom={10}>
          Welcome Back!
        </Heading>

        <VStack align={"stretch"}>
          <Field
            label="Email"
            invalid={attemptedEmailSubmit && !email.trim()}
            errorText="Please enter your email"
            required
          >
            <Input
              placeholder="hello@example.com"
              onChange={(e) => {
                setEmail(e.target.value);
                setAttemptedEmailSubmit(false);
                console.log(attemptedEmailSubmit);
              }}
            ></Input>
          </Field>

          <Field
            label="Password"
            invalid={attemptedPasswordSubmit && !password.trim()}
            errorText="Please enter your password"
            required
          >
            <Input
              placeholder="password"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value);
                setAttemptedPasswordSubmit(false);
                console.log(attemptedPasswordSubmit);
              }}
            ></Input>
          </Field>

          <Box textAlign={"right"} fontSize={15}>
            <Link
              to={"/"}
              style={{ color: useColorModeValue("green", "lightgreen") }}
            >
              Forgot Password?
            </Link>
          </Box>

          <Button onClick={handleLogin}>Login</Button>

          <Text>
            Don't have an account? Signup{" "}
            <Link
              to={"/signup"}
              style={{ color: useColorModeValue("green", "lightgreen") }}
            >
              here!
            </Link>
          </Text>
        </VStack>
      </Box>
    </Box>
  );
};

export default Login;
