import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@chakra-ui/react'


function Navbar() {

  return (
    <div>
      <Link to={`/`} >
      <Button 
      >Home</Button>
      </Link>
      <Button>
      <Link to={`/workouts`} >Workouts</Link>
      </Button>
      <Button>
      <Link to={`/exercises`} >Exercises</Link>
      </Button>
      <Button>
      <Link to={`/newProgram`}>Add A Workout</Link>
      </Button>
      <Button>
      <Link to={`/myPage`} >My Page</Link>
      </Button>
    </div>
  );
}

export default Navbar;