import React from "react"
import { connect, useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { LOGOUT } from "../../redux/actions"
import { IAppState } from "../../redux/ReducerTypes"
import LatestPosts from "../feed/Posts"
import Menu from "../Menu"

export default function Feed(props: any) {
  const user = useSelector(function (state: IAppState) {
    return state.user
  })

  if (!user.token) return <Navigate to="/" />
  else
    return (
      <>
        <Menu />

        <LatestPosts />
      </>
    )
}
