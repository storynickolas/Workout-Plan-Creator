import { useState, useContext } from "react";
import {
  Flex,
  Button,
  Box,
  Text,
  Select

} from "@chakra-ui/react";

import weights from '../Weights.jpg';
import { useHistory } from 'react-router-dom'
import { UserContext } from '../Context/User.context';
import { ScheduleContext } from "../Context/Schedule.context";
import { SavedContext } from "../Context/Saved.context";

const NewDay = () => {

  const history = useHistory();
  const data = history.location.state as {day: string, schedule_id: number, saved: [], user: number}

  const [selectedWorkout, setSelectedWorkout] = useState('')

  const {user} = useContext(UserContext)
  const {schedule, setSchedule} = useContext(ScheduleContext)
  const {savedList} = useContext(SavedContext)

  let typicalWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]


  function handleChange(option : string) {
    setSelectedWorkout(option)
  }

  function handleAdd() {
    let newProgram = {
      'day': data.day,
      'workout_id': Number(selectedWorkout),
      'schedule_id': user.schedule.id
    }
    fetch(`/workout_days`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(newProgram),
    })
      .then((response) => response.json())
      .then((response) => {
        if(response.errors){
          console.log(response.errors)
        }
        else {
          let day = typicalWeek.indexOf(response.day)
          let newWeek = [...schedule]
          newWeek[day] = response
          setSchedule([...newWeek])
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

        <Text fontSize='4xl'>{data.day}</Text>
        <Text>Select from saved workouts</Text>
        <Select placeholder='Workout' onChange={(e) => handleChange(e.target.value)}>
        {
       savedList.length !== 0  ? savedList.map((item: any) => 
          <option value={item.workout.id}>{item.workout.name}</option>
       ) : '' }
      
        </Select>
        <Button onClick={() => handleAdd()}>Add Day to Schedule</Button>
        <Button onClick={() => history.replace('/myPage')}>Return to Schedule</Button>

            

      </Box>      
    </Flex>
  );
};

export default NewDay;