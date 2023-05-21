import React, { useEffect, useState, useContext } from 'react';
import { Card, Button, CardBody, Text, SimpleGrid, AspectRatio, Input, Box, TableContainer, Tr, Td, Table, VStack } from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'
import { UserContext } from '../User.context';

function User() {
  const [workout, setWorkout] = useState('')
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
        sessionStorage.setItem('user', 'Tom')
        setUser(null)
      }
    });
    history.push(`/login`);
  }


  useEffect(() => {
    let cow = Number(sessionStorage.getItem('schedule_id'))
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
          console.log(myWeek)
        });
      }
    });

  }, [user]);

  return (
    <Box bg='grey' w='100%' h='100vh' p={4} color='white'>

        <Button onClick={() => handleLogoutClick()}>Log Out</Button>

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
      </Box>
  );
}

export default User;

        

