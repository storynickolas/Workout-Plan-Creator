import './App.css';
// import { useState, createContext, useContext } from "react";
import Workouts from './Pages/Workouts'
import Exercises from './Pages/Exercises'
import User from './Pages/User'
import Home from './Pages/Home'
import Login from './Pages/Login'
import { Route, Switch } from "react-router-dom";
import Navbar from './Components/Navbar';
import NewProgram from './Pages/NewProgram';
import Signup from './Pages/Signup';
import Workout from './Pages/Workout';
import { Text, Box } from '@chakra-ui/react'

import { WorkoutContextProvider } from './Context/Workout.context'
import { UserContextProvider } from './Context/User.context'
import { ExerciseContextProvider } from './Context/Exercise.context'
import WorkoutDay from './Pages/WorkoutDay';
import EditDay from './Pages/EditDay';
import NewDay from './Pages/NewDay';
import { SavedContextProvider } from './Context/Saved.context';


function App() {

  return (
    <UserContextProvider >
    <WorkoutContextProvider>
    <ExerciseContextProvider>
    <SavedContextProvider>

    <Box className="App" >
      <Box bg='black' position='sticky' top='0'> 
        <Text color='white' as='b' fontSize='6xl' >WORKOUT PLANNER</Text>
        <Navbar />
      </Box>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/workouts">
          <Workouts />
        </Route>
        <Route exact path="/newprogram">
          <NewProgram />
        </Route>
        <Route exact path="/exercises">
          <Exercises />
        </Route>
        <Route exact path="/myPage">
            <User />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/signup">
          <Signup />
        </Route>
        <Route exact path='/workout_days/new'>
          <NewDay />
        </Route>
        <Route exact path='/workouts/:id'>
          <Workout />
        </Route>
        <Route exact path='/workouts/:id/edit'>
          <NewProgram />
        </Route>
        <Route exact path='/workout_days/:id'>
          <WorkoutDay />
        </Route>
        <Route exact path='/workout_days/:id/edit'>
          <EditDay />
        </Route>
      </Switch>
    </Box>

    </SavedContextProvider>
    </ExerciseContextProvider>
    </WorkoutContextProvider>
    </UserContextProvider>
  );
}

export default App;
