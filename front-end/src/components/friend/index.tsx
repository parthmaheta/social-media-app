import React from "react"
import { Outlet } from "react-router-dom"
import Menu from "../Menu"

function Friend() {
  return (
    <>
      <Menu />
      <Outlet />
    </>
  )
}

export default Friend
