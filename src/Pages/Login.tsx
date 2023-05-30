import { useState, useContext } from "react";
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
  useStatStyles,

} from "@chakra-ui/react";

import weights from '../Weights.jpg';
import { useHistory } from 'react-router-dom'
import { UserContext } from '../User.context';




const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");

  const {user, setUser} = useContext(UserContext)

  const history = useHistory();

  function handleSubmit(e: React.SyntheticEvent) {

    e.preventDefault();
    console.log('Test')
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ 'username': username, 'password': password }),
    }).then((r) => {
      if (r.ok) {
        r.json().then((value) => {
          console.log(user)
          console.log(value)
          if(value.schedule !== null) {
            setUser({id: value.id, schedule: {id: value.schedule.id}, saved_workouts: value.saved_workouts})
          }
          else{
            setUser({id: value.id, schedule: {id: 0}, saved_workouts: value.saved_workouts})
          }
          
          sessionStorage.setItem('user_id', value.id)

        }).then(() => {
          history.push(`/mypage`)
          // console.log(user)
        });
      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }


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
                  <Input placeholder="username" onChange={(e) => setUsername(e.target.value)} />
                </InputGroup>
              </FormControl>
              <FormControl>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
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
                Login
              </Button>
              <Text>{errors}</Text>
            </Stack>
          </form>
          <Box>
            New to us?{" "}
            <Button color="teal.500" >

              <Link to={`/signup`}>
                Sign Up
              </Link>
            </Button>
            
          </Box> 
      </Box>      
    </Flex>
  );
};

export default Login;