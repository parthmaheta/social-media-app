import React from "react"
import { NavLink } from "react-router-dom"
import Login from "./Login"
import SignUp from "./Signup"

const SignUpAndLoginContainer: React.FC<{ isLogin: boolean }> = (props) => {
  return (
    <>
      <h1
        style={{
          textAlign: "center",
          fontSize: "2.5rem",
        }}
      >
        Welcome User
      </h1>
      <div className="centerBox">
        <div className="firstRow">
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/signup">SignUp</NavLink>
        </div>
        {props.isLogin ? <Login /> : <SignUp />}
      </div>
    </>
  )
}
export default SignUpAndLoginContainer
