import { applyMiddleware, combineReducers, createStore, AnyAction } from "redux"
import thunk from "redux-thunk"
import { LOGIN_SUCCESS } from "./actions"

interface IUser {
  name: string
}

function UserReducer(
  state: IUser = { name: "Unknown" },
  action: AnyAction
): IUser {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        name: action.payload.name,
      }

    default:
      return state
  }
}

export const store = createStore(
  combineReducers({ User: UserReducer }),
  applyMiddleware(thunk)
)
