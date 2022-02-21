import React from "react"
import { useSelector } from "react-redux"
import Menu from "../Menu"

function index() {
  const state = useSelector((state) => state)
  console.log(state)

  return (
    <>
      <Menu />
    </>
  )
}

export default index
