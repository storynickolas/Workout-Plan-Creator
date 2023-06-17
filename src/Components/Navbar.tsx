import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button, Box } from '@chakra-ui/react'
import { UserContext } from '../Context/User.context';
import { useHistory } from 'react-router-dom'


function Navbar() {
  const {user} = useContext(UserContext)

  const history = useHistory();

  return (
    <Box bg='white' minH='5vh' position='sticky'>
      <Button >
        <Link to={`/`} >Home</Link>
      </Button>
      <Button>
        <Link to={`/workouts`} >Workouts</Link>
      </Button>
      <Button>
        <Link to={`/exercises`} >Exercises</Link>
      </Button>
      <Button>
        <Link to={`/newProgram`}>Add A Workout</Link>
      </Button>
      {user.id !== 0 ?
      <Button>
        <Link to={`/myPage`}>My Page</Link>
      </Button>
      :
      <Button>
        <Link to={`/login`} >Login</Link>
      </Button>}
    </Box>
  );
}

export default Navbar;