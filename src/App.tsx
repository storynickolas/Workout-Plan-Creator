import './App.css';
import { useState, createContext, useContext } from "react";
import Workouts from './Pages/Workouts'
import Exercises from './Pages/Exercises'
import User from './Pages/User'
import Home from './Pages/Home'
import Login from './Pages/Login'
import { Route, Switch } from "react-router-dom";
import Navbar from './Navbar';
import NewProgram from './Pages/NewProgram';

interface CurrentUserContextType {
  user: string;
}

export const CurrentUserContext = createContext<CurrentUserContextType | null>(null);


function App() {
  const [user, setUser] = useState("Jesse Hall");

  return (
    <CurrentUserContext.Provider value={{user: user}}>
    <div className="App">
      <header >
          <h1 color='white'>Workouts</h1>
          <Navbar />
        </header>
      <Switch>
        <Route exact path="/">
            <Home />
          </Route>
        <Route exact path="/workouts">
          <Workouts />
        </Route>
        <Route exact path="/newprogram">
          <NewProgram />
        </Route>
        <Route exact path="/exercises">
          <Exercises />
        </Route>
        <Route exact path="/myPage">
          
            <User />
  
        </Route>
        <Route exact path="/login">
          
          <Login />

      </Route>
      </Switch>
    </div>
              </CurrentUserContext.Provider>
  );
}

export default App;
