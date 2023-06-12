import { Text, Box } from '@chakra-ui/react'
import WorkoutLists from "../Components/WorkoutList"

function Workouts( ) {

  let newLength = 0

  return (
    <Box bg='grey'  w='100%' position='inherit'>
        <Text color='white' as="u" fontSize='5xl' >All Workouts</Text>
      <WorkoutLists newLength={newLength} ></WorkoutLists>
    </Box>
  );
}

export default Workouts;
