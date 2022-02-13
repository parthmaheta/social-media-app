import axios, { AxiosResponse } from "axios"
import React, { ChangeEvent, Component } from "react"
import { DOMAIN } from "../../Constants"
import "./login.scss"

interface IProps {}
interface IState {
  password: string
  email: string
  errors: IError
  isSubmitting: boolean
}
interface IError {
  email?: string
  password?: string
}
class Login extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)
    this.state = {
      email: "",
      password: "",
      isSubmitting: false,
      errors: {
        email: "",
        password: "",
      },
    }
  }

  validateForm(): boolean {
    const err: IError = {}
    if (this.state.email == "") err.email = "Email is required"
    if (this.state.password == "") err.password = "Password is required"
    if (Object.keys(err).length > 0) {
      this.setState({ errors: err })
      return false
    }
    return true
  }

  submitForm = async (e: any) => {
    this.setState({ isSubmitting: true })
    if (this.validateForm()) {
      try {
        const response: AxiosResponse = await axios.post(DOMAIN + "login/", {
          email: this.state.email,
          password: this.state.password,
        })
        console.log("success", response.data)
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status == 401) {
            console.log("401", error.response.data)
          } else {
            console.log("server error")
          }
        } else {
          alert("something went wrong")
        }
      }
    }
    this.setState({ isSubmitting: false })
  }

  togglePassword = (e: any) => {
    const password = document.getElementById(
      "loginPassword"
    ) as HTMLInputElement
    if (password.type === "password") {
      password.type = "text"
    } else {
      password.type = "password"
    }
  }

  setValue = (e: ChangeEvent<HTMLInputElement>) => {
    let errors = { ...this.state.errors, [e.target.name]: "" }
    let value = {
      [e.currentTarget.name]: e.currentTarget.value,
      errors,
    } as unknown
    this.setState(value as Pick<IState, keyof IState>)
  }

  render() {
    return (
      <div className="login-form">
        <div className="form-control">
          <label>Email</label>
          <input
            name="email"
            value={this.state.email}
            onChange={this.setValue}
            type="email"
            placeholder="Enter Email"
          />
          <span
            style={{ color: "red", marginTop: "0.5rem", fontSize: "1.2rem" }}
          >
            {this.state.errors.email}
          </span>
        </div>

        <div className="form-control">
          <label>Password</label>
          <div style={{ width: "100%", position: "relative" }}>
            <input
              type="password"
              name="password"
              id="loginPassword"
              placeholder="Enter Password"
              onChange={this.setValue}
              style={{ width: "100%" }}
              value={this.state.password}
            />
            <img
              src="./icons/eye.png"
              onClick={this.togglePassword}
              style={{
                position: "absolute",
                right: "0",
                top: "0",
                width: "30px",
              }}
            />
          </div>
          <span
            style={{ color: "red", marginTop: "0.5rem", fontSize: "1.2rem" }}
          >
            {this.state.errors.password}
          </span>
        </div>
        <div style={{ textAlign: "center" }}>
          <button
            disabled={this.state.isSubmitting}
            className={this.state.isSubmitting ? "disabled" : "login-btn"}
            onClick={this.submitForm}
          >
            Login
          </button>
        </div>
      </div>
    )
  }
}

export default Login
