import React from "react"
import { useParams } from "react-router-dom"

function FriendDetail() {
  const { uid } = useParams()

  return <div>{uid}Hellow</div>
}

export default FriendDetail
