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
  Select

} from "@chakra-ui/react";

import weights from '../Weights.jpg';
import { useHistory } from 'react-router-dom'
import { UserContext } from '../User.context';
import { useParams } from 'react-router-dom';




const NewDay = () => {
  // type data = {
  //   name: string,
  //   saved: []
  // };
  // let data = {name: '', saved: [{name: ''}]}

  const history = useHistory();
  const data = history.location.state as {day: string, saved: []}

  const [selectedWorkout, setSelectedWorkout] = useState('')



  // const [day, setDay] = useState({day: '', workout: {id: 0, name: ''}});

  // const {user, setUser} = useContext(UserContext)

  // const history = useHistory();


  // type QuizParams = {
  //   id: string;
  // };

  
  // const { id } = useParams<QuizParams>();



  // useEffect(() => {

  //   let cow = user.id

  //   console.log(cow)

  //   fetch(`/workout_days/${Number(id)}`).then((response) => {
  //     if (response.ok) {
  //       response.json().then((user) => 
  //       {
  //         console.log(user)
  //         setDay(user[0])
  //         console.log(user.day)

  //       });
  //     }
  //   });

  // }, []);

  function handleChange(option : string) {
    setSelectedWorkout(option)
  }

  function handleAdd() {
    let cow = {
      'day': data.day,
      'workout': selectedWorkout
    }
    console.log(cow)
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
      <Box minW='30vw' 
        p="1rem"
        backgroundColor="white"
      >

        <Text fontSize='4xl'>{data.day}</Text>
        <Text>Select from saved workouts</Text>
        <Select placeholder='Workout' onChange={(e) => handleChange(e.target.value)}>
        {
       data && data.saved.length !== 0  ? data.saved.map((item: any) => 
          <option value={item.workout.name}>{item.workout.name}</option>
       ) : '' }
      
        </Select>
        <Button onClick={() => handleAdd()}>Add Day to Schedule</Button>
        <Button onClick={() => history.replace('/myPage')}>Return to Schedule</Button>

            

      </Box>      
    </Flex>
  );
};

export default NewDay;