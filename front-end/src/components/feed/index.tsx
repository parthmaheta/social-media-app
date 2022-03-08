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
  const dispatch = useDispatch()

  useEffect(() => {
    if (!user.name) fetchUserFromServer(user.token, dispatch)
  }, [])

  return (
    <>
      <Menu />
      {user.name ? <FeedBody /> : <h1>Please Wait...</h1>}
    </>
  )
}

async function fetchUserFromServer(token: string | null, dispatch: Dispatch) {
  if (!token) dispatch({ type: LOGOUT })

  try {
    const response = await axios.get(DOMAIN + "user/ ", {
      headers: {
        Authorization: token as string,
      },
    })

    if (response.status === 200) {
      return dispatch({
        type: SETUSER,
        payload: { token: token, ...response.data },
      })
    } else {
      dispatch({ type: LOGOUT })
    }
  } catch (e) {
    dispatch({ type: LOGOUT })
  }
}

function FeedBody() {
  return (
    <>
      <CreatePost />
      <LatestPosts />
    </>
  )
}
