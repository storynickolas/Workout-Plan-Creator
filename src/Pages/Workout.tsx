import React, { useEffect, useState } from 'react';
import { Card, Center, AspectRatio, Button, CardBody, Text, SimpleGrid, UnorderedList, Spinner, Stack, Box } from '@chakra-ui/react'
import { AddIcon, StarIcon, InfoOutlineIcon } from '@chakra-ui/icons'
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom'
import { WorkoutContext } from '../Workout.context';
import { useContext } from 'react';


function Workout( ) {
  const workoutList = useContext(WorkoutContext);
  const [video, setVideo] = useState('')
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(true)
  const history = useHistory();
  type QuizParams = {
    id: string;
  };

  function handleClick(info: any) {

    setVideo(info.exercise.video)
    setName(info.exercise.name)
  }

  function handleDelete() {

    fetch(`/workouts/${cow.id}`, { method: "DELETE" }).then((r) => {
      if(r.ok){
        console.log('Success')
      }
      else {
        r.json().then((err) => console.log(err.errors));
      }
    });

  }
  
  const { id } = useParams<QuizParams>();
  let vw = Number(id)
  let pos = workoutList.map(e => e.id).indexOf(vw)
  
  let cow: any = workoutList[pos]

  useEffect(() => {
    if(cow){
    setLoading(false)}

    setTimeout(() => {
      setLoading(false)
    }, 2000)

  }, [cow])



  return (
    <Box bg='grey' w='100%' h='100%' minH='100vh' p={4} color='white'>
      {loading === false  ? '' : <Spinner size='xl' />}
      <Button onClick={() => console.log(cow)}>Test</Button>
      <Button onClick={() => console.log(Number(sessionStorage.getItem('user_id')))}>Testing 2</Button>
      <Button onClick={() => handleDelete()}>Delete</Button>

        {cow ? 
      <SimpleGrid columns={1} >

      <Text fontSize='4xl'>{cow.name}</Text>
      <Text fontSize='2xl'>{cow.time} Minutes</Text>
      <Center>
      {cow.reviews.length > 0 ? [
                    ...Array(cow.reviews[0].rating),
                  ].map((value: undefined, index: number) => (
                    <StarIcon w={5} h={5} color='gold' key={index}/>
                  )) : ''}
                  
                 </Center> 
                 {cow.reviews.length > 0 ? <Text fontSize='md' as='i'>"{cow.reviews[0].write_up}"</Text> : ''}
  {/* </Center> */}
                  </SimpleGrid> : <Text>Not Available</Text>}


                  {cow ?
    <SimpleGrid columns={1} >
 <Center >
 <Box bg='tomato' width='600px' >
{/* <AspectRatio maxW='1000px' ratio={5 / 3}>
   <iframe  src={video} width="100%" title="YouTube video player" />
   </AspectRatio> */}
   <Text fontSize='2xl'>{name}</Text>
   </Box>
 </Center>
 




        {cow.workout_exercises.map((info: any) => 
    
           <SimpleGrid columns={1} >
        <Center >
        <Box bg='tomato' width='600px' onClick={() => handleClick(info)}>
          <Text fontSize='2xl'>{info.exercise.name} - {info.sets} sets of {info.reps}</Text>
          <Button onClick={() => handleClick(info)}>Tutorial</Button>
          </Box>
        </Center>
        
      </SimpleGrid>


)}
        

                <Card >
                <CardBody>


                  {cow.reviews.length > 0 ? <Text fontSize='md' as='i'>"{cow.reviews[0].write_up}"</Text> : ''}
                   <Stack direction='row' spacing='10px' justify={'center'}>
  
                    <Button leftIcon={<InfoOutlineIcon />} colorScheme='teal' variant='solid' onClick={() => history.push(`/workouts`)}>
                      Back
                    </Button>
                    <Button rightIcon={<AddIcon />} colorScheme='teal' variant='outline' onClick={() => console.log(cow.id)}>
                      Save Workout
                    </Button>
                  </Stack>
                  </CardBody>
                 
                </Card>

                </SimpleGrid> : ''}
    </Box>
  );
}

export default Workout;