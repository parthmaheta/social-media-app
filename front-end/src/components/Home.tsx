import React, { ReactNode, useState } from "react"
import { connect, MapStateToPropsParam } from "react-redux"
import "./Home.scss"
import { IAppState } from "../redux/ReducerTypes"

import { Navigate } from "react-router-dom"
import { CombinedState } from "redux"

interface IProps {
  token: null | string
}

const Home: React.FC<IProps> = (props) => {
  return props.token ? <Navigate to="feed" /> : <Navigate to="login" />
}

const mapStateToProps = (
  state: CombinedState<IAppState>
): { token: null | string } => {
  return {
    token: state.user.token,
  }
}

export default connect(mapStateToProps)(Home)
