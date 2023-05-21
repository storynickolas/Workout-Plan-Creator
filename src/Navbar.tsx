import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@chakra-ui/react'
// import { CurrentUserContext } from './App'
import { UserContext } from './User.context';




function Navbar() {
  const {user, setUser} = useContext(UserContext)




  useEffect(() => {
      console.log(user)
    }, [user, ]);

    

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
      {user !== 'Tom' ?
      <Button>
      <Link to={`/myPage`} >My Page</Link>
      </Button>
      :
      <Button>
      <Link to={`/login`} >Login</Link>
      </Button>}
    </div>
  );
}

export default Navbar;