import React, { useState, useContext, useEffect } from 'react';
import { Button, Input, Card, Text, Switch, Box, Center, Flex, Table, Thead, Tr, Td, Tbody, Heading, Select, Grid, GridItem} from '@chakra-ui/react'
import AddButton from '../AddButton';

import { ExerciseContext } from '../Exercise.context';
import { useHistory } from 'react-router-dom'
import { useParams } from 'react-router-dom';



function NewProgram() {

  const {setSearch, groups, setSgroup, searched, allExercises, selected, setSelected, sgroup, search} = useContext(ExerciseContext);

  ///////////////////////////////// newW = workout
  const history = useHistory();

  interface dataType {
    item: {id: number, name: string, time: number, user_id: number, workout_exercises: any[]}
  }
  // [ {id: number, exercise: {name: string, id: number}, sets: number, reps: number}]

  let data : dataType = history.location.state as {item: {id: 0, name: '', time: 0, user_id: 0, workout_exercises: [{id: 0, exercise: {name: '', id: 0}, sets: 0, reps: 0}]}}

  type itemIdParams = {
    id: string;
  };

  const { id } = useParams<itemIdParams>();

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
  const [results, setResults] = useState([{id: 0, exercise: {name: ''}}])

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
 
    console.log(allExercises[pos])
    let currentExercises = [...selected]
    currentExercises[pos] = false
    setSelected([...currentExercises])
  }

    useEffect(() => {
      if(data) {

      
      handleNew(data.item)

  
      let dog = data.item.user_id

      interface cowType {
        name: string, exercise_id: number, workout_id: number, reps: number, sets: number, status: boolean, user_id: number
      };
    
    let cow : cowType[] = [];

    console.log(data)

    // [{id: 0, exercise: {name: '', id: 0}, sets: 0, reps: 0}]

    if(data?.item?.workout_exercises[0]?.exercise?.id !== 0){
        data.item.workout_exercises.forEach((item) => {
        cow.push({name: item.exercise.name, exercise_id: item.exercise.id, workout_id: item.id, reps: item.reps, sets: item.reps, status: true, user_id: dog})
      })
    }

    
  
        setList([...cow])
  }
      
  
    }, [data]);

  function moreStuff(item: any) {
    //Remove Exercise from Workout]
    if(list.length === 1){
      setList([{name: '',exercise_id: 0, workout_id: 0, reps: 0, sets: 0, status: false, user_id: 0}])
    }
    else{
      let newList = [...list]
    let cattle = newList.indexOf(item)
    newList.splice(cattle, 1)
    setList(newList)
    }

    const puppy = results.map(e => e.exercise.name).indexOf(item.name)
  
    fetch(`/workout_exercises/${results[puppy].id}`, { method: "DELETE" }).then((r) => {
      if (r.ok) {
        console.log('success');
      }
    });
    
    
    //Make Exercise Draggable Again
    const pos = allExercises.map(e => e.name).indexOf(item.name)
    let currentExercises = [...selected]
    currentExercises[pos] = true
    setSelected(currentExercises)
  }

  function handleSwitch(donkey: any, cow: number) {
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
    console.log(dog)
    console.log(cow)
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
          // setStatus(response.errors)
          console.log(response.errors)
        }
        else {
          // setStatus(['Successfully Added'])
          // dispatch(addBeer(response));
          let squirel = [...results]
          if(squirel.length === 1){
            setResults([response])
          }
          else{
            squirel.push(response)
     
          setResults([...squirel])
          }
        }
      })
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



  return (

    <Box bg='grey' w='100%' h='100%' minH={'100vh'} p={4} color='white'>
      <Button onClick={() => console.log(id)}>Click Me</Button>
      {Number(sessionStorage.getItem('user_id')) === 0 ? 
      <Grid
      h='80vh'

      gap={4}
    > <GridItem  bg='tomato' >
      <Center>Log In</Center>
      </GridItem></Grid>
      :
      <Grid
        h='200px'
        templateRows='repeat(2, 1fr)'
        templateColumns='repeat(5, 1fr)'
        gap={4}
      >
        <GridItem rowSpan={2} colSpan={1} bg='tomato' minH='80vh'>
          <Box padding={4}>
            <Heading>Exercises</Heading>
            <Input placeholder='Search...' bgColor={'white'} color='teal' onChange={(e) => setSearch(e.target.value)} defaultValue={search}/>
            <Box overflowY="auto" maxHeight="60vh">
              <Table variant="simple" colorScheme="teal">
                <Thead position="sticky" top={0} bgColor="grey">
                  <Select onChange={(e) =>  setSgroup(e.target.value)} defaultValue={sgroup}>
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
                  <Tr backgroundColor={selected[index] === true ? 'teal' : 'grey'} >
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


        <GridItem rowSpan={2} colSpan={4} bg='tomato'  minH='80vh'>
        <Box padding={4} overflowY={'scroll'} maxH={'80vh'}>
          {/* <Box w='100%' maxW={'70vw'}> */}
          

            <Box bg={'red'}  w='100%' >

                  {clicked && newW.name !== '' ? <Text fontSize='6xl'>{newW.name}</Text> : ''}
          {clicked && newW.name !== '' ? <Text fontSize='4xl'>{newW.time} minutes</Text> : ''}
               </Box>
                <Box overflow={'scroll'} >
              
                
  {
      
      list[0]?.name === '' ? '' : list.map((item, index) => 
      <Card >
        <Grid templateColumns='repeat(7, 1fr)' padding={10} gap={6} justifyItems={'center'} alignItems={'center'}>

              <Text fontSize='2xl'>{item.name}</Text>
              <Text>Reps</Text>
              <Input defaultValue={12} width={'50px'} onChange={(e) => handleReps(e, item, index)}></Input>
              <Text>Sets</Text>
          <Input defaultValue={4} width={'50px'} onChange={(e) => handleSets(e, item, index)}></Input>
              <Text>Confirm:   <Switch size='lg' onChange={() => handleSwitch(item, index)} isDisabled={item.status}/></Text>
           <GridItem w='15%'><Button onClick={() => moreStuff(item)}>Remove</Button></GridItem>

              </Grid>
       </Card> 
      )}
      

      </Box>


      {clicked ?
        <Card minWidth='90%'>
          <div className='Drop' onDragOver={handleOver} onDrop={dropIt} >
            Add an Exercise
          </div>
        </Card> : ''}


        {/* /////////////////////////////////// */}

      {newW.name === '' ?    <Flex
        flexDirection="column"
        width="100wh"
        height="80vh"
        bgColor='tomato'

        justifyContent="center"
        alignItems="center"
        >
        <Box minW='30vw' 
          p="1rem"
          backgroundColor="white"
        >
      <Text color='teal' fontSize='3xl'>Click Below to Create A Workout</Text>
      {clicked ? '': 
      <AddButton handleNew={handleNew}/>}
        </Box>
          </Flex> : ''
      }

  {/* /////////////////////////////////// */}

        </Box>
      </GridItem>
    </Grid>
}
  </Box>
    
  );
}

export default NewProgram;
