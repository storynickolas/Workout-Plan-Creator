import { useState } from "react";
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
import { useHistory } from 'react-router-dom'

import weights from '../Weights.jpg';



const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [success, setSuccess] = useState(false);


  const handleShowClick = () => setShowPassword(!showPassword);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const history = useHistory();

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    fetch("/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        password_confirmation: passwordConfirmation,
      }),
    }).then((r) => {
      if (r.ok) {
        setSuccess(true)
    }});
  }

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
      {success ? 
       <Box minW='30vw' 
       p="1rem"
       backgroundColor="white"
     >
       <Avatar bg="teal.500" />
       <Heading color="teal.400">Account Created!</Heading>
       <Button onClick={() => history.push('/login')}>Go to Login</Button>
     </Box>   
      :
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
                  <Input onChange={(e) => setUsername(e.target.value)}/>
                </InputGroup>
              </FormControl>
              <Text alignSelf='start'>Password</Text>
              <FormControl>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    onChange={(e) => setPassword(e.target.value)}
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
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
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
                onClick={(e) => handleSubmit(e)}
              >
                Sign Up
              </Button>
            </Stack>
          </form>
      </Box>   }   
    </Flex>
  );
};

export default Signup;