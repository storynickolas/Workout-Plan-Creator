import React, { createContext, useState, useEffect, useContext } from "react";
import { UserContext } from '../Context/User.context';

// create context

type ContainerProps = {
  children: React.ReactNode; 
};

type WorkoutContextType = {
  workoutList: {id: number, name: string, time: number, user_id: number, workout_exercises: {id: number, name: string}[], reviews: {rating: number}[]}[],
  setWorkoutList: React.Dispatch<React.SetStateAction<{id: number, name: string, time: number, user_id: number, workout_exercises: {id: number, name: string}[], reviews: {rating: number}[]}[]>>
  myWorkouts: {id: number, name: string, time: number, user_id: number, workout_exercises: {id: number, name: string}[], reviews: {rating: number}[]}[],
  setMyWorkouts: React.Dispatch<React.SetStateAction<{id: number, name: string, time: number, user_id: number, workout_exercises: {id: number, name: string}[], reviews: {rating: number}[]}[]>>

}

const WorkoutContextState = {
  workoutList: [{id: 0, name: '', time: 0, user_id: 0, workout_exercises: [{id: 0, name: ''}], reviews: [{rating: 0}]}],
  setWorkoutList: () => [],
  myWorkouts: [{id: 0, name: '', time: 0, user_id: 0, workout_exercises: [{id: 0, name: ''}], reviews: [{rating: 0}]}],
  setMyWorkouts: () => []
}

const WorkoutContext = createContext<WorkoutContextType>(WorkoutContextState)


const WorkoutContextProvider = (props: ContainerProps) => {

  const [workoutList, setWorkoutList] = useState<{id: number, name: string, time: number, user_id: number, workout_exercises: {id: number, name: string}[], reviews: {rating: number}[]}[]>([{id: 0, name: '', time: 0, user_id: 0, workout_exercises: [{id: 0, name: ''}], reviews: [{rating: 0}]}])
  const [myWorkouts, setMyWorkouts] = useState<{id: number, name: string, time: number, user_id: number, workout_exercises: {id: number, name: string}[], reviews: {rating: number}[]}[]>([{id: 0, name: '', time: 0, user_id: 0, workout_exercises: [{id: 0, name: ''}], reviews: [{rating: 0}]}])

  let browserUser = Number(sessionStorage.getItem('user_id'))

  const {user} = useContext(UserContext)

  useEffect(() => {
    fetch("/workouts").then((response) => {
      if (response.ok) {
        response.json().then((workouts) => 
        {
          setWorkoutList(workouts)
        });
      }
    });

    fetch(`/user_workouts/${browserUser}`).then((response) => {
      if (response.ok) {
        response.json().then((workouts) => 
        {
          console.log(workouts)
          setMyWorkouts(workouts)
        });
      }
    });

  }, [browserUser]);

  return (

    <WorkoutContext.Provider value={{workoutList, setWorkoutList, myWorkouts, setMyWorkouts}}>
      {props.children}
    </WorkoutContext.Provider>
  );
};

export { WorkoutContext, WorkoutContextProvider };


