import React from "react"
import LatestPosts from "./Posts"
import Menu from "../Menu"
import CreatePost from "./CreatePost"

export default function Feed(props: any) {
  return (
    <>
      <Menu />
      <CreatePost />
      <LatestPosts />
    </>
  )
}
