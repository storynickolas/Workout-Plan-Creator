import React, { useEffect, useState } from 'react';
import { Card, Button, CardBody, Text, SimpleGrid, UnorderedList, ListItem, ListIcon } from '@chakra-ui/react'

function Workouts() {
  const [newName, setNewName] = useState(
    [{
      name: "",
      time: 1,
      workout_exercises: [
          {
              id: 0,
              exercise: {
                  id: 0,
                  name: "",
                  muscle_group: "",
                  video: "",
              },
              reps: 0,
              sets: 0
          }
    ]}]
  )

  function testClick() {

    console.log(newName)
  }


  useEffect(() => {
    fetch("http://localhost:3000/workouts").then((response) => {
      if (response.ok) {
        response.json().then((user) => 
        {
          setNewName(user)
        });
      }
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Button onClick={() => testClick()}>Click Me</Button>
        {/* {newName} */}
        <h1>Workouts</h1>
        <SimpleGrid columns={3} spacing={10}>
        {
        newName.map((item) => 
                <Card >
                <CardBody>
                  <Text fontSize='2xl'>{item.name}</Text>
                  <Text fontSize='md'>{item.time} Minutes</Text>
                  <UnorderedList>{
                  item.workout_exercises.map((info) => 
                    <ListItem fontSize='md' textAlign='left'>
                      {info.exercise.name} {info.sets}x{info.reps}
                    </ListItem>)}
                  </UnorderedList>
                  </CardBody>
                </Card>
       )}
       </SimpleGrid>
      </header>
    </div>
  );
}

export default Workouts;