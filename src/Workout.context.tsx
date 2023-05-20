
// type ContainerProps = {
//   children: React.ReactNode; 
// };

// export const WorkoutContext = createContext(WorkoutContextData)

// export const WorkoutProvider = (props: ContainerProps) => {
//   const [newName, setNewName] = useState([])

//     useEffect(() => {
//       fetch("/workouts").then((response) => {
//         if (response.ok) {
//           response.json().then((user) => 
//           {
//             let arr = user.slice(0, 2)
//             setNewName(arr)
//           });
//         }
//       });
//     }, []);

//   return <WorkoutContext.Provider value={newName}>{props.children}</WorkoutContext.Provider>
// }

import React, { createContext, useState, useEffect } from "react";

// create context
const WorkoutContext = createContext(['test']);

type ContainerProps = {
  children: React.ReactNode; 
};


const WorkoutContextProvider = (props: ContainerProps) => {
  // the value that will be given to the context
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

  // fetch a user from a fake backend API
  useEffect(() => {
    const fetchUser = () => {
      // this would usually be your own backend, or localStorage
      // for example
      fetch("/workouts")
        .then((response) => response.json())
        .then((result) => setWorkoutList(result))
    };

    fetchUser();
  }, []);

  return (
    // the Provider gives access to the context to its children
    <WorkoutContext.Provider value={workoutList}>
      {props.children}
    </WorkoutContext.Provider>
  );
};

export { WorkoutContext, WorkoutContextProvider };
