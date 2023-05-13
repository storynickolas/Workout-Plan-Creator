import React, { useEffect, useState } from 'react';
import { Card, Button, CardBody, Text, SimpleGrid, UnorderedList, ListItem } from '@chakra-ui/react'
import { StarIcon } from '@chakra-ui/icons'

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
      ],
      reviews: [
        {
            id: 0,
            rating: 0,
            write_up: ''
      }]
    }]
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
                  {[
                    ...Array(item.reviews[0].rating),
                  ].map((value: undefined, index: number) => (
                    <StarIcon w={5} h={5} color='gold' key={index}/>
                  ))}
            
                  <UnorderedList>{
                  item.workout_exercises.map((info) => 
                    <ListItem fontSize='md' textAlign='left'>
                      {info.exercise.name} {info.sets}x{info.reps}
                    </ListItem>)}
                  </UnorderedList>
                  <Text fontSize='md' as='i'>"{item.reviews[0].write_up}"</Text>
                  </CardBody>
                </Card>
       )}
       </SimpleGrid>
      </header>
    </div>
  );
}

export default Workouts;

