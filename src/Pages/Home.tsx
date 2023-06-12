import { Box, Text } from '@chakra-ui/react'
import WorkoutLists from '../Components/WorkoutList';


function Home() {

  let newLength = 3;

  return (
    <Box >
      <Box className="Home" >
        <Box w='100%' h='100vh' p={4} color='white' position='fixed' >
          <Text fontSize='4xl'>Featured Workouts</Text>
          <Box >
            <WorkoutLists newLength={ newLength }></WorkoutLists>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Home;
