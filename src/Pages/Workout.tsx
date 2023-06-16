import { useEffect, useState, useContext } from 'react';
import { Card, Center, AspectRatio, Button, CardBody, Text, SimpleGrid, Spinner, Stack, Box, Divider, Grid, GridItem } from '@chakra-ui/react'
import { InfoOutlineIcon } from '@chakra-ui/icons'
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom'
import { WorkoutContext } from '../Context/Workout.context';
import { SavedContext } from '../Context/Saved.context';


import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";



function Workout( ) {
  const {workoutList } = useContext(WorkoutContext);
  const [video, setVideo] = useState('')
  const [name, setName] = useState('')
  const [direct, setDirect] = useState('')
  const history = useHistory();

  const [sWorkout, setSWorkout] = useState({id: 0, time: 0, name: '', workout_exercises: [{exercise: {name: '', video: ''}}]})

  const { handleRemove, saveWorkout, widList } = useContext(SavedContext);

  type itemIdParams = {
    id: string;
  };

  const { id } = useParams<itemIdParams>();

  interface dataType {
    redirect: {path: string}
  }
  
  let data : dataType = history.location.state as {redirect: {path: '' }}

  useEffect(() => {

    if(history.location.state && data?.redirect?.path !== '') {
      setDirect(data.redirect.path)
  }
  else{
    setDirect('workouts')
  }
}, [data]

  )

  function handleClick(info: any) {

    setVideo(info.exercise.video)
    setName(info.exercise.name)
  }

  useEffect(() => {
    if(workoutList[0].id !== 0){
    let vw = Number(id)
    let pos = workoutList.map(e => e.id).indexOf(vw)
    
    let cow: any = workoutList[pos]
    setSWorkout(cow)
    setVideo(sWorkout.workout_exercises[0].exercise.video)
    setName(sWorkout.workout_exercises[0].exercise.name)
    }

  }, [workoutList] )

  
  return (
    <Box bg='black' maxH='84vh'  position='inherit'>
    {sWorkout?.name !== '' ?
    <Grid templateRows='repeat(2, 4fr)' templateColumns='repeat(5, 1fr)'bg='black' overflowY={'scroll'} h={'82vh'}>
      <GridItem rowSpan={2} colSpan={3} bg='black' >  
          <Card bg='black'>
            <CardBody>
              {/* {cow.reviews.length > 0 ? <Text fontSize='md' as='i'>"{cow.reviews[0].write_up}"</Text> : ''} */}
            </CardBody>
            </Card>
            <Box bg='black' padding='5%' >
              <AspectRatio maxW='1000px' ratio={5 / 3}>
                <iframe  src={video} width="100%" title="YouTube video player" />
              </AspectRatio>
              <Text fontSize='4xl' color='white'>{name}</Text>
            </Box>
        </GridItem>
        <GridItem rowSpan={2} colSpan={2} bg='black' overflowY={'scroll'} >
          <Text fontSize='6xl' bg='black' color='white'>{sWorkout.name}</Text>
          <Text fontSize='4xl' bg='black' color='white'>{sWorkout.time} Minutes</Text>
          <Stack direction='row' spacing='10px' justify={'center'} padding='2%'>
            <Button leftIcon={<InfoOutlineIcon />} colorScheme='teal' variant='solid' onClick={() => history.push(`/${direct}`)}>Back</Button>
            { widList.includes(sWorkout.id) ?
              <Button rightIcon={<IoHeartSharp />} colorScheme='teal' variant='outline' 
                onClick={() => {
                  let dragon = widList.indexOf(sWorkout.id)
                  handleRemove(dragon)}
              }>
              Saved
            </Button>
            :
            <Button rightIcon={<IoHeartOutline />} colorScheme='teal' variant='outline' onClick={() => saveWorkout(sWorkout.id)}>
              Save Workout
            </Button> }
          </Stack>
          {sWorkout.workout_exercises.map((info: any) => 
            <SimpleGrid columns={1}>
              <Center >
                <Box bg='teal' width='600px' onClick={() => handleClick(info)} >
                  <Text fontSize='3xl'>{info.exercise.name}</Text>
                  <Text fontSize='2xl'>{info.sets} sets of {info.reps}</Text>
                  {info.exercise.name === name ? '' : <Button color='white' variant='outline' onClick={() => handleClick(info)}>Tutorial</Button>}
                  <Divider></Divider>
                </Box>
              </Center>
            </SimpleGrid> 
          )}
        </GridItem>
      </Grid> : <Box minH='84vh'><Spinner size='xl' /><Text color='white'>Loading...</Text></Box>}
    </Box>
  );
}

export default Workout;

