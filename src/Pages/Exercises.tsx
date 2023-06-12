import { useState, useContext } from 'react';
import { Card, Button, CardBody, Text, SimpleGrid, AspectRatio, Box, Center, Input, Flex } from '@chakra-ui/react'
import { ExerciseContext } from '../Context/Exercise.context';

function Exercises() {

  const {setSearch, groups, sgroup, setSgroup, searched, search} = useContext(ExerciseContext);

  const [selected, setSelected] = useState(
    {
      name: "Dumbbell Row",
      video: 'https://www.youtube.com/embed/roCP6wCXPqo',
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
    <Box bg='black' w='100%' position='inherit'>
      <Text color='white' fontSize='5xl' as='u'>Exercises</Text>
    <Box bg='black' w='100%' p={4} color='white'  overflowY={'scroll'} maxH={'75vh'}>
      <Box w='100%' bg='black' h='25px'></Box>
      <SimpleGrid columns={1} >
        <Center w='100%' bg='black'>
        <Box bg='teal' width='600px'>
      

          <Box minH={'30vh'} >
          <AspectRatio maxW='1000px' ratio={5 / 3}>
          <iframe  src={selected.video} width="100%" title="YouTube video player" />
          </AspectRatio>
          </Box>
           <Text fontSize='3xl' bg='black'>{selected.name}</Text>  
        </Box>
        </Center>

        <Box minH={'5vh'}>
      </Box>
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
      <Box>
      <Input placeholder='Search...' bgColor={'white'} color='teal' onChange={(e) => setSearch(e.target.value)} defaultValue={search}/>
      </Box>
        <SimpleGrid
        background='grey'
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
    </Box>
  );
}

export default Exercises;