import axios from "axios"
import React, { useState, useEffect, useRef, LegacyRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { DOMAIN } from "../../../Constants"
import { LOGOUT } from "./../../../redux/actions"
import { IAppState } from "../../../redux/ReducerTypes"
import "./createpost.scss"

function CreatePost() {
  const user = useSelector((state: IAppState) => state.user)
  const dispatch = useDispatch()
  const [file, setFile] = useState<File | null>()
  const [postText, setPostText] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const uploadPost = () => {
    setIsSubmitting(true)
    if (!file && !postText) return alert("Please enter something")
    const formData = new FormData()
    if (file) formData.set("media", file)
    if (postText) formData.set("postText", postText)

    axios
      .post(DOMAIN + "post/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: user.token as string,
        },
      })
      .then((res) => {
        alert("Post created successfully")
        setFile(null)
        setPostText("")
        setIsSubmitting(false)
      })
      .catch((err) => {
        if (err.response.status === 401) {
          dispatch({ type: LOGOUT })
        } else {
          alert("Something went wrong")

          setIsSubmitting(false)
        }
      })
  }

  return (
    <div className="CreatePostContainer">
      <div className="firstRow">
        {file ? (
          <PreviewMedia file={file} />
        ) : (
          <img
            src={"./img/" + user.profilePic}
            alt="Preview"
            className="previewMedia"
            style={{ borderRadius: "50%" }}
          />
        )}

        <textarea
          placeholder="What's In Your Mind ?"
          className="postTextArea"
          required={!file}
          value={postText}
          onChange={(e) => {
            setPostText(e.currentTarget.value)
          }}
        />
      </div>
      <div className="secondRow">
        <label className="uploadLabel" title="Upload Media">
          {file ? "Change Media" : "Add Media"}
          <input
            type="file"
            className="uploadBtn"
            accept="image/*,audio/*,video/*"
            onChange={(e) => {
              if (e.target.files) {
                setFile(e.target.files[0])
              }
            }}
          />
        </label>
        <button
          className="shareBtn"
          onClick={uploadPost}
          disabled={isSubmitting}
        >
          Share
        </button>
      </div>
    </div>
  )
}

function PreviewMedia(props: { file: File }) {
  let ref = React.createRef()

  useEffect(() => {
    ;(ref.current as HTMLMediaElement)?.load()
  }, [props.file])

  if (/^image\/(.)*$/.test(props.file.type)) {
    return (
      <div>
        <img
          src={URL.createObjectURL(props.file)}
          alt="Preview"
          className="previewMedia"
          style={{ borderRadius: "50%" }}
        />
        <br />
        <span>{props.file.name}</span>
      </div>
    )
  } else if (/^audio\/(.)*$/.test(props.file.type)) {
    return (
      <div>
        <audio
          controls
          className="previewMedia"
          ref={ref as LegacyRef<HTMLAudioElement>}
        >
          <source src={URL.createObjectURL(props.file)} id="previewAudio" />
        </audio>
        <br />
        <span>{props.file.name}</span>
      </div>
    )
  } else if (/^video\/(.)*$/.test(props.file.type)) {
    return (
      <div>
        <video
          controls
          className="previewMedia"
          ref={ref as LegacyRef<HTMLVideoElement>}
        >
          <source src={URL.createObjectURL(props.file)} id="previewVideo" />
        </video>
        <br />
        <span>{props.file.name}</span>
      </div>
    )
  } else {
    return <>sorry file not supported</>
  }
}

export default CreatePost
