import React from "react"
import { useDispatch } from "react-redux"
import { Link, NavLink } from "react-router-dom"
import "./menu.scss"

const Menu: React.FC = () => {
  const dispatch = useDispatch()
  return (
    <>
      <div className="nav">
        <NavLink to="/feed" className="nav-item">
          <img src="./icons/feed.png" className="nav-item-icon" alt="feed" />
          <span className="nav-item-text">Posts</span>
        </NavLink>

        <NavLink to="/friend" className="nav-item">
          <img src="./icons/user.png" className="nav-item-icon" alt="friend" />
          <span className="nav-item-text">Friend</span>
        </NavLink>
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
          <span className="nav-item-text">Account</span>
          <div className="nav-item-submenu">
            <Link to="/account">More</Link>
            <span onClick={() => dispatch({ type: "LOGOUT" })}>Logout</span>
          </div>
        </div>
      </div>
      {/*add empty space of height of navbar*/}
      <div style={{ marginTop: "5rem" }}></div>
    </>
  )
}
export default Menu
