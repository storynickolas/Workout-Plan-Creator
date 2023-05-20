import React, { useEffect, useState } from 'react';
import { Card, Button, CardBody, Text, SimpleGrid, UnorderedList, ListItem, Stack, Box } from '@chakra-ui/react'
import { AddIcon, StarIcon, InfoOutlineIcon } from '@chakra-ui/icons'
import { useHistory } from 'react-router-dom'
import { WorkoutContext } from '../Workout.context';
import { useContext } from 'react';

function Workouts( ) {

  const workoutList = useContext(WorkoutContext);
  const history = useHistory();

  function saveWorkout(workout: number) {
    console.log(workout)
    const user = sessionStorage.getItem("user_id")
    let cow = {
      workout_id: workout,
      user_id: Number(user)
    }

    fetch(`/saved_workouts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(cow),
    })
      .then((response) => response.json())
      .then((response) => {
        if(response.errors){

          console.log(response.errors)
        }
        else {
          console.log(response)
        }
      })

  }

  return (
    <Box >
      <Text fontSize='4xl'>Featured Workouts</Text>
        <SimpleGrid minChildWidth='300px' spacing='10px'>
        {
        workoutList.map((item: any) => 
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
                  item.workout_exercises.map((info: any) => 
                    <ListItem fontSize='md' textAlign='left'>
                      {info.exercise.name} {info.sets}x{info.reps}
                    </ListItem>)}
                  </UnorderedList>
                  {item.reviews.length > 0 ? <Text fontSize='md' as='i'>"{item.reviews[0].write_up}"</Text> : ''}
                   <Stack direction='row' spacing='10px' justify={'stretch'}>
                    <Button leftIcon={<InfoOutlineIcon/>} onClick={() => history.push(`/workouts/${item.id}`)} colorScheme='teal' variant='solid'>
                      More Info
                    </Button>
                    <Button rightIcon={<AddIcon />} colorScheme='teal' variant='outline' onClick={() => saveWorkout(item.id)}>
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

