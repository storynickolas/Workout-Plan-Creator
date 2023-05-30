import React, { createContext, useState, useEffect } from "react";

// create context
const WorkoutContext = createContext([{id: 0, name: '', time: 0, user_id: 0, workout_exercises: []}]);

type ContainerProps = {
  children: React.ReactNode; 
};


const WorkoutContextProvider = (props: ContainerProps) => {

  const [workoutList, setWorkoutList] = useState([]);
  

  useEffect(() => {
    fetch("/workouts").then((response) => {
      if (response.ok) {
        response.json().then((user) => 
        {
          console.log(user)
          setWorkoutList(user)
        });
      }
    });
  }, []);

  return (

    <WorkoutContext.Provider value={workoutList}>
      {props.children}
    </WorkoutContext.Provider>
  );
};

export { WorkoutContext, WorkoutContextProvider };
