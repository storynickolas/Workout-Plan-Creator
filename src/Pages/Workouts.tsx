import { Text, Box } from '@chakra-ui/react'
import WorkoutLists from "../WorkoutList"

function Workouts( ) {

  let newLength = 0

  return (
    <Box bg='grey' h='100%' minH='100vh' w='100%'>
      <Text color='white' fontSize='6xl'>All Workouts</Text>
      <WorkoutLists newLength={newLength} ></WorkoutLists>
    </Box>
  );
}

export default Workouts;
