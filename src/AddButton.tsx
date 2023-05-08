import React, { useEffect, useState } from 'react';
import { FormControl, Button, FormLabel, Input, Modal, ModalOverlay, ModalContent, ModalBody, ModalHeader, ModalCloseButton, ModalFooter, useDisclosure} from '@chakra-ui/react'

function AddButton() {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Button onClick={onOpen}>Add a Workout</Button>

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
              <Input placeholder='Back and ...' />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Length of Workout (Minutes)</FormLabel>
              <Input placeholder='60' />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3}>
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