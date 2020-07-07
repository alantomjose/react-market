import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import Navbar from './Components/Navbar'
import Login from './Components/Login';
import Signup from './Components/Signup';


function App() {
  return (
    <div className="App">
      <Navbar/>
      <Router>
        <Route to="/login"><Login/></Route>
        <Route to="/login"><Signup/> </Route>
      </Router>
    </div>
  );
}

export default App;
