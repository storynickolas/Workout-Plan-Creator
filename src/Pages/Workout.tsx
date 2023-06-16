import { useEffect, useState, useContext } from 'react';
import { Card, Center, AspectRatio, Button, CardBody, Text, SimpleGrid, UnorderedList, Spinner, Stack, Box, Divider, Grid, GridItem } from '@chakra-ui/react'
import { AddIcon, StarIcon, InfoOutlineIcon } from '@chakra-ui/icons'
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom'
import { WorkoutContext } from '../Context/Workout.context';
import { SavedContext } from '../Context/Saved.context';
import { UserContext } from '../Context/User.context';

import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";



function Workout( ) {
  const {workoutList, setWorkoutList} = useContext(WorkoutContext);
  const [video, setVideo] = useState('')
  const [name, setName] = useState('')
  const [direct, setDirect] = useState('')
  const [loading, setLoading] = useState(true)
  const history = useHistory();

  const {handleRemove, saveWorkout, savedList, setSavedList, widList, setWidList, sidList, setSidList} = useContext(SavedContext);
  const {user, setUser} = useContext(UserContext)

  type itemIdParams = {
    id: string;
  };

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
  
  const { id } = useParams<itemIdParams>();
  let vw = Number(id)
  let pos = workoutList.map(e => e.id).indexOf(vw)
  
  let cow: any = workoutList[pos]

  useEffect(() => {
    if(cow){
    setLoading(false)}
    console.log(cow)
    setVideo(cow.workout_exercises[0].exercise.video)
    setName(cow.workout_exercises[0].exercise.name)

    setTimeout(() => {
      setLoading(false)
    }, 3000)

  }, [cow])

  // templateRows='repeat(2, 4fr)' templateColumns='repeat(5, 1fr)'
  
  return (
    <Box bg='black' maxH='84vh'  position='inherit'>
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
    <Text fontSize='6xl' bg='black' color='white'>{cow.name}</Text>
          <Text fontSize='4xl' bg='black' color='white'>{cow.time} Minutes</Text>
          <Stack direction='row' spacing='10px' justify={'center'} padding='2%'>
                <Button leftIcon={<InfoOutlineIcon />} colorScheme='teal' variant='solid' onClick={() => history.push(`/${direct}`)}>
                  Back
                </Button>
                { widList.includes(cow.id) ?
                  <Button rightIcon={<IoHeartSharp />} colorScheme='teal' variant='outline' 
                    onClick={() => {
                      let dragon = widList.indexOf(cow.id)
                      handleRemove(dragon)}
                    }>
                    Saved
                  </Button>
                :
                  <Button rightIcon={<IoHeartOutline />} colorScheme='teal' variant='outline' onClick={() => saveWorkout(cow.id)}>
                    Save Workout
                  </Button> }
                </Stack>
      {cow.workout_exercises.map((info: any) => 
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
 
    </Grid>
    </Box>


  //   <Box bg='grey' w='100%'  p={4} color='white' overflowY={'scroll'} maxH={'85vh'}>
  //     {loading === false  ? '' : <Spinner size='xl' />}
  //     {cow ? 
  //       <SimpleGrid columns={1} >
  //         <Text fontSize='6xl' bg='black'>{cow.name}</Text>
  //         <Text fontSize='4xl' bg='black'>{cow.time} Minutes</Text>
  //         <Card bg='black'>
  //           <CardBody>
  //             {cow.reviews.length > 0 ? <Text fontSize='md' as='i'>"{cow.reviews[0].write_up}"</Text> : ''}
  //                      <Stack direction='row' spacing='10px' justify={'center'}>
  //               <Button leftIcon={<InfoOutlineIcon />} colorScheme='teal' variant='solid' onClick={() => history.push(`/${direct}`)}>
  //                 Back
  //               </Button>
  //               { widList.includes(cow.id) ?
  //                 <Button rightIcon={<IoHeartSharp />} colorScheme='teal' variant='outline' 
  //                   onClick={() => {
  //                     let dragon = widList.indexOf(cow.id)
  //                     handleRemove(dragon)}
  //                   }>
  //                   Saved
  //                 </Button>
  //               :
  //                 <Button rightIcon={<IoHeartOutline />} colorScheme='teal' variant='outline' onClick={() => saveWorkout(cow.id)}>
  //                   Save Workout
  //                 </Button> }
  //               </Stack>
  //             </CardBody>
  //           </Card>
  //         {/* <Center>
  //           {cow.reviews.length > 0 ? [...Array(cow.reviews[0].rating)].map((value: undefined, index: number) => (
  //             <StarIcon w={5} h={5} color='gold' key={index}/>
  //             )) : ''
  //           }
  //         </Center> 
  //         {cow.reviews.length > 0 ? <Text fontSize='md' as='i'>"{cow.reviews[0].write_up}"</Text> : ''} */}
  //       </SimpleGrid> 
  //     : '' }
  //     {loading === false && cow === undefined ?
  //       <Text>Not Available</Text> : ''}
  //     {cow ?
  //       <SimpleGrid columns={1} >
  //         <Center w='100%' bg='black'>
  //           <Box bg='black' width='800px' >
  //             <AspectRatio maxW='1000px' ratio={5 / 3}>
  //               <iframe  src={video} width="100%" title="YouTube video player" />
  //             </AspectRatio>
  //             <Text fontSize='4xl'>{name}</Text>
  //           </Box>
  //         </Center>
    

  //         </SimpleGrid> 
  //       : ''}
  //   </Box>
  // );
  );
}

export default Workout;

