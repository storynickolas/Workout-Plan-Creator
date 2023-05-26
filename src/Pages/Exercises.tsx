import React, { useEffect, useState } from 'react';
import { Card, Button, CardBody, Text, SimpleGrid, AspectRatio, Box, Center, Input, Flex } from '@chakra-ui/react'
import AddExercise from './ExerciseAdd';

function Exercises() {
  const [search, setSearch] = useState('')
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

  const [searched, setSearched] = useState(
    [{
      name: "",
      video: "",
      muscle_group: ''
    }]
  )

  const [sgroup, setSgroup] = useState("All")

  const [selected, setSelected] = useState(
    {
      name: "",
      video: '',
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

  const groups = ["All", "Back", "Biceps", "Triceps", "Shoulders", "Chest", "Legs", "Abs"]

  function sortGroup(item: string) {
    if(item === 'All'){
      setSgroup(item)
      setSearched([...newName])
    setSorted([...newName])
    }
    else{
      setSgroup(item)
    let newList = [...newName]
    newList = newList.filter(function(listItem) {return listItem.muscle_group === item})
    setSearched([...newList])
    setSorted([...newList])
    }
    
  }

  useEffect(() => {
    fetch("/exercises").then((response) => {
      if (response.ok) {
        response.json().then((user) => 
        {
          console.log(user)
          setNewName(user)
          setSorted(user)
          setSearched(user)
          // handleClick(user[0])
        })
      }
    });
  }, []);


  useEffect(() => {
    console.log(sgroup)
    if(sgroup === 'All'){
      let newList = [...newName]
      newList = newList.filter(function(item) { return item.name.toUpperCase().includes(search.toUpperCase()) === true})
 
    setSearched(newList)
    }
    else{
      let newList = [...sorted]
      newList = newList.filter(function(item) { return item.name.toUpperCase().includes(search.toUpperCase()) === true})
 
    setSearched(newList)
    }
  }, [search]);

  return (
    <Box bg='grey' w='100%' h='100%' minH='100vh' p={4} color='white'>
        <Text fontSize='4xl'>Exercises</Text>
      <SimpleGrid columns={1} >
        <Center >
        <Box bg='tomato' width='600px' onClick={() => console.log(selected)}>
          {selected.video === '' ? <Box minH={'30vh'}><Text>Select an Exercise</Text></Box> : <Box>
          <AspectRatio maxW='1000px' ratio={5 / 3}>
          <iframe  src={selected.video} width="100%" title="YouTube video player" />
          </AspectRatio>
          <Text fontSize='2xl'>{selected.name}</Text></Box>
          }
           
        </Box>
        </Center>

        <Input placeholder='Search...' bgColor={'white'} color='teal' onChange={(e) => setSearch(e.target.value)}/>
        
      </SimpleGrid>
        <SimpleGrid minChildWidth='75px' spacing='10px'>
        {
          groups.map((item) => 
        <Button colorScheme='teal'  onClick={() => sortGroup(item)} isActive={item === sgroup} >
          {item}
        </Button>
          )
      }
      </SimpleGrid>
        <SimpleGrid minChildWidth='200px' spacing='10px'>
        {
          searched.map((item) => 
            <Card onClick={() => handleClick(item)} cursor='pointer' alignContent={'center'} justifyContent={'center'}>
              
              <Flex>
              <CardBody > 
                
                <Text fontSize='2xl'>{item.name}</Text>
              </CardBody>
              </Flex>
            </Card>
       )}
       </SimpleGrid>
       <AddExercise />
    </Box>
  );
}

export default Exercises;