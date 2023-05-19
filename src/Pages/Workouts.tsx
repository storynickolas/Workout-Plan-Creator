import React, { useEffect, useState } from 'react';
import { Card, Button, CardBody, Text, SimpleGrid, UnorderedList, ListItem, Stack, Box } from '@chakra-ui/react'
import { AddIcon, StarIcon, InfoOutlineIcon } from '@chakra-ui/icons'

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


  useEffect(() => {
    fetch("/workouts").then((response) => {
      if (response.ok) {
        response.json().then((user) => 
        {
          setNewName(user)
        });
      }
    });
  }, []);

  return (
    <Box bg='grey' w='100%' h='100vh' p={4} color='white'>

        <Text fontSize='4xl'>Workouts</Text>
        <SimpleGrid minChildWidth='300px' spacing='10px'>
        {
        newName.map((item) => 
                <Card >
                <CardBody>
                  <Text fontSize='2xl'>{item.name}</Text>
                  <Text fontSize='md'>{item.time} Minutes</Text>
                  {item.reviews.length > 0 ? [
                    ...Array(item.reviews[0].rating),
                  ].map((value: undefined, index: number) => (
                    <StarIcon w={5} h={5} color='gold' key={index}/>
                  )) : ''}
            
                  <UnorderedList>{
                  item.workout_exercises.map((info) => 
                    <ListItem fontSize='md' textAlign='left'>
                      {info.exercise.name} {info.sets}x{info.reps}
                    </ListItem>)}
                  </UnorderedList>
                  {item.reviews.length > 0 ? <Text fontSize='md' as='i'>"{item.reviews[0].write_up}"</Text> : ''}
                   <Stack direction='row' spacing='10px' justify={'stretch'}>
                    <Button leftIcon={<InfoOutlineIcon />} colorScheme='teal' variant='solid'>
                      More Info
                    </Button>
                    <Button rightIcon={<AddIcon />} colorScheme='teal' variant='outline'>
                      Save Workout
                    </Button>
                  </Stack>
                  </CardBody>
                 
                </Card>
       )}
       </SimpleGrid>
    </Box>
  );
}

export default Workouts;

