import React, { useEffect, useCallback } from "react"
import LatestPosts from "./Posts"
import Menu from "../Menu"
import CreatePost from "./CreatePost"
import { useDispatch, useSelector } from "react-redux"
import { IAppState } from "../../redux/ReducerTypes"
import axios from "axios"
import { DOMAIN } from "../../Constants"
import { LOGOUT, SETUSER } from "../../redux/actions"
import { Dispatch } from "redux"

export default function Feed() {
  const user = useSelector((state: IAppState) => state.user)

  return (
    <>
      <Menu />
      {user.name ? <FeedBody /> : <h1>Please Wait...</h1>}
    </>
  )
}

function FeedBody() {
  return (
    <>
      <CreatePost />
      <LatestPosts />
    </>
  )
}
