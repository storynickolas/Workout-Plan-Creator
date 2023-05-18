import { useState } from "react";
import { Link } from 'react-router-dom';
import {
  Flex,
  Heading,
  Input,
  Button,
  InputGroup,
  Stack,
  Box,
  Avatar,
  InputRightElement,
  Text,
  FormControl,

} from "@chakra-ui/react";

import weights from '../Weights.jpg';



const Signup = () => {
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
        <Heading color="teal.400">Create an account</Heading>
          <form>
            <Stack
              spacing={4}
              p="1rem"
               backgroundColor="white"
              justifyContent="center"
              alignItems="center"
            >  
            <Text alignSelf='start'>Username</Text>
              <FormControl>
                <InputGroup>
                  <Input />
                </InputGroup>
              </FormControl>
              <Text alignSelf='start'>Password</Text>
              <FormControl>
                
                <InputGroup>
                  
                  <Input
                    type={showPassword ? "text" : "password"}

                  />
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Text alignSelf='start'>Confirm Password</Text>
              <FormControl>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}

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

      </Box>      
    </Flex>
  );
};

export default Signup;