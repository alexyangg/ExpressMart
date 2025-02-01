import { Box, Button, Heading, Input, Text, VStack } from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useColorModeValue } from "@/components/ui/color-mode";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [attemptedEmailSubmit, setAttemptedEmailSubmit] = useState(false);
  const [attemptedPasswordSubmit, setAttemptedPasswordSubmit] = useState(false);
  const [attemptedConfirmPasswordSubmit, setAttemptedConfirmPasswordSubmit] =
    useState(false);

  const handleSignup = () => {
    setAttemptedEmailSubmit(true);
    setAttemptedPasswordSubmit(true);
    setAttemptedConfirmPasswordSubmit(true);

    if (email.trim() && password.trim() && password === confirmPassword) {
      console.log("Signup successful: ", {
        email: email.trim(),
        password: password.trim(),
      });
      // TODO: add backend api to register new user
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
          Create an Account
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

          <Field
            label="Confirm Password"
            invalid={
              attemptedConfirmPasswordSubmit &&
              (confirmPassword !== password || !confirmPassword.trim())
            }
            errorText={
              confirmPassword === ""
                ? "Please confirm your password"
                : confirmPassword !== password
                ? "Passwords do not match"
                : ""
            }
            required
            paddingBottom={4}
          >
            <Input
              placeholder="confirm password"
              type="password"
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                setAttemptedConfirmPasswordSubmit(false);
                console.log(attemptedPasswordSubmit);
              }}
            ></Input>
          </Field>

          <Button onClick={handleSignup}>Signup</Button>

          <Text>
            Already have an account? Login{" "}
            <Link
              to={"/login"}
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

export default Signup;
