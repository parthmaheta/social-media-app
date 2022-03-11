import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, Navigate, NavLink, useLocation } from "react-router-dom"
import "./menu.scss"
import { IAppState } from "../redux/ReducerTypes"
import { LOGOUT, SETUSER } from "../redux/actions"
import { DOMAIN } from "../Constants"
import axios from "axios"
import { Dispatch } from "redux"

const Menu: React.FC = () => {
  const dispatch = useDispatch()
  const user = useSelector((state: IAppState) => state.user)
  const location = useLocation()

  if (!user.token) return <Navigate to="/" />
  useEffect(() => {
    if (!user.name) fetchUserFromServer(user.token, dispatch)
  }, [])

  return (
    <>
      <div className="nav">
        <NavLink to="/feed" className="nav-item">
          <img src="./icons/feed.png" className="nav-item-icon" alt="feed" />
          <span className="nav-item-text">Posts</span>
        </NavLink>

        <div className="nav-item">
          <img src="./icons/user.png" className="nav-item-icon" alt="friend" />
          <span
            className="nav-item-text"
            style={{
              color: location.pathname.startsWith("/friend")
                ? "#000"
                : "inherit",
            }}
          >
            Friend
          </span>
          <div className="nav-item-submenu">
            <Link to="/friends/search">Search</Link>
            <Link to="/friends">My Friends</Link>
          </div>
        </div>
        <NavLink to="/message" className="nav-item">
          <img
            src="./icons/message.png"
            className="nav-item-icon"
            alt="message"
          />
          <span className="nav-item-text">Message</span>
        </NavLink>
        <div className="nav-item">
          <img
            src="./icons/user.png"
            className="nav-item-icon"
            alt="user icon"
          />
          <span
            className="nav-item-text"
            style={{
              color: location.pathname == "/account" ? "#000" : "inherit",
            }}
          >
            Account
          </span>
          <div className="nav-item-submenu">
            <Link to="/account">More</Link>
            <span onClick={() => dispatch({ type: LOGOUT })}>Logout</span>
          </div>
        </div>
      </div>
      {/*add empty space of height of navbar*/}
      <div style={{ marginTop: "5rem" }}></div>
    </>
  )
}

export async function fetchUserFromServer(
  token: string | null,
  dispatch: Dispatch
) {
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
export default Menu
