import React from "react"
import ReactDOM from "react-dom"
import { store } from "./redux/store"
import { Provider } from "react-redux"
import "../public/index.scss"
import Home from "./components/Home"

const App = () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <div className="main-layout">
          <h1
            style={{
              textAlign: "center",
              fontSize: "2.5rem",
              color: "#fff",
            }}
          >
            Welcome User
          </h1>
          <Home />
        </div>
      </Provider>
    </React.StrictMode>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
