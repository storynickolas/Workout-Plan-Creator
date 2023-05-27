import React, { useEffect, useState, useContext } from 'react';
import { Button, Input, Card, CardBody, Text, Switch, Box, Center, HStack, Flex, Table, Thead, Tr, Td, Th, Tbody, Heading, Select, Grid, GridItem} from '@chakra-ui/react'
import AddButton from '../AddButton';

import { ExerciseContext } from '../Exercise.context';



function NewProgram() {

  const {exercises, setSearch, groups, sgroup, setSgroup, searched, allExercises, selected, setSelected} = useContext(ExerciseContext);

  const [moving, setMoving] = useState('')
  const [list, setList] = useState< string[]>([''])



  const [newW, setNewW] = useState({name: '', time: 0})

  const [clicked, setClicked] = useState(false)


  function handleOver(e: React.ChangeEvent<any>) {
    e.preventDefault()
  }

  function dropIt(e: React.ChangeEvent<any>) {
    e.preventDefault()
    let donkey = [...list]
    if(donkey[0] === ''){
      donkey[0] = moving
    }
    else{
      donkey.push(moving)
    }
    
    setList(donkey)


    const pos = searched.map(e => e.name).indexOf(moving)
    console.log(pos)
    let giraffe = [...selected]
    giraffe[pos] = moving
    setSelected([...giraffe])
  }


  function moreStuff(item: string) {
    console.log(list)
    let snail = [...list]
    let fish = snail.filter(word => word !== item)
     setList(fish)

    const pos = searched.map(e => e.name).indexOf(item)
    let giraffe = [...selected]
    giraffe[pos] = false
    setSelected(giraffe)
  }

  function handleNew(myData: {name: string, time: number}) {
    console.log(myData)
    setNewW(myData)
    setClicked(true)
  }


  return (
    <Box bg='grey' w='100%' h='100%' minH={'100vh'} p={4} color='white'>
      
      <Grid
        h='200px'
        templateRows='repeat(2, 1fr)'
        templateColumns='repeat(5, 1fr)'
        gap={4}
      >
        <GridItem rowSpan={2} colSpan={1} bg='tomato' minH='80vh'>


          <Box padding={4}>
            <Heading>Exercises</Heading>
            <Input placeholder='Search...' bgColor={'white'} color='teal' onChange={(e) => setSearch(e.target.value)}/>
            <Box overflowY="auto" maxHeight="60vh">
              <Table variant="simple" colorScheme="teal">
                <Thead position="sticky" top={0} bgColor="grey">
                  <Select onChange={(e) =>  setSgroup(e.target.value)}>
                    {
                      groups.map((item: string) => 
                        <option value={item} >{item}</option>
                      )
                    }
                  </Select>
                </Thead>
                <Tbody >
                { 
                allExercises.map((item: {name: string}, index) => 
                searched.map(e => e.name).indexOf(item.name) !== -1 ? 
                  <Tr backgroundColor={selected[index] === true ? 'teal' : 'grey'} >
                    <Td>
                      <Text 
                        fontSize='2xl'  
                        draggable={selected[index] === true ? true : false} 
                        onDrag={() => setMoving(searched[index].name)}
                        >{item.name}
                      </Text>
                    </Td>
                  </Tr> : ''
                )}
                </Tbody>
              </Table>
            </Box>
          </Box>

          
        </GridItem>
        <GridItem rowSpan={2} colSpan={4} bg='tomato' >
          {clicked ? <Text fontSize='6xl'>{newW.name}</Text> : ''}
          {clicked ? <Text fontSize='4xl'>{newW.time} minutes</Text> : ''}
  {
      list[0] === '' ? '' : list.map((item) => 
        <Card maxH='200px' >

        <CardBody >
          <Center >
           <HStack spacing={8}>
          <Text fontSize='xl'>{item}</Text>

            <Text fontSize='sm'>Reps</Text>
            <Input defaultValue={12} width={'50px'}></Input>
            <Text fontSize='sm'>Sets</Text>
            <Input defaultValue={4} width={'50px'}></Input>

          <Text fontSize='md'>Confirm:   <Switch size='lg' /></Text>
          <Button onClick={() => moreStuff(item)}>Remove</Button>
              </HStack>
              </Center>
          </CardBody>

        </Card>
      )}
      


      {clicked ? <Card minWidth='90%'><div className='Drop' onDragOver={handleOver} onDrop={dropIt} >Add an Exercise</div></Card> : ''}


{  newW.name === '' ?    <Flex
      flexDirection="column"
      width="100wh"
      height="80vh"
      bgColor='tomato'

      justifyContent="center"
      alignItems="center"
    >
      <Box minW='30vw' 
        p="1rem"
        backgroundColor="white"
      >
<Text color='teal' fontSize='3xl'>Click Below to Create A Workout</Text>
{clicked ? '': <AddButton handleNew={handleNew}/>}
              </Box>
        </Flex>

: ''
}
  </GridItem>
</Grid>
</Box>
  );
}

export default NewProgram;
