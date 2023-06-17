import { useContext } from 'react';
import { Button, Box } from '@chakra-ui/react'
import { UserContext } from '../Context/User.context';
import { useHistory } from 'react-router-dom'


function Navbar() {
  const {user} = useContext(UserContext)

  const history = useHistory();

  return (
    <Box bg='white' minH='5vh' position='sticky'>
      <Button onClick={() => history.push('/')}>Home</Button>
      <Button onClick={() => history.push('/workouts')}>Workouts</Button>
      <Button onClick={() => history.push('/exercises')}>Exercises</Button>
      <Button onClick={() => history.push('/newProgram')}>Add A Workout</Button>
      {user.id !== 0 ?
      <Button onClick={() => history.push('/myPage')}>MyPage</Button>
      :
      <Button onClick={() => history.push('/login')}>Login</Button>}
    </Box>
  );
}

export default Navbar;