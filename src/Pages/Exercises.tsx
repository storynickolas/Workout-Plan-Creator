import React, { useEffect, useState, useContext } from 'react';
import { Card, Button, CardBody, Text, SimpleGrid, AspectRatio, Box, Center, Input, Flex, Grid } from '@chakra-ui/react'

import { ExerciseContext } from '../Exercise.context';


function Exercises() {
  // const [search, setSearch] = useState('')

  const {exercises, setSearch, groups, sgroup, setSgroup, searched, search} = useContext(ExerciseContext);

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
      setSelected({
        name: item.name,
        video: item.video,
        muscle_group: item.muscle_group
      })
    }

  //////////////////////////////////////

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

        <Input placeholder='Search...' bgColor={'white'} color='teal' onChange={(e) => setSearch(e.target.value)} defaultValue={search}/>
        
      </SimpleGrid>
        <SimpleGrid minChildWidth='75px' spacing='10px' >
        {
          groups.map((item) => 
        <Button colorScheme='teal'  onClick={() => setSgroup(item)} isActive={item === sgroup} >
          {item}
        </Button>
          )
      }
      </SimpleGrid>
        <SimpleGrid
        background='teal'
         maxH='40vh' gridAutoColumns='minmax(200px, 100px)' autoFlow='column' overflowX={'auto'} padding={10} gap={6}>

         
        {
          searched.map((item) => 
            <Card minH='25vh' maxW='200px' onClick={() => handleClick(item)} cursor='pointer' alignContent={'center'} justifyContent={'center'}>
              
              <Flex>
              <CardBody > 
                
                <Text fontSize='2xl'>{item.name}</Text>
              </CardBody>
              </Flex>
            </Card>
       )}

       </SimpleGrid>

    </Box>
  );
}

export default Exercises;