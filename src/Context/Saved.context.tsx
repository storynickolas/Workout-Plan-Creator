import React, { createContext, useState, useEffect, useContext} from "react";
import { UserContext } from "./User.context";

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
  setSidList: React.Dispatch<React.SetStateAction<number[]>>,
  handleRemove: Function,
  saveWorkout: Function
}

const SavedContextState = {
  savedList: [{id: 0, workout_id: 0, workout: {name: ''}}],
  setSavedList: () => [],
  widList: [],
  setWidList: () => [],
  sidList: [],
  setSidList: () => [],
  handleRemove: () => [],
  saveWorkout: () => []
}

const SavedContext = createContext<SavedContextType>(SavedContextState)


const SavedContextProvider = (props: ContainerProps) => {

  const [savedList, setSavedList] = useState<{id: number, workout: {name: string}, workout_id: number}[]>([{id: 0, workout_id: 0, workout: {name: ''}}])
  const [widList, setWidList] = useState<number[]>([])
  const [sidList, setSidList] = useState<number[]>([])

  const {user} = useContext(UserContext)
  
  let cow = sessionStorage.getItem('user_id')

  useEffect(() => {
    fetch(`/users/${sessionStorage.getItem('user_id')}`).then((response) => {
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
  }, [cow, user]);

  function handleRemove(sid : number) {
    let cow = sidList[sid]

    if(cow) {
      fetch(`/saved_workouts/${cow}`, { method: "DELETE" }).then((r) => {
              if (r.ok) {
                console.log('success')
                let donkey = [...savedList]
                let otter = [...widList]
                let tiger = [...sidList]
                setSavedList([...donkey.slice(0,sid),...donkey.slice(sid + 1,savedList.length)])
                setWidList([...otter.slice(0,sid),...otter.slice(sid + 1,widList.length)])
                setSidList([...tiger.slice(0,sid),...tiger.slice(sid + 1,sidList.length)])
              }
        })
    }
  }

  function saveWorkout(workout: number) {
    if(cow !== null) {
      let savedWorkout = {
      workout_id: workout,
      user_id: Number(cow)
      }
       fetch(`/saved_workouts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(savedWorkout),
    })
      .then((response) => response.json())
      .then((response) => {
        if(response.errors){

          console.log(response.errors)
        }
        else {
          let donkey = [...savedList]
          let otter = [...widList]
          let tiger = [...sidList]
          donkey.push(response)
          otter.push(response.workout.id)
          tiger.push(response.id)
          setSavedList([...donkey])
          setWidList([...otter])
          setSidList([...tiger])
        }
      })
    }
   
    }



  return (

    <SavedContext.Provider value={{handleRemove, saveWorkout, savedList, setSavedList, widList, setWidList, sidList, setSidList}}>
      {props.children}
    </SavedContext.Provider>
  );
};

export { SavedContext, SavedContextProvider };
