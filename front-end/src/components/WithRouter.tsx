import { HashRouter, Route, Routes } from "react-router-dom"
import React from "react"
import Feed from "./feed"
import SignUpAndLoginContainer from "./SignUpAndLoginContainer"
import Home from "./Home"
import Account from "./account"

function WithRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/account" element={<Account />} />
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
