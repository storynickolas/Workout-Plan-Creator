import { useState } from 'react';
import { FormControl, Button, UnorderedList, ListItem, FormLabel, Input, Modal, ModalOverlay, ModalContent, ModalBody, ModalHeader, ModalCloseButton, ModalFooter, useDisclosure} from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'

function EditButton({ item } : any) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [workout, setWorkout] = useState(item.name)
  const [time, setTime] = useState(item.time)

  const history = useHistory();

  console.log(item)

  function handleSave() {
    let lizard = Number(sessionStorage.getItem('user_id'))
    let cow = {
      name: workout,
      time: Number(time),
      user_id: lizard
    }

  

    fetch(`/workouts/${item.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(cow),
    })
      .then((response) => response.json())
      .then((response) => {
        // dispatch(revise(response));
        // history.push(`/mypage`);
      })

    onClose()

  }


  return (
    <>
      <Button onClick={onOpen}>Edit Workout</Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add your Workout</ModalHeader>
          <Button onClick={() => console.log(item)}></Button>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Workout Name</FormLabel>
              <Input defaultValue={item.name} onChange={(e) => setWorkout(e.target.value)}/>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Length of Workout (Minutes)</FormLabel>
              <Input defaultValue={item.time} onChange={(e) => setTime(e.target.value)}/>
            </FormControl>
            <FormLabel>Exercises</FormLabel>
            <UnorderedList>
            {item.workout_exercises.map((ex : any) => 
              <ListItem>{ex.exercise.name}</ListItem>
            )}
            </UnorderedList>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={() => history.push(`/workouts/${item.id}/edit`, {item})}>
              Edit Exercises
            </Button>
            <Button colorScheme='blue' mr={3} onClick={handleSave}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default EditButton