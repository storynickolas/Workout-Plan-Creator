import React, { useEffect, useState } from 'react';
import { Card, Button, CardBody, Text, SimpleGrid, AspectRatio, Box, Center } from '@chakra-ui/react'
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
          handleClick(user[0])
        })
      }
    });
  }, []);

  return (
    <Box bg='grey' w='100%' h='100vh' p={4} color='white'>
      <SimpleGrid columns={1} >
        <Center >
        <Box bg='tomato' width='600px' >
          <AspectRatio maxW='1000px' ratio={5 / 3}>
          <iframe  src={selected.video} width="100%" title="YouTube video player" />
          </AspectRatio>
          <Text fontSize='2xl'>{selected.name}</Text>
        </Box>
        </Center>
      </SimpleGrid>
        <Text fontSize='4xl'>Exercises</Text>
        <SimpleGrid minChildWidth='200px' spacing='10px'>
        {
          newName.map((item) => 
            <Card onClick={() => handleClick(item)} cursor='pointer'>
              <CardBody> 
                <Text fontSize='2xl'>{item.name}</Text>
              </CardBody>
            </Card>
       )}
       </SimpleGrid>
       <AddExercise />
    </Box>
  );
}

export default Exercises;