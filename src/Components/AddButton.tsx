import React, { useState, useContext } from 'react';
import { FormControl, Button, FormLabel, Input, Modal, ModalOverlay, ModalContent, ModalBody, ModalHeader, ModalCloseButton, ModalFooter, useDisclosure} from '@chakra-ui/react'
import { WorkoutContext } from '../Context/Workout.context';


function AddButton({ handleNew } : {handleNew : (response: {id: number, name: string, time: number, user_id: number}) => void}) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const {workoutList, setWorkoutList, myWorkouts, setMyWorkouts} = useContext(WorkoutContext);

  const [workout, setWorkout] = useState('')
  const [time, setTime] = useState('')



  function handleSave() {
    let browserUser = Number(sessionStorage.getItem('user_id'))
    let newProgram = {
      name: workout,
      time: Number(time),
      user_id: browserUser
    }
    fetch(`/workouts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(newProgram),
    })
      .then((response) => response.json())
      .then((response) => {
        if(response.errors){
          // setStatus(response.errors)
          console.log(response.errors)
        }
        else {

          let allWorkouts = [...workoutList]
          allWorkouts.push(response)
          let userCreated = [...myWorkouts]
          userCreated.push(response)
          setMyWorkouts([...userCreated])
          setWorkoutList([...allWorkouts])
          handleNew(response)

        }
      })
    onClose()

  }


  return (
    <>

      <Button onClick={onOpen} color='black'>Get Started Here</Button>

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
    </>
  )
}

export default AddButton
