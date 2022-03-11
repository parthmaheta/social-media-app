import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react"
import { useDispatch, useSelector } from "react-redux"
import { DOMAIN } from "../../Constants"
import { IAppState } from "../../redux/ReducerTypes"
import Menu from "../Menu"
import "./account.scss"
import axios from "axios"
import { SETUSER } from "../../redux/actions"

function index() {
  const user = useSelector((state: IAppState) => state.user)
  const dispatch = useDispatch()
  const [dob, setDob] = useState(user.dob.slice(0, user.dob.indexOf("T")))
  const [name, setName] = useState(user.name)
  const [gender, setGender] = useState(user.gender as string)
  const [file, setFile] = useState<File | null>()
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    setName(user.name)
    setGender(user.gender as string)
    setDob(user.dob.slice(0, user.dob.indexOf("T")))
  }, [user])

  const updateAccount = async () => {
    setIsSubmitting(true)
    try {
      const formData = new FormData()
      formData.set("name", name)
      formData.set("dob", dob + "Z")
      formData.set("gender", gender)
      let response
      if (file) {
        formData.set("profilePic", file)
        response = await axios.put(DOMAIN + "user/", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: user.token as string,
          },
        })
      } else {
        response = await axios.put(DOMAIN + "user/", formData, {
          headers: {
            Authorization: user.token as string,
          },
        })
      }

      if (response.status === 200) {
        dispatch({
          type: SETUSER,
          payload: { ...response.data, token: user.token },
        })
        alert("Details Updated")
      }
    } catch (e) {
      alert("Error Updating Details")
    }
    setIsSubmitting(false)
  }

  return (
    <>
      <Menu />
      <div className="container">
        <ProfileImage
          img={DOMAIN.slice(0, -4) + user.profilePic}
          setFile={setFile}
        />
        <div className="account-info">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
          />
        </div>
        <div className="account-info">
          <label>DOB</label>
          <input
            type="Date"
            value={dob}
            onChange={(e) => setDob(e.currentTarget.value)}
          />
        </div>
        <div className="account-info">
          <label>Gender</label>
          <select
            value={gender ? gender : "M"}
            onChange={(e) => setGender(e.currentTarget.value)}
          >
            <option value="M">Male</option>
            <option value="F">Female</option>
            <option value="O">Other</option>
          </select>
        </div>
        <button disabled={isSubmitting} onClick={updateAccount}>
          Save
        </button>
      </div>
    </>
  )
}

export default index

function ProfileImage(props: {
  img: string
  setFile: Dispatch<SetStateAction<File | null | undefined>>
}) {
  const updatePic = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      document
        .getElementById("rowProfile")
        ?.setAttribute("src", URL.createObjectURL(e.target.files[0]))
      props.setFile(e.target.files[0])
    }
  }

  return (
    <div className="rowProfile">
      <img src={props.img} alt="profileImage" id="rowProfile" />
      <label>
        Change
        <input type="file" onChange={updatePic} accept="image/*" />
      </label>
    </div>
  )
}
