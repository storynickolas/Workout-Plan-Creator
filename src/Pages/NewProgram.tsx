import React, { useState, useContext, useEffect } from 'react';
import { Button, Input, Card, Text, Switch, Box, Center, Flex, Table, Thead, Tr, Td, Tbody, Heading, Select, Grid, GridItem} from '@chakra-ui/react'
import AddButton from '../Components/AddButton';

import { ExerciseContext } from '../Context/Exercise.context';
import { useHistory } from 'react-router-dom'
import { WorkoutContext } from '../Context/Workout.context';



function NewProgram() {

  const {setSearch, groups, setSgroup, searched, allExercises, selected, setSelected, sgroup, search} = useContext(ExerciseContext);

  ///////////////////////////////// newW = workout
  const history = useHistory();

  const {workoutList, setWorkoutList} = useContext(WorkoutContext)

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
    if(newList[0]?.exercise_id === 0){
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

  function handleSwitch(donkey: any, cow: number) {
    console.log(donkey)
    let newList = [...list]
    let newitem = donkey
    newitem.status = true
    newList[cow] = newitem
    setList([...newList])

 let dog = {
      exercise_id: donkey.exercise_id,
      workout_id: donkey.workout_id,
      reps: donkey.reps,
      sets: donkey.sets, 

    }

    if(donkey.id) {
      fetch(`/workout_exercises/${donkey.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(dog),
      })
        .then((response) => response.json())
        .then((response) => {
          if(response.errors){
            console.log(response.errors)
          }
          else {
            console.log('success')

                    /// Find index of workout on myWorkout List
       
        let bat : number[] = []

        workoutList.forEach((item) => {
          if(item.name === newW.name) {
            bat.push(workoutList.indexOf(item))
      
          }
        })

        console.log('start')

        /// Workout in quesiton

        let fly = workoutList[bat[0]]

        /// workout exercises of workout
        
        let cow = fly.workout_exercises

        /// find index of workout exercise

        let possum : number[] = []

        cow.forEach((ex, index) => {
          console.log(ex)
          if(ex.id === response[0].id){
            console.log(ex)
            possum.push(index)
          }
        })

        /// remove index from workout exercises

        console.log(possum[0])

        console.log(response)

        cow = [...cow.slice(0, possum[0]), response[0], ...cow.slice(possum[0] + 1, cow.length)]

        fly.workout_exercises = [...cow]

        /// Add updated workout back into list

        let turtle = [...workoutList]

        turtle[bat[0]] = fly

        console.log([...turtle])

        setWorkoutList([...turtle])
    
        console.log('end');
      




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
      body: JSON.stringify(dog),
    })
      .then((response) => response.json())
      .then((response) => {
        if(response.errors){
          console.log(response.errors)
        }
        else {
          console.log(response)

          let bat : number[] = []

          workoutList.forEach((item) => {
            if(item.name === newW.name) {
              bat.push(workoutList.indexOf(item))
        
            }
          })

          console.log('start')

          /// Workout in quesiton
  
          let fly = workoutList[bat[0]]
  
          /// workout exercises of workout
          
          let cow = fly.workout_exercises

          cow.push(response)
  
          fly.workout_exercises = [...cow]
  
          /// Add updated workout back into list
  
          let turtle = [...workoutList]
  
          turtle[bat[0]] = fly
  
          setWorkoutList([...turtle])
      
          console.log('end');

        }
      })
    }    
  }

  function handleReps(e: React.ChangeEvent<any>, donkey: any, cow: number) {
    let newList = [...list]
    let newitem = donkey
    newitem.reps = Number(e.target.value)
    newList[cow] = newitem
    setList([...newList])
  }

  function handleSets(e: React.ChangeEvent<any>, donkey: any, cow: number) {
    let newList = [...list]
    let newitem = donkey
    newitem.sets = Number(e.target.value)
    newList[cow] = newitem
    setList([...newList])
  }

  useEffect(() => {

    let res = new Array(allExercises.length).fill(true)
    console.log(res)
    setSelected(res)

    console.log(newW)
    console.log(list)

  }, []);

  function enableEdit(item: any) {
    console.log(item)
    let tiger = [...list]
    let cow = tiger.indexOf(item)
    tiger[cow].status = false
    setList([...tiger])
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



  return (
    

    <Box bg='grey' w='100%' h='100%' minH={'85vh'} p={4} color='white'>
      <Box bg='teal' >
        {clicked && newW.name !== '' ? <Text fontSize='6xl'>{newW.name}</Text> : ''}
        {clicked && newW.name !== '' ? <Text fontSize='4xl'>{newW.time} minutes</Text> : ''}
      </Box>

      {Number(sessionStorage.getItem('user_id')) === 0 ? 
        <Grid h='80vh' gap={4}> 
          <GridItem  bg='teal' >
            <Center>Log In</Center>
          </GridItem>
        </Grid>
        :
        <Grid h='200px' templateRows='repeat(2, 1fr)' templateColumns='repeat(5, 1fr)' gap={4}>
          <GridItem rowSpan={2} colSpan={1} bg='teal' maxH='80vh' >
            <Box padding={4} >
              <Heading>Exercises</Heading>
              <Input placeholder='Search...' bgColor={'white'} color='black' onChange={(e) => setSearch(e.target.value)} defaultValue={search}/>
              <Box overflowY="auto" maxHeight="60vh">
                <Table variant="simple" colorScheme="teal">
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
                          onDrag={() => setMoving(searched[index].name)}
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
            <GridItem rowSpan={2} colSpan={4} bg='teal'  minH='80vh'>
            <Box padding={4} overflowY={'scroll'} maxH={'80vh'}>
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
                <Flex flexDirection="column" width="100wh" height="80vh" bgColor='teal' justifyContent="center" alignItems="center">
                  <Box minW='30vw' p="1rem" backgroundColor="white" border='2px' borderColor='black'>
                    <Text color='black' fontSize='3xl'>
                      Click Below to Create A Workout
                    </Text>
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
