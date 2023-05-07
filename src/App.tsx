import './App.css';
import Workouts from './Pages/Workouts'
import Exercises from './Pages/Exercises'
import User from './Pages/User'
import Home from './Pages/Home'
import { Route, Switch } from "react-router-dom";
import Navbar from './Navbar';
import NewProgram from './Pages/NewProgram';

function App() {

  return (
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
      </Switch>
    </div>
  );
}

export default App;
