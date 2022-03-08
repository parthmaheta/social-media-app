import { applyMiddleware, combineReducers, createStore, AnyAction } from "redux"
import thunk from "redux-thunk"
import { LOGIN_SUCCESS, LOGOUT, SETUSER } from "./actions"
import { IAppState, IUser } from "./ReducerTypes"

const initialState: IUser = {
  token: localStorage.getItem("token"),
  name: "",
  profilePic: "",
  dob: "",
  gender: null,
}

function userReducer(state: IUser = initialState, action: AnyAction) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.token)
      return { ...state, ...action.payload }
    case LOGOUT:
      localStorage.clear()
      return { token: null, name: "", profilePic: "", dob: "", gender: null }
    case SETUSER:
      return { ...action.payload }
    default:
      return state
  }
}

export const store = createStore(
  combineReducers<IAppState>({ user: userReducer }),
  applyMiddleware(thunk)
)
