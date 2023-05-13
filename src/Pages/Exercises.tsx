import React, { useEffect, useState } from 'react';
import { Card, Button, CardBody, Text, SimpleGrid, AspectRatio, Box } from '@chakra-ui/react'
import AddExercise from './ExerciseAdd';

function Exercises() {
  const [newName, setNewName] = useState(
    [{
      name: "",
      video: "",
      muscle_group: ''
    }]
  )

  const [selected, setSelected] = useState(
    {
      name: "",
      video: 'https://www.youtube.com/embed/KDEl3AmZbVE',
      muscle_group: ''
    }
  )

  function testClick() {

    console.log(newName)
  }

  function handleClick(item: {name: string,
  video: string,
  muscle_group: string}) {
    setSelected({
      name: item.name,
      video: item.video,
      muscle_group: item.muscle_group
    })
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
      <h1>Login to See Page</h1>
      <Box bg='tomato' width='600px'>
        <AspectRatio maxW='1000px' ratio={5 / 3}>
         <iframe  src={selected.video} width="100%" title="YouTube video player" />
     </AspectRatio>
      </Box>

           


      <AddExercise />
      </SimpleGrid>
      
        <Button onClick={() => testClick()}>Click Me</Button>
        {/* {newName} */}
        <h1>Exercises</h1>
        <SimpleGrid columns={3} spacing={10}>
        {
        newName.map((item) => 
        
                <Card onClick={() => handleClick(item)}>

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