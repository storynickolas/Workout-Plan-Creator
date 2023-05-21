import React, { useEffect, useState, useContext } from 'react';
import { Card, Button, CardBody, Text, SimpleGrid, AspectRatio, Input } from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'
import { UserContext } from '../User.context';

function User() {
  const [workout, setWorkout] = useState('')
  const {user, setUser} = useContext(UserContext)


  // const { username, changeUser } = useContext(UserContext);
  const history = useHistory();

  // var item_value = sessionStorage.getItem("user")


  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        console.log('Logged Out');
        sessionStorage.setItem('user', 'Tom')
        setUser(null)
      }
    });
    history.push(`/login`);
  }

  return (
    <div className="App">
      <header className="App-header">
        <Text>{sessionStorage.getItem("user")}</Text>
        <Button onClick={() => console.log( sessionStorage.getItem('user_id'))}>User Info</Button>
        <Input placeholder='Back and ...' onChange={(e) => setWorkout(e.target.value)}/>
        {/* <Button onClick={() => changeUser(workout)}>Click Me</Button> */}
        <Button onClick={() => handleLogoutClick()}>Log Out</Button>
        <h3>Test</h3>
      </header>
    </div>
  );
}

export default User;