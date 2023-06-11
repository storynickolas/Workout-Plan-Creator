import React, { createContext, useState, useEffect } from "react";

// create context

type ContainerProps = {
  children: React.ReactNode; 
};

type SavedContextType = {
  savedList: {id: number, workout_id: number, workout: {name: string}}[],
  setSavedList: React.Dispatch<React.SetStateAction<{id: number, workout_id: number, workout: {name: string}}[]>>
  widList: number[],
  setWidList: React.Dispatch<React.SetStateAction<number[]>>
  sidList: number[],
  setSidList: React.Dispatch<React.SetStateAction<number[]>>
}

const SavedContextState = {
  savedList: [{id: 0, workout_id: 0, workout: {name: ''}}],
  setSavedList: () => [],
  widList: [],
  setWidList: () => [],
  sidList: [],
  setSidList: () => []
}

const SavedContext = createContext<SavedContextType>(SavedContextState)


const SavedContextProvider = (props: ContainerProps) => {

  const [savedList, setSavedList] = useState<{id: number, workout: {name: string}, workout_id: number}[]>([{id: 0, workout_id: 0, workout: {name: ''}}])
  const [widList, setWidList] = useState<number[]>([])
  const [sidList, setSidList] = useState<number[]>([])
  
  let cow = sessionStorage.getItem('user_id')

  useEffect(() => {
    fetch(`/users/${cow}`).then((response) => {
      if (response.ok) {
        response.json().then((user) => 
        {
          setSavedList(user[0].saved_workouts)
          console.log(user[0].saved_workouts)
          let workouts : number[] = []
          let saveIds : number[] = []
          user[0].saved_workouts.forEach((item : {workout_id : number, id: number, workout: {name: ''}}) => {
            workouts.push(item.workout_id)
            saveIds.push(item.id)
          });
          setWidList([...workouts])
          setSidList([...saveIds])
        });
      }
    });
  }, [cow]);


  return (

    <SavedContext.Provider value={{savedList, setSavedList, widList, setWidList, sidList, setSidList}}>
      {props.children}
    </SavedContext.Provider>
  );
};

export { SavedContext, SavedContextProvider };


// useEffect(() => {
//   console.log(user.saved_workouts)
//   let cow : any[] = []
//   let dog : any[] = []

//   user.saved_workouts.forEach((item) => {
//     cow.push(item.workout_id)
//     dog.push(item.id)
//   })

//     setSaved([...cow])
//     setMyw([...dog])

// }, [user, user.saved_workouts])  
