import axios, { AxiosError } from "axios"
import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, useNavigate } from "react-router-dom"
import { DOMAIN } from "../../../Constants"
import { LOGOUT } from "../../../redux/actions"
import { IAppState } from "../../../redux/ReducerTypes"
import FriendList from "../FriendList"
import "./search.scss"

export default function SearchFriend() {
  const user = useSelector((state: IAppState) => state.user)
  const dispatch = useDispatch()

  const [searchText, setSearchText] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [fetchStatus, setFetchStatus] = useState({
    hasError: false,
    friends: [],
    hasFetched: false,
  })

  async function search() {
    setIsSubmitting(true)
    try {
      const response = await axios.get(
        DOMAIN + "friend/?search=" + searchText.replace(/ /g, "+"),
        {
          headers: {
            Authorization: user.token as string,
          },
        }
      )
      if (response.status === 200) {
        setFetchStatus({
          hasError: false,
          friends: response.data,
          hasFetched: true,
        })
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response?.status === 401) {
          dispatch({ type: LOGOUT })
        }
      }

      setFetchStatus({ hasError: true, friends: [], hasFetched: true })
    }
    setIsSubmitting(false)
  }

  return (
    <div className="container">
      <div className="inputContainer">
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search"
        />
        <button onClick={search} disabled={isSubmitting}>
          Search
        </button>
      </div>
      {fetchStatus.hasFetched && (
        <SearchResult
          hasError={fetchStatus.hasError}
          friends={fetchStatus.friends}
          searchText={searchText}
        />
      )}
    </div>
  )
}

function SearchResult(props: {
  hasError: boolean
  friends: any[]
  searchText: string
}) {
  if (props.hasError) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "3rem",
          color: "red",
          fontSize: "2rem",
        }}
      >
        something went wrong
      </div>
    )
  } else if (props.friends.length == 0) {
    return (
      <div style={{ textAlign: "center", padding: "3rem", fontSize: "2rem" }}>
        No Results found
      </div>
    )
  }

  return (
    <>
      <h3 style={{ textAlign: "center", fontSize: "2rem" }}>
        Search Results For "{props.searchText}"
      </h3>
      <div className="list">
        {props.friends.map((friend: any) => {
          return (
            <NavLink className="card" key={friend._id} to={friend._id}>
              <img
                src={DOMAIN.slice(0, -4) + friend.profilePic}
                alt="profile"
              />
              <span>{friend.name}</span>
            </NavLink>
          )
        })}
      </div>
    </>
  )
}
