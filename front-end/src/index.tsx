import React from "react"
import ReactDOM from "react-dom"
import { store } from "./redux/store"
import { Provider } from "react-redux"
import Sidebar from "./components/Sidebar/Sidebar"
import "../public/index.scss"

const App = () => {
  return (
    <React.StrictMode>
      <Provider store={store}>
        <div className="mainlayout">
          <div className="col1">
            <Sidebar />
          </div>
          <div className="col2">This Is Main</div>
        </div>
      </Provider>
    </React.StrictMode>
  )
}

ReactDOM.render(<App />, document.getElementById("root"))
