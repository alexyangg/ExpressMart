import {
  Box,
  Button,
  Heading,
  Input,
  List,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useColorModeValue } from "@/components/ui/color-mode";
import { useAuthStore } from "@/store/auth";
import { LuCircleCheck, LuCircleDashed } from "react-icons/lu";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [attemptedNameSubmit, setAttemptedNameSubmit] = useState(false);
  const [attemptedEmailSubmit, setAttemptedEmailSubmit] = useState(false);
  const [attemptedPasswordSubmit, setAttemptedPasswordSubmit] = useState(false);
  const [attemptedConfirmPasswordSubmit, setAttemptedConfirmPasswordSubmit] =
    useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { signup } = useAuthStore();
  const navigate = useNavigate();

  const isPasswordMatch = password === confirmPassword && password.length > 0;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  // const passwordRegex =
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const passwordValidations = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[!@$%&*?]/.test(password),
  };

  const isPasswordStrong = Object.values(passwordValidations).every(Boolean);

  const handleSignup = async () => {
    setAttemptedNameSubmit(true);
    setAttemptedEmailSubmit(true);
    setAttemptedPasswordSubmit(true);
    setAttemptedConfirmPasswordSubmit(true);
    setErrorMessage("");

    if (!emailRegex.test(email.trim())) {
      setErrorMessage("Please enter a valid email.");
      return;
    }

    if (!isPasswordStrong) {
      setErrorMessage("Your password must meet all the criteria.");
      return;
    }

    if (!isPasswordMatch) {
      return;
    }

    const result = await signup({
      name: name.trim(),
      email: email.trim(),
      password: password.trim(),
    });

    if (result.success) {
      navigate("/products");
    } else {
      setErrorMessage(result.message);
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
        padding={30}
        background={useColorModeValue("white", "gray.900")}
        borderRadius={10}
        boxShadow={"md"}
        maxHeight={"60vh"}
        maxWidth={"50vh"}
      >
        <Heading textAlign={"center"} fontSize={"xx-large"} marginBottom={10}>
          Create an Account
        </Heading>

        <VStack align={"stretch"}>
          {/* name field */}
          <Field
            label="Name"
            invalid={attemptedNameSubmit && !name.trim()}
            errorText="Please enter your name"
            required
          >
            <Input
              placeholder="what should we call you?"
              onChange={(e) => {
                setName(e.target.value);
                setAttemptedNameSubmit(false);
                console.log(attemptedNameSubmit);
              }}
            ></Input>
          </Field>

          {/* email field */}
          <Field
            label="Email"
            invalid={attemptedEmailSubmit && !emailRegex.test(email)}
            // errorText="Please enter your email"
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
          {attemptedEmailSubmit && !emailRegex.test(email) && (
            <Text
              color={"var(--chakra-colors-fg-error)"}
              fontSize={"xs"}
              fontWeight={"medium"}
            >
              Please enter a valid email.
            </Text>
          )}

          {/* password field */}
          <Field
            label="Password"
            invalid={attemptedPasswordSubmit && !isPasswordStrong}
            // errorText="Please enter your password"
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
          {attemptedPasswordSubmit && !isPasswordStrong && (
            <Text
              color={"var(--chakra-colors-fg-error)"}
              fontSize={"xs"}
              fontWeight={"medium"}
            >
              Please create a strong password!
            </Text>
          )}

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

          <Text fontSize={"sm"} fontWeight={"medium"}>
            Password Checklist
          </Text>
          <List.Root fontSize={"sm"} marginBottom={3} listStyle={"none"}>
            {Object.entries(passwordValidations).map(([key, isValid]) => (
              <List.Item
                key={key}
                color={isValid ? "green.500" : "var(--chakra-colors-fg-error)"}
              >
                <List.Indicator asChild>
                  <span>
                    {isValid ? <LuCircleCheck /> : <LuCircleDashed />}
                  </span>
                </List.Indicator>
                {key === "length" && "At least 8 characters"}
                {key === "uppercase" && "At least one upper case character"}
                {key === "lowercase" && "At least one lower case character"}
                {key === "number" && "At least one number"}
                {key === "special" &&
                  "At least one special character (!@$%&*?)"}
              </List.Item>
            ))}
          </List.Root>

          <Button onClick={handleSignup} marginBottom={2}>
            Signup
          </Button>

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
