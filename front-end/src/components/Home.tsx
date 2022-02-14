import React, { useState } from "react"
import { NavLink, Outlet } from "react-router-dom"
import "./Home.scss"
import Login from "./login"
import Signup from "./Signup"

const Home: React.FC = (props) => {
  return (
    <div className="main-layout">
      <h1
        style={{
          textAlign: "center",
          fontSize: "2.5rem",
          color: "#fff",
        }}
      >
        Welcome User
      </h1>
      <div className="centerBox">
        <div className="firstRow">
          <NavLink to="login">Login</NavLink>
          <NavLink to="signup">SignUp</NavLink>
        </div>
        <Outlet />
      </div>
    </div>
  )
}

export default Home
