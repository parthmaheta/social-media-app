export interface IUser {
  name: string
  profilePic: string
  dob: string
  token: string | null
  gender: "M" | "F" | "O" | null
}

export interface IAppState {
  user: IUser
}
