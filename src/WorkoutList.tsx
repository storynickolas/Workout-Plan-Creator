import React, { useEffect, useState } from 'react';
import { Card, Button, CardBody, Text, SimpleGrid, UnorderedList, ListItem, Stack, Box } from '@chakra-ui/react'
import { AddIcon, StarIcon, InfoOutlineIcon } from '@chakra-ui/icons'
import { useHistory } from 'react-router-dom'
import { WorkoutContext } from './Workout.context';
import { useContext } from 'react';

import { IoHeartOutline } from "react-icons/io5";

function WorkoutLists( { newLength } : {newLength : number } ) {

  const {workoutList, setWorkoutList} = useContext(WorkoutContext);
  
  const history = useHistory();

  function saveWorkout(workout: number) {
    const user = sessionStorage.getItem("user_id")
    let savedWorkout = {
      workout_id: workout,
      user_id: Number(user)
    }

    fetch(`/saved_workouts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(savedWorkout),
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

  let pagination

  if(newLength === 0){
    pagination = workoutList.length
  }
  else{
    pagination = newLength
  }

  interface workoutType {
    id: number, name: string, time: number, user_id: number, workout_exercises: {name: string}[], reviews: {rating: number}[]
  }

  return (
    <SimpleGrid minChildWidth='300px' spacing='10px' overflowY={'scroll'} maxH={'80vh'}>
      {workoutList[0].id !== 0 ? 
        workoutList.slice(0,pagination).map((item:  workoutType, index ) => 
          <Card key={item.id + item.name + index}>
            <CardBody>
              <Text fontSize='2xl'>{item.name}</Text>
              <Text fontSize='md'>{item.time} Minutes</Text>
              {item.reviews.length > 0 && item.reviews[0].rating !== 0 ? [
                ...Array(item.reviews[0].rating),
              ].map((value: undefined, index: number) => (
                <StarIcon w={5} h={5} color='gold' key={index}/>
              )) : '' }
              <UnorderedList>{
                item.workout_exercises[0]?.name !== '' ? item.workout_exercises.map((info: any, index) => 
                  <ListItem fontSize='md' textAlign='left' key={info.exercise.name + index}>
                    {info.exercise.name} {info.sets}x{info.reps}
                  </ListItem>) : ''}
              </UnorderedList>
              {/* {item.reviews[0].rating !== 0 ? <Text fontSize='md' as='i'>"{item.reviews[0].write_up}"</Text> : ''} */}
                <Stack direction='row' spacing='10px' justify={'center'}>
                <Button leftIcon={<InfoOutlineIcon/>} onClick={() => history.push(`/workouts/${item.id}`)} colorScheme='teal' variant='solid'>
                  More Info
                </Button>
                <Button rightIcon={<IoHeartOutline />} colorScheme='teal' variant='outline' onClick={() => saveWorkout(item.id)}>
                  Save Workout
                </Button>
              </Stack>
              </CardBody>
            </Card>
       ) : '' }
       </SimpleGrid>
  );
}

export default WorkoutLists;