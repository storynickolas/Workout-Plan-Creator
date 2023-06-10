import React, { createContext, useState, useEffect } from "react";

// create context

type ContainerProps = {
  children: React.ReactNode; 
};

type WorkoutContextType = {
  workoutList: {id: number, name: string, time: number, user_id: number, workout_exercises: {name: string}[], reviews: {rating: number}[]}[],
  setWorkoutList: React.Dispatch<React.SetStateAction<{id: number, name: string, time: number, user_id: number, workout_exercises: {name: string}[], reviews: {rating: number}[]}[]>>
}

const WorkoutContextState = {
  workoutList: [{id: 0, name: '', time: 0, user_id: 0, workout_exercises: [{name: ''}], reviews: [{rating: 0}]}],
  setWorkoutList: () => []
}

const WorkoutContext = createContext<WorkoutContextType>(WorkoutContextState)


const WorkoutContextProvider = (props: ContainerProps) => {

  const [workoutList, setWorkoutList] = useState<{id: number, name: string, time: number, user_id: number, workout_exercises: {name: string}[], reviews: {rating: number}[]}[]>([{id: 0, name: '', time: 0, user_id: 0, workout_exercises: [{name: ''}], reviews: [{rating: 0}]}])
  

  useEffect(() => {
    fetch("/workouts").then((response) => {
      if (response.ok) {
        response.json().then((user) => 
        {
          setWorkoutList(user)
        });
      }
    });
  }, []);

  return (

    <WorkoutContext.Provider value={{workoutList, setWorkoutList}}>
      {props.children}
    </WorkoutContext.Provider>
  );
};

export { WorkoutContext, WorkoutContextProvider };
