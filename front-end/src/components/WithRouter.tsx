import { HashRouter, Route, Routes, Navigate } from "react-router-dom"
import React from "react"
import Feed from "./feed"
import SignUpAndLoginContainer from "./SignUpAndLoginContainer"
import Home from "./Home"
import Account from "./account"
import Friend from "./friend"
import Message from "./message"
import SearchFriend from "./friend/Search"
import SearchResultFriend from "./friend/Search/Friend"

import FriendList from "./friend/FriendList"

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
        <Route path="/friends" element={<Friend />}>
          <Route index element={<FriendList />} />
          <Route path="search">
            <Route index element={<SearchFriend />} />
            <Route path=":uid" element={<SearchResultFriend />} />
          </Route>
        </Route>
        <Route path="/message" element={<Message />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </HashRouter>
  )
}

export default WithRouter
