import React from 'react';
import './App.css';
import './firebase'
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import Navbar from './Components/Navbar'
import Login from './Components/Login';
import Signup from './Components/Signup';
import UserContextProvider from './Context/UserContext';
import Dash from './Components/Dash';
import NewProduct from './Components/NewProduct';


function App() {
  return (
    <div className="App">
    <UserContextProvider>
    <Router>
      <Navbar/>
      
        <Route exact path="/login"><Login/></Route>
        <Route exact path="/signup"><Signup/> </Route>
        <Route  path="/dashboard"><Dash/> </Route>
        <Route  path="/dashboard/addprod"><NewProduct/> </Route>
        </Router>
      </UserContextProvider>
    </div>
  );
}

export default App;
