import React, { useEffect, useState, useContext } from 'react';
import { Drawer, useDisclosure, Text, DrawerOverlay, Button, DrawerContent, DrawerHeader, DrawerBody, DrawerCloseButton, Input, DrawerFooter} from '@chakra-ui/react'

function AddExercise() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [newName, setNewName] = useState('')
  const [video, setVideo] = useState('')
  const [group, setGroup] = useState('')
  return (
    <>
      <Button colorScheme='teal' onClick={onOpen}>
        Add an Exercise
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Add an Exercise</DrawerHeader>

          <DrawerBody>
            <Text mb='8px'>Name:</Text>
            <Input placeholder='Name'  onChange={(e) => setNewName(e.target.value)}/>
            <Text mb='8px'>Muscle Group:</Text>
            <Input placeholder='Primary Muscle Group'  onChange={(e) => setGroup(e.target.value)}/>
            <Text mb='8px'>Video URL:</Text>
            <Input placeholder='Video URL'  onChange={(e) => setVideo(e.target.value)}/>
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue' onClick={() => console.log(newName)}>Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default AddExercise;