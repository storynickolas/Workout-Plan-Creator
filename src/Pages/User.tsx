import React, { useEffect, useState, useContext } from 'react';
import { Card, Button, CardBody, Text, Stack, UnorderedList, ListItem, Box, TableContainer, Tr, Td, Table, VStack } from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'
import { UserContext } from '../User.context';
import { AddIcon, StarIcon, InfoOutlineIcon } from '@chakra-ui/icons'

// import { Card, Button, CardBody, Text, SimpleGrid, UnorderedList, ListItem, Stack, Box } from '@chakra-ui/react'
// import { AddIcon, StarIcon, InfoOutlineIcon } from '@chakra-ui/icons'

function User() {
  const [mySaved, setMySaved] = useState([])
  const [ww, setWw] = useState([{day: "Sunday"}, {day: "Monday"}, {day: "Tuesday"}, {day: "Wednesday"}, {day: "Thursday"}, {day: "Friday"}, {day: "Saturday"}])
  const {user, setUser} = useContext(UserContext)

  const week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  let myWeek = [{day: "Sunday"}, {day: "Monday"}, {day: "Tuesday"}, {day: "Wednesday"}, {day: "Thursday"}, {day: "Friday"}, {day: "Saturday"}]


  // const { username, changeUser } = useContext(UserContext);
  const history = useHistory();

  // var item_value = sessionStorage.getItem("user")

  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        console.log('Logged Out');
        // sessionStorage.setItem('user', 'Tom')
        setUser({id: 0, schedule: {id: 0}, saved_workouts: [{ id: 0, name: "test" }]})
      }
    });
    history.push(`/login`);
    setWw([...myWeek])
    sessionStorage.removeItem('user_id')
  }

  function getInfo() {
    console.log(Number(sessionStorage.getItem('user_id')))
    console.log(user)
    // fetch(`/users/${Number(sessionStorage.getItem('user_id'))}`).then((response) => {
    //   if (response.ok) {
    //     let cow : any = []

    //     response.json().then((user) => 
    //     { user[0].saved_workouts.forEach((element : any) => {
    //       if(!cow.includes(element.workout_id)){
    //         cow.push(element.workout_id)
    //       }
    //     });
    //     // console.log(user[0].saved_workouts)
    //       setMySaved(cow)
    //     });
    //   }
    // });
  }



  useEffect(() => {

    let cow = user.schedule.id

    console.log(cow)

    fetch(`/schedules/${cow}`).then((response) => {
      if (response.ok) {
        response.json().then((user) => 
        {
          console.log(user)
          let newWeek = myWeek
          newWeek[week.indexOf(user[0].workout_days[0].day)] = user[0].workout_days[0]
          newWeek[week.indexOf(user[0].workout_days[1].day)] = user[0].workout_days[1]
          setWw([...newWeek])
          console.log('Testing User Page')
          console.log(myWeek)
        });
      }
    });

  }, [user]);

  return (
    <Box bg='grey' w='100%' h='100vh' p={4} color='white'>

        <Button onClick={() => handleLogoutClick()}>Log Out</Button>
        <Button onClick={() => getInfo()}>Test</Button>

      <Box bg='teal'>
        {/* <SimpleGrid columns={7} minChildWidth={'120px'} overflowX={'auto'} > */}
        <TableContainer>
        <Table >
        <Tr>
        {ww.map((item: any) => 
                <Td textAlign={'center'} border={'2px solid'}>
                  
                  <Text >{item.day}</Text>
                  {item.workout ? <VStack><Text >{item.workout.name}</Text> 
                  <Button onClick={() => history.push(`/workouts/${item.workout.id}`)}>Go To Workout</Button>
                  <Button onClick={() => alert('Remove')}>Edit</Button>
                  </VStack>: ''}
                  {item.workout ? '' : <Button onClick={() => alert(item.day)}>Add Workout</Button> }
  
                  
 
                
                </Td>
        )}
        </Tr>
        </Table>
        </TableContainer>
      </Box>
      <Button onClick={() => console.log(mySaved)}>Click Me</Button>
      {
       user.saved_workouts[0].id !== 0 ? user.saved_workouts.map((item: any) => 
                <Card >
                <CardBody>
                  <Text fontSize='2xl'>{item.workout.name}</Text>
                  <Text fontSize='md'>{item.workout.time} Minutes</Text>
    
            
                  {/* <UnorderedList>{
                  item.workout_exercises.map((info: any) => 
                    <ListItem fontSize='md' textAlign='left'>
                      {info.exercise.name} {info.sets}x{info.reps}
                    </ListItem>)}
                  </UnorderedList>
                  {item.reviews.length > 0 ? <Text fontSize='md' as='i'>"{item.reviews[0].write_up}"</Text> : ''} */}
                   <Stack direction='row' spacing='10px' justify={'center'}>
                    <Button leftIcon={<InfoOutlineIcon/>} onClick={() => history.push(`/workouts/${item.workout_id}`)} colorScheme='teal' variant='solid'>
                      More Info
                    </Button>
                  </Stack>
                  </CardBody>
                 
                </Card> 
       ) : '' }



      </Box>
  );
}

export default User;

        

