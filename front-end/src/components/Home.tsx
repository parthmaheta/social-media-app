import React, { useState } from "react"
import "./Home.scss"
import Login from "./login"
import Signup from "./Signup"

const Home: React.FC = (props) => {
  const [isSignUp, setIsSignUp] = useState(false)

  return (
    <div className="centerBox">
      <div className="firstRow">
        <span
          style={!isSignUp ? { borderBottom: "1px solid white" } : {}}
          onClick={() => setIsSignUp(false)}
        >
          Login
        </span>
        <span
          style={isSignUp ? { borderBottom: "1px solid white" } : {}}
          onClick={() => setIsSignUp(true)}
        >
          SignUp
        </span>
      </div>
      {isSignUp ? <Signup /> : <Login />}
    </div>
  )
}

export default Home
