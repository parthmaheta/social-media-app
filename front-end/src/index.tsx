import React from "react"
import ReactDOM from "react-dom"
import { store } from "./redux/store"
import { Provider } from "react-redux"
import "../public/index.scss"
import Home from "./components/Home"
import CustomRouter from "./components/WithRouter"

const App = () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <CustomRouter />
      </Provider>
    </React.StrictMode>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
