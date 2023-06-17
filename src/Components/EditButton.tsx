import { useState, useContext } from 'react';
import { FormControl, Button, UnorderedList, ListItem, FormLabel, Input, Modal, ModalOverlay, ModalContent, ModalBody, ModalHeader, ModalCloseButton, ModalFooter, useDisclosure} from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'
import { WorkoutContext } from '../Context/Workout.context';


function EditButton({ item } : any) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [workout, setWorkout] = useState(item.name)
  const [time, setTime] = useState(item.time)

  const history = useHistory();

  const {myWorkouts, setMyWorkouts} = useContext(WorkoutContext)

  function handleSave() {
    let browserUser = Number(sessionStorage.getItem('user_id'))
    let editedProgram = {
      name: workout,
      time: Number(time),
      user_id: browserUser
    }

    fetch(`/workouts/${item.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(editedProgram),
    })
      .then((response) => response.json())
      .then((response) => {
        let usersWs = [...myWorkouts]
        let editedW = usersWs.findIndex(item => item.id === response[0].id)
        usersWs[editedW] = response[0]
        setMyWorkouts([...usersWs])
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
            {item.workout_exercises.map((ex : any, index: number) => 
              <ListItem key={ex.id+ex.exercise.name+index}>{ex.exercise.name}</ListItem>
            )}
            </UnorderedList>
             <Button colorScheme='blue' mr={3} onClick={() => history.push(`/workouts/${item.id}/edit`, {item})}>
              Edit Exercises
            </Button>
          </ModalBody>

          <ModalFooter>
      
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