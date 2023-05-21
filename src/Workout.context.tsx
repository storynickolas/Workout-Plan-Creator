import React, { createContext, useState, useEffect } from "react";

// create context
const WorkoutContext = createContext(['test']);

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
