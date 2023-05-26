import React, { useEffect, useState } from 'react';
import { FormControl, Button, FormLabel, Input, SimpleGrid, Card, CardBody, Text, Switch, Box, Center, HStack, VStack, StackDivider, Flex, Table, Thead, Tr, Td, Th, Tbody, Heading, Select, Grid, GridItem} from '@chakra-ui/react'
// import AddButton from '../AddButton';
import { Modal, ModalOverlay, ModalContent, ModalBody, ModalHeader, ModalCloseButton, ModalFooter, useDisclosure} from '@chakra-ui/react'


function NewProgram() {
  const [moving, setMoving] = useState('')
  const [list, setList] = useState< string[] | [] >([])
  const [selected, setSelected] = useState< (string | boolean)[] | [] >([])
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [search, setSearch] = useState('')

  const [workout, setWorkout] = useState('')
  const [time, setTime] = useState('')
  const [newW, setNewW] = useState({name: '', time: 0})

  const [clicked, setClicked] = useState(false)

  const groups = ["All", "Back", "Biceps", "Triceps", "Shoulders", "Chest", "Legs", "Abs"]


  function handleOver(e: React.ChangeEvent<any>) {
    e.preventDefault()
  }

  function dropIt(e: React.ChangeEvent<any>) {
    e.preventDefault()
    let donkey = [...list]
    donkey.push(moving)
    setList(donkey)


    const pos = newName.map(e => e.name).indexOf(moving)
    console.log(pos)
    let giraffe = [...selected]
    giraffe[pos] = moving
    setSelected([...giraffe])
  }

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

  useEffect(() => {
    fetch("/exercises").then((response) => {
      if (response.ok) {
        response.json().then((user) => 
        {
          setNewName(user)
          setSearched(user)
          setSorted(user)
        }).then(() => {
          const res = [...Array(newName.length)].map(() => true)
          setSelected(res)
        }
        );
      }
    });
  }, [newName.length]);

  function moreStuff(item: string) {
    console.log(list)
    let snail = [...list]
    let fish = snail.filter(word => word !== item)
     setList(fish)

    const pos = newName.map(e => e.name).indexOf(item)
    let giraffe = [...selected]
    giraffe[pos] = true
    setSelected(giraffe)
  }

  function handleSave() {
    let cow = {
      name: workout,
      time: Number(time)
    }
    console.log(cow)
    fetch(`/workouts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(cow),
    })
      .then((response) => response.json())
      .then((response) => {
        if(response.errors){
          // setStatus(response.errors)
          console.log(response.errors)
        }
        else {
          // setStatus(['Successfully Added'])
          // dispatch(addBeer(response));
          setNewW(response)

        }
      })
    setClicked(true)
    onClose()

  }

  ////////////////////////////////////////////

 

  const [sgroup, setSgroup] = useState("All")

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
    <Box bg='grey' w='100%' h='100%' minH={'100vh'} p={4} color='white'>
     
      <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add your Workout</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Workout Name</FormLabel>
              <Input placeholder='Back and ...' onChange={(e) => setWorkout(e.target.value)}/>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Length of Workout (Minutes)</FormLabel>
              <Input placeholder='60' onChange={(e) => setTime(e.target.value)}/>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={handleSave}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>


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
                  <Select onChange={(e) =>  sortGroup(e.target.value)}>
                    {
                      groups.map((item) => 
                        <option value={item} >{item}</option>
                      )
                    }
                  </Select>
                </Thead>
                <Tbody >
                {
                searched.map((item, index) => 
                  <Tr backgroundColor={selected[index] === true ? 'teal' : 'grey'} >
                    <Td>
                      <Text 
                        fontSize='2xl'  
                        draggable={selected[index] === true ? true : false} 
                        onDrag={() => setMoving(newName[index].name)}>{item.name}
                      </Text>
                    </Td>
                  </Tr>
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
      list.map((item) => 
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


{  workout === '' ?    <Flex
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
{clicked ? '': <Button onClick={onOpen}>Add a Workout</Button>}
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
