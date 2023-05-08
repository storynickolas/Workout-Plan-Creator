import React, { useEffect, useState } from 'react';
import { FormControl, Button, FormLabel, Input, SimpleGrid, Card, CardBody, Text, Switch} from '@chakra-ui/react'
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
    fetch("http://localhost:3000/exercises").then((response) => {
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
    setNewW(cow)
    onClose()

  }

  return (
    <div className="App">
      <header className="App-header">
      <Button onClick={onOpen}>Add a Workout</Button>
      <Button onClick={() => console.log(selected)}>Test Button</Button>

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
    {
      list.map((item) => 
        <Card w='80%' maxH='200px'>
        <CardBody>
          <Text fontSize='lg'>{item}</Text>
          <SimpleGrid columns={2} spacing={0}>
            <Text fontSize='sm'>Reps</Text>
            <Input defaultValue={12} size='sm'></Input>
            <Text fontSize='sm'>Sets</Text>
            <Input defaultValue={4} size='sm'></Input>
          </SimpleGrid>
          <Text fontSize='md'>Confirm:   <Switch size='lg' /></Text>
          <Button onClick={() => moreStuff(item)}>Remove</Button>
          </CardBody>
        </Card>
      )}
        <h1>Exercises</h1>
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
       <div className='Drop' onDragOver={handleOver} onDrop={dropIt}>Add a Workout</div>
       </header>
    </div>
  );
}

export default NewProgram;