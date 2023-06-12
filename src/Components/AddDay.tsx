import React, { useState } from 'react';
import { FormControl, Button, FormLabel, Input, Modal, ModalOverlay, ModalContent, ModalBody, ModalHeader, ModalCloseButton, ModalFooter, useDisclosure} from '@chakra-ui/react'

function AddDay() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const [workout, setWorkout] = useState('')
  const [time, setTime] = useState('')



  function handleSave() {
    // let lizard = Number(sessionStorage.getItem('user_id'))
    // let cow = {
    //   name: workout,
    //   time: Number(time),
    //   user_id: lizard
    // }
    // console.log(cow)
    // fetch(`/workouts`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     "Accept": "application/json",
    //   },
    //   body: JSON.stringify(cow),
    // })
    //   .then((response) => response.json())
    //   .then((response) => {
    //     if(response.errors){
    //       // setStatus(response.errors)
    //       console.log(response.errors)
    //     }
    //     else {
    //       // setStatus(['Successfully Added'])
    //       // dispatch(addBeer(response));
    //       console.log(cow)
    //       console.log(response)
    //       handleNew(response)

    //     }
    //   })
    console.log(workout)
    onClose()

  }


  return (
    <>

      <Button onClick={onOpen}>Add a Workout</Button>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Name Favorite Dinosaur</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Workout Name</FormLabel>
              <Input placeholder='Back and ...' onChange={(e) => setWorkout(e.target.value)}/>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel> Number of birds outside</FormLabel>
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

export default AddDay

// function AddDay({ handleNew } : {handleNew : (response: {id: number, name: string, time: number, user_id: number}) => void}) 