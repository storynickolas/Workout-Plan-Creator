import React, { useEffect, useState, useContext } from 'react';
import { Card, Button, CardBody, Text, SimpleGrid, AspectRatio } from '@chakra-ui/react'
import { CurrentUserContext } from '../App'

function User() {

  const user = useContext(CurrentUserContext);

  return (
    <div className="App">
      <header className="App-header">
        <Button onClick={() => console.log(user)}>Click Me</Button>
        <h3>Test</h3>
      </header>
    </div>
  );
}

export default User;