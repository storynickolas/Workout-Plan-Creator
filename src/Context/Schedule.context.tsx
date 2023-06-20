import React, { createContext, useState, useEffect } from "react";

type ContainerProps = {
  children: React.ReactNode; 
};

type ScheduleContextType = {
  schedule: {day: string}[],
  setSchedule: React.Dispatch<React.SetStateAction<{day: string}[]>>
  sId: number
  setSId: React.Dispatch<React.SetStateAction<number>>
}

const scheduleContextState = {
  schedule: [{day: "Sunday"}, {day: "Monday"}, {day: "Tuesday"}, {day: "Wednesday"}, {day: "Thursday"}, {day: "Friday"}, {day: "Saturday"}],
  setSchedule: () => {},
  sId: 0,
  setSId: () => []
}

const  ScheduleContext = createContext<ScheduleContextType>(scheduleContextState)


const ScheduleContextProvider = (props: ContainerProps) => {

  const [schedule, setSchedule] = useState<{day: string}[]>([{day: "Sunday"}, {day: "Monday"}, {day: "Tuesday"}, {day: "Wednesday"}, {day: "Thursday"}, {day: "Friday"}, {day: "Saturday"}])
  const [sId, setSId] = useState<number>(0)

  let myWeek = [{day: "Sunday"}, {day: "Monday"}, {day: "Tuesday"}, {day: "Wednesday"}, {day: "Thursday"}, {day: "Friday"}, {day: "Saturday"}]
  let typicalWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  useEffect(() => {

    console.log(sId)

    fetch(`/schedules/${sId}`).then((response) => {
      if (response.ok) {
        response.json().then((response) => 
        {
          console.log(response)
          let newWeek = myWeek 
          if(response[0].workout_days.length > 0){
            for (let i = 0; i < response[0].workout_days.length; i++) {
              console.log(typicalWeek.indexOf(response[0].workout_days[i].day))
              newWeek[typicalWeek.indexOf(response[0].workout_days[i].day)] = response[0].workout_days[i]
            }
          }
          console.log([...newWeek])
          setSchedule([...newWeek])
        });
      }
    });
  }, [sId]);

  return (

    <ScheduleContext.Provider value={{schedule, setSchedule, sId, setSId} }>
      {props.children}
    </ScheduleContext.Provider>
  );
};

export { ScheduleContext, ScheduleContextProvider };