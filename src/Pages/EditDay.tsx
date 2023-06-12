import { useState, useContext, useEffect } from "react";
import {
  Flex,
  Heading,
  Button,
  Box,
  Text,
} from "@chakra-ui/react";

import weights from '../Weights.jpg';
import { useHistory } from 'react-router-dom'
import { UserContext } from '../Context/User.context';
import { useParams } from 'react-router-dom';




const EditDay = () => {


  const [day, setDay] = useState({day: '', workout: {id: 0, name: ''}});

  const {user, setUser} = useContext(UserContext)

  const history = useHistory();


  type idTypes = {
    id: string;
  };

  
  const { id } = useParams<idTypes>();



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