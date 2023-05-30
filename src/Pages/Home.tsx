import { Box, Text } from '@chakra-ui/react'
import WorkoutLists from '../WorkoutList';

function Home() {

  let newLength = 3;

  return (
    <div >
      <header className="Home">
        <Box w='100%' p={4} color='white'>
          <Text fontSize='4xl'>Featured Workouts</Text>
          <Box >
            <WorkoutLists newLength={ newLength }></WorkoutLists>
          </Box>
        </Box>
      </header>
    </div>
  );
}

export default Home;
