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

  const [sorted, setSorted] = useState(
    [{
      name: "",
      video: "",
      muscle_group: ''
    }]
  )

  const [sgroup, setSgroup] = useState("")

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
    console.log({
      name: item.name,
      video: item.video,
      muscle_group: item.muscle_group
    })
    setSelected({
      name: item.name,
      video: item.video,
      muscle_group: item.muscle_group
    })
  }

  const groups = ["Back", "Biceps", "Triceps", "Shoulders", "Chest", "Legs", "Cardio"]

  function sortGroup(item: string) {
    let newList = [...newName]
    newList = newList.filter(function(listItem) {return listItem.muscle_group === item})
    setSorted([...newList])
  }

  useEffect(() => {
    fetch("/exercises").then((response) => {
      if (response.ok) {
        response.json().then((user) => 
        {
          console.log(user)
          setNewName(user)
          setSorted(user)
          // handleClick(user[0])
        })
      }
    });
  }, []);

  return (
    <Box bg='grey' w='100%' h='100%' minH='100vh' p={4} color='white'>
      <SimpleGrid columns={1} >
        <Center >
        <Box bg='tomato' width='600px' onClick={() => console.log(selected)}>
          <AspectRatio maxW='1000px' ratio={5 / 3}>
          <iframe  src={selected.video} width="100%" title="YouTube video player" />
          </AspectRatio>
          <Text fontSize='2xl'>{selected.name}</Text>
           
        </Box>
        </Center>
        <Button colorScheme='teal' variant='outline' onClick={() => console.log(sorted)} >
          Test
        </Button>
        
      </SimpleGrid>


        <Text fontSize='4xl'>Exercises</Text>
       
        <SimpleGrid minChildWidth='75px' spacing='10px'>
        {
          groups.map((item) => 
        <Button colorScheme='teal' variant='outline' onClick={() => sortGroup(item)} >
          {item}
        </Button>
          )
      }
      </SimpleGrid>
        <SimpleGrid minChildWidth='200px' spacing='10px'>
          
        {
          sorted.map((item) => 
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