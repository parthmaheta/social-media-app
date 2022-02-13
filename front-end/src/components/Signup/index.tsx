import axios, { Axios, AxiosError, AxiosResponse } from "axios"
import React, { ChangeEvent, FormEvent, MouseEvent } from "react"
import { DOMAIN } from "../../Constants"

interface IProps {}
interface IError {
  name?: string
  email?: string
  password?: string
  dob?: string
  gender?: string
}
type gender = "M" | "F" | "O"
interface IState {
  name: string
  email: string
  password: string
  dob: string
  gender: gender
  errors: IError
  isSubmitting: boolean
}

class SignUp extends React.Component<IProps, IState> {
  constructor(props: Readonly<IProps>) {
    super(props)
    this.state = {
      name: "",
      email: "",
      password: "",
      dob: "",
      gender: "M",
      isSubmitting: false,
      errors: {
        name: "",
        email: "",
        password: "",
        dob: "",
        gender: "",
      },
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

  validateForm(): boolean {
    let errors: IError = {}
    if (this.state.name == "") errors.name = "name is required"

    if (this.state.email == "") errors.email = "email is required"

    if (this.state.dob == "") errors.dob = "dob is required"

    if (this.state.password == "") errors.password = "password is required"

    if (Object.keys(errors).length > 0) {
      this.setState({ errors: errors })
      return false
    }
    return true
  }

  submitForm = async (event: MouseEvent<HTMLButtonElement>) => {
    this.setState({ isSubmitting: true })
    if (this.validateForm()) {
      try {
        const result: AxiosResponse = await axios.post(DOMAIN + "user/", {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
          dob: this.state.dob + "Z",
          gender: this.state.gender,
        })
        alert("Success")
      } catch (error) {
        if (axios.isAxiosError(error)) {
          //validation error
          if (error.response?.status == 400) {
            const err = error.response.data.errors
            const newError = {}
            var i = 0
            for (const key in err) {
              newError[key as keyof Object] = err[key].message
              i++
            }

            this.setState({ errors: { ...this.state.errors, ...newError } })
          }
          //email already exist
          else if (error.response?.status == 401) {
            this.setState({
              errors: { ...this.state.errors, email: "Email Already Exist" },
            })
          }
        } else {
          alert("something went wrong")
        }
      }
    }

    this.setState({ isSubmitting: false })
  }

  togglePassword = () => {
    let password = document.getElementById("signupPassword") as HTMLInputElement
    if (password.type === "password") {
      password.type = "text"
    } else {
      password.type = "password"
    }
  }

  changeAvatar = (e: FormEvent<HTMLSelectElement>) => {
    let images = {
      M: "./img/male_default_avatar.jpg",
      F: "./img/female_default_avatar.jpg",
      O: "./img/other_default_avatar.jpg",
    }
    let avatar = document.getElementById("signupavatar") as HTMLImageElement
    avatar.src = images[e.currentTarget.value as keyof typeof images]
    this.setState({ gender: e.currentTarget.value as gender })
  }

  render() {
    return (
      <div style={{ padding: "1rem" }}>
        <form className="form">
          <div className="form-control">
            <label>Name</label>
            <input
              name="name"
              onChange={this.setValue}
              type="text"
              placeholder="Your Name"
            />
            <span className="signup-error-msg">{this.state.errors.name}</span>
          </div>
          <div className="form-control">
            <label>DOB</label>
            <input
              name="dob"
              type="Date"
              onChange={this.setValue}
              placeholder="Enter Dob"
            />
            <span className="signup-error-msg">{this.state.errors.dob}</span>
          </div>
          <div className="form-control">
            <label>Email</label>
            <input
              name="email"
              type="email"
              onChange={this.setValue}
              placeholder="Email"
            />
            <span className="signup-error-msg">{this.state.errors.email}</span>
          </div>

          <div className="form-control">
            <label>Password</label>
            <div style={{ position: "relative" }}>
              <input
                id="signupPassword"
                name="password"
                type="password"
                onChange={this.setValue}
                placeholder="Enter Strong Password"
                style={{ width: "100%" }}
              />
              <img
                src="./icons/eye.png"
                style={{
                  position: "absolute",
                  right: "0px",
                  top: "4px",
                  width: "40px",
                  height: "35px",
                }}
                onClick={() => {
                  this.togglePassword()
                }}
              ></img>
              <span className="signup-error-msg">
                {this.state.errors.password}
              </span>
            </div>
          </div>

          <div className="form-control">
            <img
              id="signupavatar"
              src="./img/male_default_avatar.jpg"
              style={{ borderRadius: "50%", height: "100px", width: "100px" }}
            />
          </div>
          <div className="form-control">
            <label>Select Gender</label>
            <select
              defaultValue={"M"}
              name="gender"
              onChange={this.changeAvatar}
            >
              <option value={"M"}>Male</option>
              <option value={"F"}>Female</option>
              <option value={"O"}>Other</option>
            </select>
            <span className="signup-error-msg">{this.state.errors.gender}</span>
          </div>
        </form>
        <div style={{ textAlign: "center" }}>
          <button
            onClick={this.submitForm}
            disabled={this.state.isSubmitting}
            className={this.state.isSubmitting ? " btn-disabled" : "btn-submit"}
          >
            SignUp
          </button>
        </div>
      </div>
    )
  }
}

export default SignUp
