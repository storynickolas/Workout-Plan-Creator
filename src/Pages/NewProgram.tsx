import React, { useState, useContext, useEffect } from 'react';
import { Button, Input, Card, Text, Switch, Box, Stack, Center, Flex, Table, Thead, Tr, Td, Tbody, Heading, Select, Grid, GridItem} from '@chakra-ui/react'
import AddButton from '../Components/AddButton';

import { ExerciseContext } from '../Context/Exercise.context';
import { useHistory } from 'react-router-dom'
import { WorkoutContext } from '../Context/Workout.context';



function NewProgram() {

  const {setSearch, groups, setSgroup, searched, allExercises, selected, setSelected, sgroup, search} = useContext(ExerciseContext);

  ///////////////////////////////// newW = workout
  const history = useHistory();

  const {workoutList, setWorkoutList} = useContext(WorkoutContext)
  const {exercises} = useContext(ExerciseContext)

  interface dataType {
    item: {id: number, name: string, time: number, user_id: number, workout_exercises: any[]}
  }

  let data : dataType = history.location.state as {item: {id: 0, name: '', time: 0, user_id: 0, workout_exercises: [{id: 0, exercise: {name: '', id: 0}, sets: 0, reps: 0}]}}


  const [clicked, setClicked] = useState(false)

  const [newW, setNewW] = useState({id: 0, name: '', time: 0, user_id: 0})

  function handleNew(myData: {id: number, name: string, time: number, user_id: number}) {
    setNewW(myData)
    if(myData.name !== ''){
      setClicked(true)
    }
  }

  ////////////////////////////////// list = workout_exercises

  const [moving, setMoving] = useState('')
  const [list, setList] = useState([{name: '',exercise_id: 0, workout_id: 0, reps: 0, sets: 0, status: false, user_id: 0}])

  function handleOver(e: React.ChangeEvent<any>) {
    e.preventDefault()
  }

  function dropIt(e: React.ChangeEvent<any>) {
    const pos = allExercises.map(e => e.name).indexOf(moving)
    //Add Exercise to Workout
    e.preventDefault()
    let newList = [...list]
    console.log(newList)
    if(newList[0]?.exercise_id === 0){
      console.log(newW)
      console.log(pos)
      console.log(allExercises)
      newList[0] = {name: moving, exercise_id: allExercises[pos].id, workout_id: newW.id, reps: 12, sets: 4, status: false, user_id: Number(sessionStorage.getItem('user_id'))}
    }
    else{
      newList.push({name: moving, exercise_id: allExercises[pos].id, workout_id: newW.id, reps: 12, sets: 4, status: false, user_id: Number(sessionStorage.getItem('user_id'))})
    }
    setList([...newList])

    //Make Exercise No Longer Draggable
 
    let currentExercises = [...selected]
    currentExercises[pos] = false
    setSelected([...currentExercises])
  }

  useEffect(() => {
    if(data) {
      handleNew(data.item)
      let browserUser = data.item.user_id

      interface editingWorkoutType {
        id: number, name: string, exercise_id: number, workout_id: number, reps: number, sets: number, status: boolean, user_id: number
      };
    
      let editingWorkout : editingWorkoutType[] = [];

      if(data?.item?.workout_exercises[0]?.exercise?.id !== 0){
          data.item.workout_exercises.forEach((item) => {
            editingWorkout.push({id: item.id, name: item.exercise.name, exercise_id: item.exercise.id, workout_id: data.item.id, reps: item.reps, sets: item.reps, status: true, user_id: browserUser})
        })
      }
      setList([...editingWorkout])
    }
  }, [data]);
    

  function moreStuff(item: any) {
    //Remove Exercise from Workout]
    console.log(item)
    if(list.length === 1){
      setList([{name: '',exercise_id: 0, workout_id: 0, reps: 0, sets: 0, status: false, user_id: 0}])
    }
    else{
      let newList = [...list]
      let exercsiseRemoving = newList.indexOf(item)
      newList.splice(exercsiseRemoving, 1)
      setList(newList)
    }

    if(item.id) {
    fetch(`/workout_exercises/${item.id}`, { method: "DELETE" }).then((r) => {
      if (r.ok) {
      console.log('start');
        /// Find index of workout on myWorkout List
        let workoutIndex : number[] = []
        workoutList.forEach((item) => {
          if(item.name === newW.name) {
            workoutIndex.push(workoutList.indexOf(item))
          }
        })
        console.log('start')

        /// Workout in quesiton
        let editingWorkout = workoutList[workoutIndex[0]]

        /// workout exercises of workout
        let editingExercises = editingWorkout.workout_exercises

        /// find index of workout exercise
        let exerciseIndex : number[] = []

        editingExercises.forEach((ex, index) => {
          if(ex.id === item.id){
            exerciseIndex.push(index)
          }
        })

        /// remove index from workout exercises
        editingExercises = [...editingExercises.slice(0, exerciseIndex[0]), ...editingExercises.slice(exerciseIndex[0] + 1, editingExercises.length)]
        editingWorkout.workout_exercises = [...editingExercises]

        /// Add updated workout back into list
        let updatedList = [...workoutList]
        updatedList[workoutIndex[0]] = editingWorkout
        setWorkoutList([...updatedList])
        console.log('end');

        }
    });
      }
    
    //Make Exercise Draggable Again
    const pos = allExercises.map(e => e.name).indexOf(item.name)
    let currentExercises = [...selected]
    currentExercises[pos] = true
    setSelected(currentExercises)
  }

  function handleSwitch(exerciseItem: any, position: number) {
    let newList = [...list]
    let newitem = exerciseItem
    newitem.status = true
    newList[position] = newitem
    setList([...newList])

    let newExercise = {
      exercise_id: exerciseItem.exercise_id,
      workout_id: exerciseItem.workout_id,
      reps: exerciseItem.reps,
      sets: exerciseItem.sets, 
    }

    if(exerciseItem.id) {
      fetch(`/workout_exercises/${exerciseItem.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(newExercise),
      })
        .then((response) => response.json())
        .then((response) => {
          if(response.errors){
            console.log(response.errors)
          }
          else {
            /// Find index of workout on myWorkout List
            let workoutIndex : number[] = []
            workoutList.forEach((item) => {
              if(item.name === newW.name) {
                workoutIndex.push(workoutList.indexOf(item))
          
              }
            })
            /// Workout in quesiton
            let wItem = workoutList[workoutIndex[0]]

            /// workout exercises of workout
            let wExercises = wItem.workout_exercises

            /// find index of workout exercise
            let wIndex : number[] = []
            wExercises.forEach((ex, index) => {
              console.log(ex)
              if(ex.id === response[0].id){
                console.log(ex)
                wIndex.push(index)
              }
            })

            /// remove index from workout exercises
            wExercises = [...wExercises.slice(0, wIndex[0]), response[0], ...wExercises.slice(wIndex[0] + 1, wExercises.length)]
            wItem.workout_exercises = [...wExercises]

            /// Add updated workout back into list
            let updatedList = [...workoutList]
            updatedList[workoutIndex[0]] = wItem
            setWorkoutList([...updatedList])
          }
        })
    }
    else {
      fetch(`/workout_exercises`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(newExercise),
    })
      .then((response) => response.json())
      .then((response) => {
        if(response.errors){
          console.log(response.errors)
        }
        else {
          let workoutIndex : number[] = []
          workoutList.forEach((item) => {
            if(item.name === newW.name) {
              workoutIndex.push(workoutList.indexOf(item))
            }
          })
          /// Workout in quesiton
          let wItem = workoutList[workoutIndex[0]]
  
          /// workout exercises of workout
          let wExercises = wItem.workout_exercises
          wExercises.push(response)
          wItem.workout_exercises = [...wExercises]
  
          /// Add updated workout back into list
          let updatedList = [...workoutList]
          updatedList[workoutIndex[0]] = wItem
          setWorkoutList([...updatedList])
        }
      })
    }    
  }

  function handleReps(e: React.ChangeEvent<any>, newReps: any, repsInd: number) {
    let newList = [...list]
    let newitem = newReps
    newitem.reps = Number(e.target.value)
    newList[repsInd] = newitem
    setList([...newList])
  }

  function handleSets(e: React.ChangeEvent<any>, newSets: any, setsInd: number) {
    let newList = [...list]
    let newitem = newSets
    newitem.sets = Number(e.target.value)
    newList[setsInd] = newitem
    setList([...newList])
  }

  useEffect(() => {

    let res = new Array(allExercises.length).fill(true)
    setSelected(res)

  }, []);

  function enableEdit(item: any) {
    console.log(item)
    let listCopy = [...list]
    let editIndex = listCopy.indexOf(item)
    listCopy[editIndex].status = false
    setList([...listCopy])
  }

  useEffect(() => {
    let manta = [...selected]
    let allItems = [...allExercises]
    let ray : number[] = []

    list.forEach((ex) => {
      ray.push(allItems.findIndex(item => item.name === ex.name))
    })

    manta.forEach((ex, index) => {
      if(ray.includes(index)){
        manta[index] = false
      }
      else{
        manta[index] = true
      }
    })

    setSelected([...manta])

  }, [data, list])

  let browserUser = Number(sessionStorage.getItem('user_id'))

  return (
    

    <Box bg='grey' w='100%' minH={'100vh'} p={4} color='white'>
      <Box bg='black' >
        {clicked && newW.name !== '' ? <Text fontSize='6xl'>{newW.name}</Text> : ''}
        {clicked && newW.name !== '' ? <Text fontSize='4xl'>{newW.time} minutes</Text> : ''}
      </Box>
      {browserUser === 0 ? '' :
      <Box bg='black' >
        {clicked && newW.name !== '' ? '' : <Text fontSize='6xl'>Create a Workout Below</Text> }
        {clicked && newW.name !== '' ? '' : <Text fontSize='4xl'>Add Exercises from List</Text>}
      </Box>}

      {browserUser === 0 ? 
        <Grid maxH='80vh' gap={4}> 
          <GridItem  bg='teal' >
            <Stack>
              <Text fontSize='4xl'>Please Log In To Create a Workout</Text>
              <Button onClick={() => history.push('/login')} color='black' maxW={'50%'} alignSelf={'center'}>Login</Button>
             </Stack>
          </GridItem>
        </Grid>
        :
        <Grid h='200px' templateRows='repeat(2, 1fr)' templateColumns='repeat(5, 1fr)' gap={4} >
          <GridItem rowSpan={2} colSpan={1} bg='teal' maxH='70vh' >
            <Box padding={4} >
              <Heading>Exercises</Heading>
              <Input placeholder='Search...' bgColor={'white'} color='black' onChange={(e) => setSearch(e.target.value)} defaultValue={search}/>
              <Box overflowY="auto" maxHeight="50vh">
                <Table variant="simple" colorScheme="grey">
                  <Thead position="sticky" top={0} bgColor="grey">
                    <Select onChange={(e) =>  setSgroup(e.target.value)} defaultValue={sgroup} >
                      {
                        groups.map((item: string) => 
                          <option value={item} >{item}</option>
                        )
                      }
                    </Select>
                  </Thead>
                  <Tbody >
                  { 
                  allExercises.map((item: {name: string}, index) => 
                  searched.map(e => e.name).indexOf(item.name) !== -1 ? 
                    <Tr color='black' backgroundColor={selected[index] === true ? 'white' : 'grey'} >
                      <Td>
                        <Text 
                          fontSize='2xl'  
                          draggable={selected[index] === true ? true : false} 
                          onDrag={() => setMoving(allExercises[index].name)}
                          >{item.name}
                        </Text>
                      </Td>
                    </Tr> : ''
                  )}
                  </Tbody>
                </Table>
              </Box>
                </Box>
            </GridItem>
            <GridItem rowSpan={2} colSpan={4} bg='teal' minH='70vh'  maxH='60vh'>
            <Box padding={4} overflowY={'scroll'} h={'80vh'}>
              <Box bg={'red'}  w='100%' >
              </Box>
              <Box overflow={'scroll'} > 
              {
                list[0]?.name === '' ? '' : list.map((item, index) => 
                  <Card >
                    {item.status === false ?
                    <Grid templateColumns='repeat(7, 1fr)' padding={10} gap={6} justifyItems={'center'} alignItems={'center'}>
                      <Text fontSize='2xl'>{item.name}</Text>
                      <Text>Reps</Text>
                      <Input defaultValue={12} width={'50px'} onChange={(e) => handleReps(e, item, index)}></Input>
                      <Text>Sets</Text>
                      <Input defaultValue={4} width={'50px'} onChange={(e) => handleSets(e, item, index)}></Input>
                      <Text>Confirm:   
                      <Switch size='lg' onChange={() => handleSwitch(item, index)} isDisabled={item.status}/>
                      </Text> 
                      <GridItem w='15%'>
                      <Button onClick={() => moreStuff(item)}>Remove</Button> 
                      </GridItem>
                    </Grid> 
                    : 
                    <Grid templateColumns='repeat(7, 1fr)' padding={10} gap={6} justifyItems={'center'} alignItems={'center'}>
                      <Text fontSize='2xl'>{item.name}</Text>
                      <Text>Reps</Text>
                      <Text>{item.reps}</Text>
                      <Text>Sets</Text>
                      <Text>{item.sets}</Text>
                      <Button onClick={() => enableEdit(item)}>Edit</Button>
                      <GridItem w='15%'>
                      <Button onClick={() => moreStuff(item)}>Remove</Button> 
                      </GridItem>
                    </Grid> 
                    }
                  </Card> 
              )}
              </Box>
              {clicked ?
                <Card minWidth='90%'>
                  <div className='Drop' onDragOver={handleOver} onDrop={dropIt} >
                    Add an Exercise
                  </div>
                </Card> 
              : ''}
              {newW.name === '' ?
                <Flex flexDirection="column" width="100wh" height="68vh" bgColor='teal' justifyContent="center" alignItems="center">
                  <Box minW='30vw' p="1rem" backgroundColor="white" border='2px' borderColor='black'>
                    {clicked ? '' : 
                      <AddButton handleNew={handleNew} />
                    }
                  </Box>
                </Flex> : ''
              }
            </Box>
          </GridItem>
        </Grid>
      }
    </Box>
  );
}

export default NewProgram;
