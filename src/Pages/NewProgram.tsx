import React, { useEffect, useState } from 'react';
import { FormControl, Button, FormLabel, Input, FormHelperText, } from '@chakra-ui/react'

function NewProgram() {
  const [show, setShow] = useState(false)
  const [moving, setMoving] = useState('')
  const [myCow, setMyCow] = useState('Add A Cow')

  let cows = ['cow1', 'cow2', 'cow3']

  function handleOver(e: React.ChangeEvent<any>) {
    e.preventDefault()
  }

  function dropIt(e: React.ChangeEvent<any>) {
    e.preventDefault()
    setMyCow(moving)
  }

  return (
    <div className="App">
      <header className="App-header">
        <Button onClick={() => setShow(!show)}>Add a Program</Button>
      {show ? <FormControl>
        <FormLabel>Workout Name</FormLabel>
        <Input  />
        <FormLabel>Length of Workout (Minutes)</FormLabel>
        <Input  />
        </FormControl>
      : ''     
}
    <h3 draggable='true' onDrag={() => setMoving(cows[0])}>{cows[0]}</h3>
      <h3 draggable='true' onDrag={() => setMoving(cows[1])}>{cows[1]} </h3>

      <h3 draggable='true' onDrag={() => setMoving(cows[2])}>{cows[2]}</h3>

      <div className='Drop' onDragOver={handleOver} onDrop={dropIt}>{myCow}</div>
      </header>
    </div>
  );
}

export default NewProgram;