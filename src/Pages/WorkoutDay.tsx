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
  VStack,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,


} from "@chakra-ui/react";

import weights from '../Weights.jpg';
import { useHistory } from 'react-router-dom'
import { UserContext } from '../Context/User.context';
import { useParams } from 'react-router-dom';
import { WorkoutContext } from "../Context/Workout.context";




const WorkoutDay = () => {


  const [day, setDay] = useState({day: '', workout: {id: 0, name: ''}, workout_exercises: []});

  const [plan, setPlan] = useState([{exercise: {name: ''}, reps: 0, sets: 0}]);

  const {user, setUser} = useContext(UserContext)

  const history = useHistory();

  const {workoutList, setWorkoutList} = useContext(WorkoutContext);


  type QuizParams = {
    id: string;
  };

  
  const { id } = useParams<QuizParams>();

  const data = history.location.state as {item: { day: string, workout_exercises: [], workout: {id: 0, name: ''}}}



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

  useEffect(() => {

    let cow = user.id

    fetch(`/workouts/${Number(data.item.workout.id)}`).then((response) => {
      if (response.ok) {
        response.json().then((user) => 
        {
          setPlan(user[0].workout_exercises)
          console.log(user[0].workout_exercises)
          // setDay(user[0])
          // console.log(user.day)

        });
      }
    });

  }, []);

  function handleDelete() {
    fetch(`/workout_days/${id}`, {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        // dispatch(remove(myreview))
        console.log('Removed')
        history.replace(`/mypage`)
      }
    })

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
               <Accordion>
            


        {data?.item?.day ? <Text fontSize={'4xl'}>{data.item.day}</Text> : '' }
        {data?.item?.workout?.name ? <Text fontSize={'3xl'}>{data.item.workout.name}</Text> : '' }
        {
       plan.length > 0 && plan[0].exercise.name !== ''  ? plan.map((item: any, index) => 
<AccordionItem>

  <h2>
      <AccordionButton>
        <Box as="span" flex='1' textAlign='left'>
        {item.exercise.name}
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
      {item.reps} Reps x {item.sets} Sets 
    </AccordionPanel>
  </AccordionItem>


          // <Button onClick={() => console.log(item)}></Button>


       ) : '' }
       </Accordion>
       <Button onClick={() => history.replace('/myPage')}>Return to Schedule</Button>
       <Button onClick={() => handleDelete()}>Clear Day</Button>


  


      </Box>      
    </Flex>
  );
};

export default WorkoutDay;