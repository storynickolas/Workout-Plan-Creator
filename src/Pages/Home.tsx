import { useContext } from 'react';
import Workouts from './Workouts';
import { Box, Text, Button, SimpleGrid, Card, CardBody, Stack, UnorderedList, ListItem } from '@chakra-ui/react'
import { WorkoutContext } from '../Workout.context';
import { AddIcon, StarIcon, InfoOutlineIcon } from '@chakra-ui/icons'
import { useHistory } from 'react-router-dom'

function Home() {

  const workoutList = useContext(WorkoutContext);
  const history = useHistory();

  let cow = workoutList.slice(0,3)

  return (
    <div >
      <header className="Home">
        <Box w='100%' h='30%' p={4} color='white'>
          <Button onClick={() => console.log(workoutList)}></Button>
        <Text fontSize='4xl'>Featured Workouts</Text>
        
    <Box >
        <SimpleGrid minChildWidth='300px' spacing='10px'>
        {cow.map((item: any) => 
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
                   <Stack direction='row' spacing='10px' justify={'center'}>
                    <Button leftIcon={<InfoOutlineIcon/>} onClick={() => history.push(`/workouts/${item.id}`)} colorScheme='teal' variant='solid'>
                      More Info
                    </Button>
                    <Button rightIcon={<AddIcon />} colorScheme='teal' variant='outline' onClick={() => console.log(item.id)}>
                      Save Workout
                    </Button>
                  </Stack>
                  </CardBody>
                 
                </Card>
       )}
       </SimpleGrid>
    </Box>
        </Box>
      </header>
      
    </div>
  );
}

export default Home;