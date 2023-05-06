import './App.css';
import Workouts from './Pages/Workouts'
import { Route, Switch } from "react-router-dom";
import Navbar from './Navbar';

function App() {

  return (
    <div className="App">
      <header >
          <h1 color='white'>Workouts</h1>
          <Navbar />
        </header>
      <Switch>
        <Route exact path="/">
            <Workouts />
          </Route>
        <Route exact path="/workouts">
          <Workouts />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
