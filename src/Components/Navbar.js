import React, { useEffect, useContext } from "react";
import "./nav.css";
import { UserContext } from "../Context/UserContext";
import { auth } from "../firebase";
import { Link, Router } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
// import logo from "../Assets/logo.png";
const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(UserContext);
  const {cart}=useContext(CartContext);
  const menuClick = () => {
    const menuBtn = document.querySelector(".menu-icon span");
    // const searchBtn = document.querySelector(".search-icon");
    const cancelBtn = document.querySelector(".cancel-icon");
    const items = document.querySelector(".nav-items");
    // menuBtn.onclick = ()=>{
    items.classList.add("active");
    menuBtn.classList.add("hide");
    // searchBtn.classList.add("hide");
    cancelBtn.classList.add("show");
    // }
  };
  const cancelClick = () => {
    console.log("ckink");
    const menuBtn = document.querySelector(".menu-icon span");
    // const searchBtn = document.querySelector(".search-icon");
    const cancelBtn = document.querySelector(".cancel-icon");
    const items = document.querySelector(".nav-items");
    // cancelBtn.onclick = ()=>{
    items.classList.remove("active");
    menuBtn.classList.remove("hide");
    // searchBtn.classList.remove("hide");
    cancelBtn.classList.remove("show");
    // cancelBtn.style.color = "#ff3d00";
    // }
  };

  const logout = () => {
    console.log("signing out");
    auth
      .signOut()
      .then(function () {
        setIsLoggedIn(false);
      })
      .catch(function (err) {
        console.log(err.code, err.message);
      });
  };

  return (
    <div className="bg-white text-black fixed w-screen shadow z-20">
      <nav>
        <div onClick={cancelClick} class="logo flex">
          The Marketplace
        </div>
        <div class="nav-items">
          <li onClick={cancelClick} className="bg-grey-500 rounded">
            <Link to="/">Home</Link>
          </li>

          {isLoggedIn ? (
            <li
              onClick={cancelClick}
              className="bg-grey-200 rounded cursor-pointer"
              onClick={logout}
            >
              <div>Logout</div>
            </li>

            
          ) : (
            <li onClick={cancelClick} className="bg-grey-200 rounded">
              <Link to="/login">Login</Link>
            </li>
          )}

          {!isLoggedIn ? (

          <li onClick={cancelClick} className="bg-grey-200 rounded">
            <Link to="/signup">Signup</Link>
          </li>

          ) : null}
          {isLoggedIn ? ( 
          <li onClick={cancelClick} className="bg-grey-200 rounded">
            <Link to="/dashboard/addprod">Dashboard</Link>
          </li>
          ) : null}
          <li onClick={cancelClick}>
            <Link to="/cart">
              <button className="bg-black rounded text-white text-lg px-5 font-bold uppercase">
                {" "}
                Go to Cart ({cart.length})
              </button>{" "}
            </Link>
          </li>
        </div>
        <div class="menu-icon" onClick={menuClick}>
          <span class="fa fa-bars"></span>
        </div>

        <div class="cancel-icon" onClick={cancelClick}>
          <span class="">x</span>
        </div>

        <div class="cancel-icon" onClick={cancelClick}>
          <span class="">x</span>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
