import React, { useEffect, useState } from 'react';
import { FormControl, Button, FormLabel, Input, SimpleGrid, Card, CardBody, Text, Switch, Box, Center, HStack, VStack, StackDivider, Divider} from '@chakra-ui/react'
// import AddButton from '../AddButton';
import { Modal, ModalOverlay, ModalContent, ModalBody, ModalHeader, ModalCloseButton, ModalFooter, useDisclosure} from '@chakra-ui/react'


function NewProgram() {
  const [moving, setMoving] = useState('')
  const [list, setList] = useState< string[] | [] >([])
  const [selected, setSelected] = useState< (string | boolean)[] | [] >([])
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [workout, setWorkout] = useState('')
  const [time, setTime] = useState('')
  const [newW, setNewW] = useState({name: '', time: 0})

  const [clicked, setClicked] = useState(false)


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

  useEffect(() => {
    fetch("/exercises").then((response) => {
      if (response.ok) {
        response.json().then((user) => 
        {
          setNewName(user)
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
          console.log(response)
        }
      })


    // console.log(cow)
    // setNewW(cow)
    setClicked(true)
    onClose()

  }

  return (
    <Box bg='grey' w='100%' h='100%' minH={'100vh'} p={4} color='white'>
      {clicked ? '': <Button onClick={onOpen}>Add a Workout</Button>}
      {clicked ? <Text fontSize='6xl'>{newW.name}</Text> : ''}
      {clicked ? <Text fontSize='4xl'>{newW.time} minutes</Text> : ''}
      {/* <Button onClick={() => console.log(selected)}>Test Button</Button> */}

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


      <VStack
  divider={<StackDivider borderColor='gray.200' />}
  spacing={4}
  align='stretch'
>

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
      
      </VStack>

      {clicked ? <Card minWidth='90%'><div className='Drop' onDragOver={handleOver} onDrop={dropIt} >Add an Exercise</div></Card> : ''}





        <Text fontSize={'4xl'}>Exercises</Text>
        <SimpleGrid columns={3} spacing={10}>
        {
        newName.map((item, index) => 
        <Card backgroundColor={selected[index] === true ? 'white' : 'grey'} >
        <CardBody>
          <Text fontSize='2xl'  draggable={selected[index] === true ? true : false} onDrag={() => setMoving(newName[index].name)}>{item.name}</Text>
          </CardBody>
        </Card>
       )}
       </SimpleGrid>
       
    </Box>
  );
}

export default NewProgram;