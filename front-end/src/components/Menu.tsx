import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, Navigate, NavLink, useLocation } from "react-router-dom"
import "./menu.scss"
import { IAppState } from "../redux/ReducerTypes"
import { LOGOUT } from "../redux/actions"

const Menu: React.FC = () => {
  const dispatch = useDispatch()
  const token = useSelector((state: IAppState) => state.user.token)
  const location = useLocation()

  if (!token) return <Navigate to="/" />

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
export default Menu
