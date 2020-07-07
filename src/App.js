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
import Home from './Components/Home';
import CartContextProvider from './Context/CartContext';
import Cart from './Components/Cart'
import Checkout from './Components/Checkout';
import ViewOrders from './Components/ViewOrders';


function App() {
  return (
    <div className="App">
    <UserContextProvider>
    <CartContextProvider>
    <Router>
    
      <Navbar/>
      <div className="h-16"></div>
        <Route exact path="/"><Home/> </Route>
        <Route exact path="/cart"><Cart/> </Route>
        <Route exact path="/checkout"><Checkout/> </Route>
        <Route exact path="/login"><Login /></Route>
        <Route exact path="/signup"><Signup/> </Route>
        <Route  path="/dashboard"><Dash/> </Route>
        <Route  path="/dashboard/addprod"><NewProduct/> </Route>
        <Route  path="/dashboard/vieworders"><ViewOrders/> </Route>
        </Router>
        </CartContextProvider>
      </UserContextProvider>
      
    </div>
  );
}

export default App;
