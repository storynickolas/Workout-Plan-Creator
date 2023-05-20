
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

  useEffect(() => {
    const fetchUser = () => {

      fetch("/workouts")
        .then((response) => response.json())
        .then((result) => setWorkoutList(result))
    };

    fetchUser();
  }, []);

  return (

    <WorkoutContext.Provider value={workoutList}>
      {props.children}
    </WorkoutContext.Provider>
  );
};

export { WorkoutContext, WorkoutContextProvider };
