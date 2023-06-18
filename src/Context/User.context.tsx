import React, { createContext, useState, useEffect } from "react";

type ContainerProps = {
  children: React.ReactNode; 
};

type UserContextType = {
  user: {id: number, username: string, schedule: {id: number}, saved_workouts: { id: number, name: string, workout_id: number }[]},
  setUser: React.Dispatch<React.SetStateAction<{id: number, username: string, schedule: {id: number}, saved_workouts: { id: number, name: string, workout_id: number }[]}>>
}

const iUserContextState = {
 user: {id: 0, username: '', schedule: {id: 0}, saved_workouts: [{id: 0, name: "test", workout_id: 0}]},
 setUser: () => {}
}

const UserContext = createContext<UserContextType>(iUserContextState)


const UserContextProvider = (props: ContainerProps) => {

  const [user, setUser] = useState<{id: number, username: string, schedule: {id: number}, saved_workouts: { id: number, name: string, workout_id: number }[]}>({id: 0, username: '', schedule: {id: 0}, saved_workouts: [{ id: 0, name: "test", workout_id: 0 }]})

  let browserUser = sessionStorage.getItem('user_id')

  useEffect(() => {
    console.log('Workout Days')
    fetch(`/users/${sessionStorage.getItem('user_id')}`).then((response) => {
      if (response.ok) {
        response.json().then((user) => 
        {
          setUser(user[0])
        });
      }
    });
  }, [browserUser]);



  return (

    <UserContext.Provider value={{user, setUser} }>
      {props.children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };