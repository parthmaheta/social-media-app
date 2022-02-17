import React from "react"
import { connect, useSelector } from "react-redux"
import { LOGOUT } from "../../redux/actions"
import { IAppState } from "../../redux/ReducerTypes"

export default function Feed(props: any) {
  const state = useSelector(function (state: IAppState) {
    return state
  })

  function logout() {
    props.dispatch({ type: LOGOUT })}

  return (
    <div>



      
      Main Feed<button onClick={logout}>Logout</button>
    </div>
  )
}
