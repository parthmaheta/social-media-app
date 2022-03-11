import axios from "axios"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { DOMAIN } from "../../../../Constants"
import { LOGOUT } from "../../../../redux/actions"
import { IAppState } from "../../../../redux/ReducerTypes"
import "./Friend.scss"

interface Friend {
  name: string
  email: string
  dob: string
  gender: string
  profilePic: string
  hasSentRequest: boolean
  hasReceivedRequest: boolean
  isFriend: boolean
}

function FriendDetail() {
  const { uid } = useParams()
  const user = useSelector((state: IAppState) => state.user)
  const dispatch = useDispatch()
  const [friend, setFriend] = useState<null | Friend>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    axios
      .get(DOMAIN + "friend/" + uid, {
        headers: { Authorization: user.token as string },
      })
      .then((res) => {
        if (res.status === 200) setFriend(res.data)
      })
      .catch((err) => {
        if (err.response.status === 401) {
          dispatch({ type: LOGOUT })
        } else alert("Something Went Wrong")
      })
  }, [])

  const sendFriendRequest = async () => {
         setIsSubmitting(true)
    try {

         const response =await axios.post(DOMAIN,{})

    } catch (e) {}
  }

  if (!friend)
    return (
      <div
        className="container"
        style={{ fontSize: "3rem", textAlign: "center" }}
      >
        Loading...
      </div>
    )

  return (
    <div className="container">
      <h1>Profile</h1>
      <div className="profile">
        <div className="col1">
          <img src={DOMAIN.slice(0, -4) + friend.profilePic} alt="profile" />
        </div>
        <div className="col2">
          <div>
            <span className="label">Name</span>
            <span className="text">{friend.name}</span>
          </div>
          <div>
            <span className="label">email</span>
            <span className="text">{friend.email}</span>
          </div>
          <div>
            <span className="label">BirthDay:</span>

            <span className="text">{new Date(friend.dob).toDateString()}</span>
          </div>
          {friend.isFriend && (
            <button
              disabled={isSubmitting}
              style={{ color: "red", marginLeft: "1rem" }}
            >
              unfriend
            </button>
          )}
          {friend.hasSentRequest && (
            <button disabled={isSubmitting}>accept request</button>
          )}
          {friend.hasReceivedRequest && (
            <button
              disabled={isSubmitting}
              style={{ color: "red", marginLeft: "1rem" }}
            >
              cancel request
            </button>
          )}
          {!friend.isFriend &&
            !friend.hasSentRequest &&
            !friend.hasReceivedRequest &&
            user.profilePic != friend.profilePic && (
              <button disabled={isSubmitting} style={{ marginLeft: "1rem" }}>
                send request
              </button>
            )}
        </div>
      </div>
    </div>
  )
}

export default FriendDetail
