import React, { useEffect, useState, useContext } from 'react';
import { Card, Button, CardBody, Text, SimpleGrid, AspectRatio } from '@chakra-ui/react'
import { CurrentUserContext } from '../App'
import { useHistory } from 'react-router-dom'

function User() {

  const user = useContext(CurrentUserContext);
  const history = useHistory();
  

  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        console.log('Logged Out');
      }
    });
    history.push(`/login`);
  }

  return (
    <div className="App">
      <header className="App-header">

        <Button onClick={() => console.log(user)}>Click Me</Button>
        <Button onClick={() => handleLogoutClick()}>Log Out</Button>
        <h3>Test</h3>
      </header>
    </div>
  );
}

export default User;