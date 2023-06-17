import { Card, Button, CardBody, Text, SimpleGrid, UnorderedList, ListItem, Stack } from '@chakra-ui/react'
import { StarIcon, InfoOutlineIcon } from '@chakra-ui/icons'
import { useHistory } from 'react-router-dom'
import { WorkoutContext } from '../Context/Workout.context';
import { useContext } from 'react';

import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { SavedContext } from '../Context/Saved.context';

function WorkoutLists( { newLength } : {newLength : number } ) {

  const {workoutList} = useContext(WorkoutContext);

  const {handleRemove, saveWorkout, widList } = useContext(SavedContext);
  
  const history = useHistory();

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
    <SimpleGrid minChildWidth='300px' spacing='10px' overflowY={'scroll'} maxH={'75vh'}>
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