import React, { useEffect } from "react";
import "./nav.css";
// import logo from "../Assets/logo.png";
const Navbar = () => {
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

  return (
    <div className="bg-white text-black fixed w-screen shadow z-20">
      <nav>
        <div onClick={cancelClick} class="logo flex">
          
          TurnBox
        </div>
        <div class="nav-items">
          <li onClick={cancelClick} className="bg-grey-500 rounded">
            <a href="#project">About</a>
          </li>
          <li onClick={cancelClick} className="bg-grey-200 rounded">
            <a href="#technology">Login</a>
          </li>
          <li onClick={cancelClick} className="bg-grey-200 rounded">
            <a href="#team">Signup</a>
          </li>
          <li onClick={cancelClick} className="bg-grey-200 rounded">
            <a href="#contact">Contact</a>
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
