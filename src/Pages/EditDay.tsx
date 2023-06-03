import { useState, useContext, useEffect } from "react";
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
import { useParams } from 'react-router-dom';




const EditDay = () => {


  const [day, setDay] = useState({day: '', workout: {id: 0, name: ''}});

  const {user, setUser} = useContext(UserContext)

  const history = useHistory();


  type QuizParams = {
    id: string;
  };

  
  const { id } = useParams<QuizParams>();



  useEffect(() => {

    let cow = user.id

    console.log(cow)

    fetch(`/workout_days/${Number(id)}`).then((response) => {
      if (response.ok) {
        response.json().then((user) => 
        {
          console.log(user)
          setDay(user[0])
          console.log(user.day)

        });
      }
    });

  }, []);




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
        {day.day !== '' ? <Heading color="teal.400">{day.day}</Heading> : ''}
        <Text>{day.workout.name}</Text>

        <Button onClick={() => history.push(`/mypage`)} colorScheme='teal' variant='solid'>Return to Schedule</Button >


            

      </Box>      
    </Flex>
  );
};

export default EditDay;