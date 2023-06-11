import React, { useEffect, useState, useContext } from 'react';
import { Card, Button, CardBody, Text, Stack, SimpleGrid, ListItem, Box, TableContainer, Tr, Td, Table, VStack } from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'
import { UserContext } from '../User.context';
import { AddIcon, StarIcon, InfoOutlineIcon} from '@chakra-ui/icons'
import AddDay from '../AddDay';
import EditButton from '../EditButton';
import { SavedContext } from '../Saved.context';
import { WorkoutContext } from '../Workout.context';


function User() {

  const [ww, setWw] = useState([{day: "Sunday"}, {day: "Monday"}, {day: "Tuesday"}, {day: "Wednesday"}, {day: "Thursday"}, {day: "Friday"}, {day: "Saturday"}])
  const {user, setUser} = useContext(UserContext)

  const {workoutList, setWorkoutList, myWorkouts, setMyWorkouts} = useContext(WorkoutContext)


  const week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  let myWeek = [{day: "Sunday"}, {day: "Monday"}, {day: "Tuesday"}, {day: "Wednesday"}, {day: "Thursday"}, {day: "Friday"}, {day: "Saturday"}]
  let redirect = {path: 'myPage'}

  // const { username, changeUser } = useContext(UserContext);
  const history = useHistory();

  const {savedList, setSavedList, widList, setWidList, sidList, setSidList} = useContext(SavedContext);

  // var item_value = sessionStorage.getItem("user")

  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        console.log('Logged Out');
        // sessionStorage.setItem('user', 'Tom')
        setUser({id: 0, schedule: {id: 0}, saved_workouts: [{ id: 0, name: "test", workout_id: 0 }]})
      }
    });
    history.push(`/login`);
    setWw([...myWeek])
    sessionStorage.removeItem('user_id')
  }


  function handleDelete(item: {id: number, name: string, time: number, user_id: number, workout_exercises: [{id: number, name: string}], reviews: [{rating: number}]}) {

    fetch(`/workouts/${item.id}`, { method: "DELETE" }).then((r) => {
      if (r.ok) {
        console.log('Deleted');
        let donkey = [...myWorkouts]
        let frog = donkey.indexOf(item)
        let dragon = [...workoutList]
        console.log(dragon)

        // let unicorn = dragon.indexOf(item)

        let unicorn = dragon.findIndex(x => x.name === item.name)


      
        setMyWorkouts([...donkey.slice(0,frog),...donkey.slice(frog +  1, donkey.length)])

        setWorkoutList([...dragon.slice(0,unicorn),...dragon.slice(unicorn +  1, dragon.length)])

      }
    });
  }

  function handleRemove(item: {id: number, workout: any, workout_id: number}) {


    fetch(`/saved_workouts/${item.id}`, { method: "DELETE" }).then((r) => {
      if (r.ok) {
        console.log('Deleted');

        let donkey = [...savedList]
        let otter = [...widList]
        let tiger = [...sidList]
        let fish = sidList.indexOf(item.id)

        setSavedList([...donkey.slice(0,fish),...donkey.slice(fish + 1,savedList.length)])
        setWidList([...otter.slice(0,fish),...otter.slice(fish + 1,widList.length)])
        setSidList([...tiger.slice(0,fish),...tiger.slice(fish + 1,sidList.length)])

      }
    });
  }


  useEffect(() => {

    let cow = Number(sessionStorage.getItem('user_id'))

    fetch(`/schedules/${cow}`).then((response) => {
      if (response.ok) {
        response.json().then((user) => 
        {
          let newWeek = myWeek 
          if(user.id !== 0 && user[0].workout_days.length > 0){
            for (let i = 0; i < user[0].workout_days.length; i++) {
              newWeek[week.indexOf(user[0].workout_days[i].day)] = user[0].workout_days[i]
            }
          }
          setWw([...newWeek])
        });
      }
    });

  }, []);

  return (
    <Box bg='grey' w='100%' h='100vh' p={4} color='white'>
      {Number(sessionStorage.getItem('user_id')) !== 0 ?
        <Box>
          <Button onClick={() => handleLogoutClick()}>
            Log Out
          </Button>
          <Box bg='teal'>
            <Text fontSize={'6xl'}>
              My Weekly Schedule
            </Text>
            <TableContainer>
              <Table >
                <Tr>
                  {ww.map((item: any) => 
                    <Td textAlign={'center'} border={'2px solid'}>
                      <Text >{item.day}</Text>
                      {item.workout ? 
                        <VStack>
                          <Text>
                            {item.workout.name}
                          </Text> 
                        </VStack>
                      : ''}
                      {item.workout ? 
                      <Button onClick={() => history.push(`/workout_days/${item.id}`, {item})}>
                        Go To Day
                      </Button> 
                      : 
                      <Button onClick={() => history.push('/workout_days/new', {day: item.day, saved: user.saved_workouts, user: user.id})}>
                        Add Workout
                      </Button>}
                    </Td>
                  )}
                </Tr>
              </Table>
            </TableContainer>
          </Box>
          <Text fontSize={'4xl'}>
            Saved Workouts
          </Text>
          <SimpleGrid minChildWidth='300px' spacing='10px' overflowY={'scroll'} maxH={'80vh'}>
            {savedList[0]?.workout?.name ? savedList.map((item: any) => 
              <Card >
                <CardBody>
                  <Text fontSize='2xl'>
                    {item.workout.name}
                  </Text>
                  <Text fontSize='md'>
                    {item.workout.time} Minutes
                  </Text>
                  <Stack direction='row' spacing='10px' justify={'center'}>
                    <Button leftIcon={<InfoOutlineIcon/>} onClick={() => history.push(`/workouts/${item.workout_id}`, {redirect})} colorScheme='teal' variant='solid'>
                      More Info
                    </Button>
                    <Button onClick={() => handleRemove(item)}>
                      Remove
                    </Button>
                  </Stack>
                </CardBody>
              </Card> 
            ) : '' } 
          </SimpleGrid>
          <Text fontSize={'4xl'}>
            My Workouts
          </Text>
          <SimpleGrid minChildWidth='300px' spacing='10px' overflowY={'scroll'} maxH={'80vh'}>
            {myWorkouts[0]?.name !== ''  ? myWorkouts.map((item : any) => 
              <Card >
                <CardBody>
                  <Text fontSize='2xl'>
                    {item.name}
                  </Text>
                  <Text fontSize='md'>
                    {item.time} Minutes
                  </Text>
                   <Stack direction='row' spacing='10px' justify={'center'}>
                    <Button leftIcon={<InfoOutlineIcon/>} onClick={() => history.push(`/workouts/${item.id}`, {redirect})} colorScheme='teal' variant='solid'>
                      More Info
                    </Button>
                    <EditButton item={item} />
                    <Button onClick={() => handleDelete(item)}>
                      Delete
                    </Button>
                  </Stack>
                </CardBody> 
              </Card> 
            ) : '' }
          </SimpleGrid>
        </Box> 
       : 
       <Text>
        Please Log In
      </Text> } 
    </Box>
  );
}

export default User;

        

