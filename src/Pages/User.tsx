import React, { useEffect, useState, useContext } from 'react';
import { Card, Button, CardBody, Text, Stack, SimpleGrid, ListItem, Box, TableContainer, Tr, Td, Table, VStack } from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'
import { UserContext } from '../User.context';
import { AddIcon, StarIcon, InfoOutlineIcon } from '@chakra-ui/icons'
import AddDay from '../AddDay';


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

    let cow = user.id

    console.log(cow)

    fetch(`/schedules/${cow}`).then((response) => {
      if (response.ok) {
        response.json().then((user) => 
        {
          console.log(user)
          console.log('Testerooo')
          let newWeek = myWeek
          console.log(user)
          console.log('Wroooooong')
          // console.log(myWeek)
          console.log(user[0].workout_days.length + 'Alligator ')
          console.log(newWeek[week.indexOf(user[0].workout_days[0].day)] )
          
          if(user.id !== 0 && user[0].workout_days.length > 0){

            for (let i = 0; i < user[0].workout_days.length; i++) {
              newWeek[week.indexOf(user[0].workout_days[i].day)] = user[0].workout_days[i]
            }
            console.log('Dog')

          }

          setWw([...newWeek])
          console.log('Testing User Page')
          console.log(myWeek)
          console.log('Fishes')
          console.log(newWeek)
        });
      }
    });

  }, [user]);

  return (
    
    <Box bg='grey' w='100%' h='100vh' p={4} color='white'>
      {Number(sessionStorage.getItem('user_id')) !== 0 ?
      <Box>

        <Button onClick={() => handleLogoutClick()}>Log Out</Button>
        <Button onClick={() => getInfo()}>Test</Button>

      <Box bg='teal'>
      <Text fontSize={'6xl'}>My Weekly Schedule</Text>
        {/* <SimpleGrid columns={7} minChildWidth={'120px'} overflowX={'auto'} > */}
        <TableContainer>
        <Table >
        <Tr>
        {ww.map((item: any) => 
                <Td textAlign={'center'} border={'2px solid'}>
                  <Text >{item.day}</Text>
                  {item.workout ? <VStack><Text >{item.workout.name}</Text> 
                  
                  </VStack>: ''}
                  {item.workout ? <Button onClick={() => history.push(`/workout_days/${item.id}`, {item})}>Go To Day</Button> 
                  : <Button onClick={() => history.push('/workout_days/new', {day: item.day, saved: user.saved_workouts})}>Add Workout</Button>}

                </Td>
        )}
        </Tr>
        </Table>
        </TableContainer>
      </Box>
     <Text fontSize={'4xl'}>My Saved Workouts</Text>
      {/* <Button onClick={() => console.log(mySaved)}>Click Me</Button> */}
       <SimpleGrid minChildWidth='300px' spacing='10px' overflowY={'scroll'} maxH={'80vh'}>
      {
       user.id !== 0  ? user.saved_workouts.map((item: any) => 
                <Card >

                <CardBody>
                  <Text fontSize='2xl'>{item.workout.name}</Text>
                  <Text fontSize='md'>{item.workout.time} Minutes</Text>
    
                   <Stack direction='row' spacing='10px' justify={'center'}>
                    <Button leftIcon={<InfoOutlineIcon/>} onClick={() => history.push(`/workouts/${item.workout_id}`)} colorScheme='teal' variant='solid'>
                      More Info
                    </Button>
                    <Button onClick={() => console.log(item)}>New Button</Button>
                  </Stack>
                  </CardBody>
                 
                </Card> 
       ) : '' }
       </SimpleGrid>
       </Box>
       : <Text>Please Log In</Text> } 
     </Box>
  );
}

export default User;

        

