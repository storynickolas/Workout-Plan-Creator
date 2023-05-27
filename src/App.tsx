import './App.css';
// import { useState, createContext, useContext } from "react";
import Workouts from './Pages/Workouts'
import Exercises from './Pages/Exercises'
import User from './Pages/User'
import Home from './Pages/Home'
import Login from './Pages/Login'
import { Route, Switch } from "react-router-dom";
import Navbar from './Navbar';
import NewProgram from './Pages/NewProgram';
import Signup from './Pages/Signup';
import { Box } from '@chakra-ui/react'
import Workout from './Pages/Workout';
import React, { useEffect, useState, useContext } from 'react';

import { WorkoutContext, WorkoutContextProvider } from './Workout.context'
import { UserContext, UserContextProvider } from './User.context'
import { ExerciseContext, ExerciseContextProvider } from './Exercise.context'

function App() {

  const [workoutList, setWorkoutList] = useState()

  

//   interface Workout {
//     name:              string;
//     time:              number;
//     id:                number;
//     workout_exercises: WorkoutExercise[];
//     reviews:           Review[];
// }

// interface Review {
//     rating:   number;
//     write_up: string;
// }

// interface WorkoutExercise {
//     id:       number;
//     exercise: Exercise;
//     reps:     number;
//     sets:     number;
// }

// interface Exercise {
//     id:           number;
//     name:         string;
//     muscle_group: string;
//     video:        string;
//     created_at:   Date;
//     updated_at:   Date;
// }

//   useEffect(() => {
//     fetch("/workouts").then((response) => {
//       if (response.ok) {
//         response.json().then((user) => 
//         {
//           console.log(user)
//           setWorkoutList(user)
//         });
//       }
//     });
//   }, []);


  return (
    <UserContextProvider >
    <WorkoutContextProvider>
    <ExerciseContextProvider>

    <div className="App">
      <header >
          <h1 color='white'>Workouts</h1>
          <Navbar />
        </header>
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
      <Route exact path='/workouts/:id'>
              <Workout />
            </Route>
      </Switch>
    </div>
</ExerciseContextProvider>
</WorkoutContextProvider>
</UserContextProvider>
  );
}

export default App;
