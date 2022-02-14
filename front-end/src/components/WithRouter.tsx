import { HashRouter, Route, Routes } from "react-router-dom"

import React, { ReactChild, ReactNode } from "react"
import Login from "./login"
import SignUp from "./Signup"

function WithRouter(Component: React.ComponentType<any>) {
  return function (props: any) {
    return (
      <HashRouter>
        <Routes>
          <Route path="/" element={<Component {...props} />}>
            <Route index element={<Login />} />
            <Route path="signup" element={<SignUp />} />
          </Route>
        </Routes>
      </HashRouter>
    )
  }
}

export default WithRouter
