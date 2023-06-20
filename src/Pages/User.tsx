import { useContext } from 'react';
import { Card, Button, CardBody, Text, Stack, SimpleGrid, Spinner, Divider, Box, TableContainer, Tr, Td, Table, VStack, AccordionItem, Accordion, AccordionButton, AccordionPanel, AccordionIcon } from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'
import { UserContext } from '../Context/User.context';
import { InfoOutlineIcon } from '@chakra-ui/icons'
import EditButton from '../Components/EditButton';
import { SavedContext } from '../Context/Saved.context';
import { WorkoutContext } from '../Context/Workout.context';
import { ScheduleContext } from '../Context/Schedule.context';



function User() {

  const {user, setUser} = useContext(UserContext)
  const {schedule, setSchedule} = useContext(ScheduleContext)

  const {workoutList, setWorkoutList, myWorkouts, setMyWorkouts} = useContext(WorkoutContext)

  let myWeek = [{day: "Sunday"}, {day: "Monday"}, {day: "Tuesday"}, {day: "Wednesday"}, {day: "Thursday"}, {day: "Friday"}, {day: "Saturday"}]
  
  let redirect = {path: 'myPage'}

  const history = useHistory();

  const {savedList, setSavedList, widList, setWidList, sidList, setSidList} = useContext(SavedContext);


  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        console.log('Logged Out');
        setUser({id: 0, username: '', schedule: {id: 0}, saved_workouts: [{ id: 0, name: "test", workout_id: 0 }]})
        setWidList([])
      }
    });
    history.push(`/login`);
    setSchedule([...myWeek])

    sessionStorage.removeItem('user_id')
  }


  function handleDelete(item: {id: number, name: string, time: number, user_id: number, workout_exercises: [{id: number, name: string}], reviews: [{rating: number}]}) {

    fetch(`/workouts/${item.id}`, { method: "DELETE" }).then((r) => {
      if (r.ok) {
        console.log('Deleted');
        let uWorkouts = [...myWorkouts] 
        let deletedItem = uWorkouts.indexOf(item)
        let allWorkouts = [...workoutList]

        let removedItem = allWorkouts.findIndex(x => x.name === item.name)
        setMyWorkouts([...uWorkouts.slice(0,deletedItem),...uWorkouts.slice(deletedItem +  1, uWorkouts.length)])
        setWorkoutList([...allWorkouts.slice(0,removedItem),...allWorkouts.slice(removedItem +  1, allWorkouts.length)])
      }
    });
  }

  function handleRemove(item: {id: number, workout: any, workout_id: number}) {


    fetch(`/saved_workouts/${item.id}`, { method: "DELETE" }).then((r) => {
      if (r.ok) {
        console.log('Deleted');

        let sWorkouts = [...savedList]
        let indexList = [...widList]
        let savedIds = [...sidList]
        let unSaved  = sidList.indexOf(item.id)

        setSavedList([...sWorkouts.slice(0,unSaved),...sWorkouts.slice(unSaved + 1,savedList.length)])
        setWidList([...indexList.slice(0,unSaved),...indexList.slice(unSaved + 1,widList.length)])
        setSidList([...savedIds.slice(0,unSaved),...savedIds.slice(unSaved + 1,sidList.length)])
      }
    });
  }

  return (
    <Box bg='grey' w='100%' minH='85vh' maxH='85vh' p={4} color='white' position='inherit' overflowY={'scroll'} >
      <Button onClick={() =>  console.log(schedule)}></Button>
      {user.username !== '' ?
      <Box>
        <Box w='100%' bg='grey' paddingBottom='2%'>
          <Text fontSize='4xl'>Welcome Back {user.username}</Text>

        <Button onClick={() => handleLogoutClick()} color='black'>
          Log Out
        </Button>
        <Divider orientation='horizontal' />
        </Box>
        <Box bg='white' color='black'>
          <Text fontSize={'6xl'} bg='teal' color='white'>
            My Weekly Schedule
          </Text>
          <TableContainer>
            <Table >
              <Tr>
                {schedule.map((item: any) => 
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
        <Accordion>
          <AccordionItem>
          <AccordionButton>
            <Box as="span" flex='1' >
              <Text fontSize={'4xl'} as='u'>
                Saved Workouts
              </Text>
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
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
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem>
            <AccordionButton>
              <Box as="span" flex='1' >
                <Text fontSize={'4xl'} as='u'>My Workouts</Text>
              </Box>
            <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
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
                ) : ''}
              </SimpleGrid>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box> 
      : 
      <Box minH={'82vh'}>
      <Text>
      Please Log In
      </Text> </Box>} 
    </Box>
  );
}

export default User;



        

