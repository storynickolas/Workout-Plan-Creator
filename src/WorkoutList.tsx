import React, { useEffect, useState } from 'react';
import { Card, Button, CardBody, Text, SimpleGrid, UnorderedList, ListItem, Stack, Box } from '@chakra-ui/react'
import { AddIcon, StarIcon, InfoOutlineIcon } from '@chakra-ui/icons'
import { useHistory } from 'react-router-dom'
import { WorkoutContext } from './Workout.context';
import { useContext } from 'react';
import { UserContext } from './User.context';

import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { SavedContext } from './Saved.context';

function WorkoutLists( { newLength } : {newLength : number } ) {

  const {workoutList, setWorkoutList} = useContext(WorkoutContext);

  const {savedList, setSavedList, widList, setWidList, sidList, setSidList} = useContext(SavedContext);

  const {user, setUser} = useContext(UserContext)
  
  const history = useHistory();

  function saveWorkout(workout: number) {
    let savedWorkout = {
      workout_id: workout,
      user_id: Number(user.id)
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
          let donkey = [...savedList]
          let otter = [...widList]
          let tiger = [...sidList]
          donkey.push(response)
          otter.push(response.workout.id)
          tiger.push(response.id)
          setSavedList([...donkey])
          setWidList([...otter])
          setSidList([...tiger])
        }
      })
    }

    function handleRemove(sid : number, id: number) {
      let cow = sidList[sid]
  
      if(cow) {
        fetch(`/saved_workouts/${cow}`, { method: "DELETE" }).then((r) => {
                if (r.ok) {
                  console.log('success')
                  let donkey = [...savedList]
                  let otter = [...widList]
                  let tiger = [...sidList]
                  setSavedList([...donkey.slice(0,sid),...donkey.slice(sid + 1,savedList.length)])
                  setWidList([...otter.slice(0,sid),...otter.slice(sid + 1,widList.length)])
                  setSidList([...tiger.slice(0,sid),...tiger.slice(sid + 1,sidList.length)])
                }
          })
      }
      
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

  console.log(workoutList)

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
                item?.workout_exercises[0]?.name !== '' ? item.workout_exercises.map((info: any, index) => 
                  <ListItem fontSize='md' textAlign='left' key={info.exercise.name + index}>
                    {info.exercise.name} {info.sets}x{info.reps}
                  </ListItem>) : ''}
              </UnorderedList>
              {/* {item.reviews[0].rating !== 0 ? <Text fontSize='md' as='i'>"{item.reviews[0].write_up}"</Text> : ''} */}
                <Stack direction='row' spacing='10px' justify={'center'}>
                <Button leftIcon={<InfoOutlineIcon/>} onClick={() => history.push(`/workouts/${item.id}`)} colorScheme='teal' variant='solid'>
                  More Info
                </Button>
                
                { widList.includes(item.id) ?
                  <Button rightIcon={<IoHeartSharp />} colorScheme='teal' variant='outline' 
                    onClick={() => {
                    let cow = widList.indexOf(item.id)
                    console.log('Mario!!')
                    console.log(cow)
                    console.log('Luigi')
                     handleRemove(cow, item.id)}
                    }>
                  Saved
                </Button>
                :
                <Button rightIcon={<IoHeartOutline />} colorScheme='teal' variant='outline' onClick={() => saveWorkout(item.id)}>
                  Save Workout
                </Button>
}
              </Stack>
              </CardBody>
            </Card>
       ) : '' }
       </SimpleGrid>
  );
}

export default WorkoutLists;