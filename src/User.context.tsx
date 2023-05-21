import React, { createContext, useState, useEffect } from "react";

type ContainerProps = {
  children: React.ReactNode; 
};

type UserContextType = {
  user: string | null,
  setUser: React.Dispatch<React.SetStateAction<string | null>>
}

const iUserContextState = {
 user: null,
 setUser: () => {}
}

const UserContext = createContext<UserContextType>(iUserContextState)


const UserContextProvider = (props: ContainerProps) => {

  const [user, setUser] = useState<string | null>(null)

  useEffect(() => {

    setUser(sessionStorage.getItem('user'))

  }, [user])

  return (

    <UserContext.Provider value={{user, setUser} }>
      {props.children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };