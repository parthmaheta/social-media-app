import { HashRouter, Route, Routes } from "react-router-dom"

import React from "react"
import Feed from "./feed"
import SignUpAndLoginContainer from "./SignUpAndLoginContainer"
import Home from "./Home"

function WithRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/feed" element={<Feed />} />
        <Route
          path="/login"
          element={<SignUpAndLoginContainer isLogin={true} />}
        />
        <Route
          path="/signup"
          element={<SignUpAndLoginContainer isLogin={false} />}
        />
      </Routes>
    </HashRouter>
  )
}

export default WithRouter
