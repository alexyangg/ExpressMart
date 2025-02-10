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
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const isSessionExpired = new URLSearchParams(location.search).get(
    "sessionExpired"
  );

  const handleLogin = async () => {
    setAttemptedEmailSubmit(true);
    setAttemptedPasswordSubmit(true);
    // setErrorMessage("");

    const result = await login({
      email: email.trim(),
      password: password.trim(),
    });

    if (result.success) {
      navigate("/products");
    } else {
      console.log("Form has errors");
      setErrorMessage(result.message || "Invalid email or password.");
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
        padding={30}
        background={useColorModeValue("white", "gray.900")}
        borderRadius={10}
        boxShadow={"md"}
        // height={"700px"}
        maxHeight={"60vh"}
        maxWidth={"50vh"}
      >
        <Heading textAlign={"center"} fontSize={"xx-large"} marginBottom={5}>
          Welcome Back!
        </Heading>

        {isSessionExpired && (
          <Text
            color={"var(--chakra-colors-fg-error)"}
            fontSize={"md"}
            fontWeight={"medium"}
            textAlign={"center"}
            marginBottom={5}
          >
            Your session has expired. Please login again!
          </Text>
        )}

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

          {email.trim() &&
            password.trim() &&
            errorMessage &&
            attemptedEmailSubmit &&
            attemptedPasswordSubmit && (
              <Text
                color={"var(--chakra-colors-fg-error)"}
                fontSize={"xs"}
                fontWeight={"medium"}
              >
                {errorMessage}
              </Text>
            )}

          <Box textAlign={"right"} fontSize={15}>
            <Link
              to={"/"}
              style={{ color: useColorModeValue("green", "lightgreen") }}
            >
              Forgot Password?
            </Link>
          </Box>

          <Button onClick={handleLogin}>Login</Button>

          <Text textAlign={"center"}>
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
