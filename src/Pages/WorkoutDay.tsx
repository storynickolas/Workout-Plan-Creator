import { useState, useEffect, useContext } from "react";
import {
  Flex,
  Button,
  Box,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";

import weights from '../Weights.jpg';
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router-dom';
import { ScheduleContext } from "../Context/Schedule.context";


const WorkoutDay = () => {

  const [plan, setPlan] = useState([{exercise: {name: ''}, reps: 0, sets: 0}]);

  const history = useHistory();

  const {schedule, setSchedule} = useContext(ScheduleContext)

  let typicalWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]






  type IdParams = {
    id: string;
  };

  
  const { id } = useParams<IdParams>();

  const data = history.location.state as {item: { day: string, workout_exercises: [], workout: {id: 0, name: ''}}}

  useEffect(() => {
    console.log(data.item.day)
    fetch(`/workouts/${Number(data.item.workout.id)}`).then((response) => {
      if (response.ok) {
        response.json().then((user) => 
        {
          setPlan(user[0].workout_exercises)
          console.log(user[0].workout_exercises)
        });
      }
    });
  }, []);

  function handleDelete() {
    fetch(`/workout_days/${id}`, {
      method: "DELETE",
    }).then((r) => {
      if (r.ok) {
        let day = typicalWeek.indexOf(data.item.day)
        let newWeek = [...schedule]
        newWeek[day] = {'day': data.item.day}
        setSchedule([...newWeek])
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
      <Box minW='30vw' p="1rem" backgroundColor="white">
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
            ) : '' }
        </Accordion>
        <Button onClick={() => history.replace('/myPage')}>Return to Schedule</Button>
        <Button onClick={() => handleDelete()}>Clear Day</Button>
      </Box>      
    </Flex>
  );
};

export default WorkoutDay;