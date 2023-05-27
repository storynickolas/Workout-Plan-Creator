import React, { createContext, useState, useEffect } from "react";

type ContainerProps = {
  children: React.ReactNode; 
};

type ExerciseContextType = {
  allExercises: {id: number, name: string, video: string, muscle_group: string}[],
  setAllExercises: React.Dispatch<React.SetStateAction<{id: number, name: string, video: string, muscle_group: string}[]>>
  exercises: {id: number, name: string, video: string, muscle_group: string}[],
  setExercises: React.Dispatch<React.SetStateAction<{id: number, name: string, video: string, muscle_group: string}[]>>
  groups: string[]
  search: string,
  setSearch: React.Dispatch<React.SetStateAction<string>>,
  sgroup: string,
  setSgroup: React.Dispatch<React.SetStateAction<string>>,
  searched: {name: string, video: string, muscle_group: string}[],
  setSearched: React.Dispatch<React.SetStateAction<{name: string, video: string, muscle_group: string}[]>>,
  selected: (string | boolean)[],
  setSelected: React.Dispatch<React.SetStateAction<(string | boolean)[]>>
}

const exerciseContextState = {
  allExercises: [{id: 0, name: '', video: '', muscle_group: ''}],
  setAllExercises: () => [],
  exercises: [{id: 0, name: '', video: '', muscle_group: ''}],
  setExercises: () => [],
  groups: ["All", "Back", "Biceps", "Triceps", "Shoulders", "Chest", "Legs", "Abs"],
  search: '',
  setSearch: () => '',
  sgroup: 'All',
  setSgroup: () => '',
  searched: [{name: '', video: '', muscle_group: ''}],
  setSearched: () => [],
  selected: [],
  setSelected: () => []
}

const ExerciseContext = createContext<ExerciseContextType>(exerciseContextState)


const ExerciseContextProvider = (props: ContainerProps) => {
  const [allExercises, setAllExercises] = useState<{id: number, name: string, video: string, muscle_group: string}[]>([{id: 0, name: '', video: '', muscle_group: ''}])
  const [exercises, setExercises] = useState<{id: number, name: string, video: string, muscle_group: string}[]>([{id: 0, name: '', video: '', muscle_group: ''}])
  const [search, setSearch] = useState<string>('')
  const groups = ["All", "Back", "Biceps", "Triceps", "Shoulders", "Chest", "Legs", "Abs"]
  const [sgroup, setSgroup] = useState<string>("All")
  const [searched, setSearched] = useState<{name: string, video: string, muscle_group: string}[]>([{name: '', video: '', muscle_group: ''}])
  const [selected, setSelected] = useState< (string | boolean)[] | [] >([])

  useEffect(() => {
    console.log('Sending')
    if(allExercises[0].name === '') {
      fetch("/exercises").then((response) => {
        if (response.ok) {
          response.json().then((user) => 
          {
            console.log(user)
            setAllExercises(user)
            setSearched(user)
            
            let res = new Array(user.length).fill(true)
            console.log(res)
            setSelected(res)
          })
      }});
    }
    else if(sgroup === 'All'){
      let newList = [...allExercises]
      newList = newList.filter(function(item) { 
        return item.name.toUpperCase().includes(search.toUpperCase()) === true
      })
      setSearched(newList)
    }

    else{
      let newList = [...allExercises]
      newList = newList.filter(function(item) { 
        return item.name.toUpperCase().includes(search.toUpperCase()) === true
      })
      newList = newList.filter(function(listItem) {return listItem.muscle_group === sgroup})
      setSearched(newList)
    }
  }, [search, sgroup]);



  return (

    <ExerciseContext.Provider value={{exercises, setExercises, search, setSearch, groups, sgroup, setSgroup, searched, setSearched, allExercises, setAllExercises, selected, setSelected} }>
      {props.children}
    </ExerciseContext.Provider>
  );
};

export { ExerciseContext, ExerciseContextProvider };








