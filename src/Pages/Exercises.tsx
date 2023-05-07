import React, { useEffect, useState } from 'react';
import { Card, Button, CardBody, Text, SimpleGrid, } from '@chakra-ui/react'

function Exercises() {
  const [newName, setNewName] = useState(
    [{
      name: "",
      video: "",
      muscle_group: ''
    }]
  )

  function testClick() {

    console.log(newName)
  }


  useEffect(() => {
    fetch("http://localhost:3000/exercises").then((response) => {
      if (response.ok) {
        response.json().then((user) => 
        {
          setNewName(user)
        });
      }
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
      <SimpleGrid columns={1} spacing={10}>
      {/* <h1>Login to See Page</h1>
      <AspectRatio maxW='560px' ratio={1}> */}

{/* <iframe width="560" height="315" src="https://www.youtube.com/embed/roCP6wCXPqo" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" ></iframe> */}
      {/* </AspectRatio> */}
      </SimpleGrid>
        <Button onClick={() => testClick()}>Click Me</Button>
        {/* {newName} */}
        <h1>Exercises</h1>
        <SimpleGrid columns={3} spacing={10}>
        {
        newName.map((item) => 
                <Card >
                <CardBody>
                  <Text fontSize='2xl'>{item.name}</Text>
                  </CardBody>
                </Card>
       )}
       </SimpleGrid>
      </header>
    </div>
  );
}

export default Exercises;