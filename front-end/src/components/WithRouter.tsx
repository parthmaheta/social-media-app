import { HashRouter, Route, Routes, Navigate } from "react-router-dom"
import React from "react"
import Feed from "./feed"
import SignUpAndLoginContainer from "./SignUpAndLoginContainer"
import Home from "./Home"
import Account from "./account"
import Friend from "./friend"
import Message from "./message"

function WithRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={<SignUpAndLoginContainer isLogin={true} />}
        />
        <Route
          path="/signup"
          element={<SignUpAndLoginContainer isLogin={false} />}
        />
        <Route path="/feed" element={<Feed />} />
        <Route path="/friend" element={<Friend />} />
        <Route path="/message" element={<Message />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </HashRouter>
  )
}

export default WithRouter
