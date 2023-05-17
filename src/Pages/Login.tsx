import { useState } from "react";
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  Box,
  Link,
  Avatar,
  FormControl,
  InputRightElement
} from "@chakra-ui/react";

import weights from '../Weights.jpg';



const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);

  return (
    <Flex
      flexDirection="column"
      width="100wh"
      height="100vh"
      backgroundImage={weights}
      backgroundPosition="center"
      backgroundRepeat="no-repeat"
      justifyContent="center"
      alignItems="center"
    >
      <Box minW='30vw' 
        p="1rem"
        backgroundColor="white"
      >
        <Avatar bg="teal.500" />
        <Heading color="teal.400">Welcome</Heading>
          <form>
            <Stack
              spacing={4}
              p="1rem"
               backgroundColor="white"
              justifyContent="center"
              alignItems="center"
            >  
              <FormControl>
                <InputGroup>
                  <Input placeholder="username" />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Button
                borderRadius={0}
                type="submit"
                variant="solid"
                colorScheme="teal"
                width="full"
                onClick={() => alert('Testing')}
              >
                Login
              </Button>
            </Stack>
          </form>
          <Box>
            New to us?{" "}
            <Link color="teal.500" href="#">
              Sign Up
            </Link>
          </Box> 
      </Box>      
    </Flex>
  );
};

export default Login;