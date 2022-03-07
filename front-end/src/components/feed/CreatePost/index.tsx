import React, { useState, useEffect, useRef, LegacyRef } from "react"
import { useSelector } from "react-redux"
import { IAppState } from "../../../redux/ReducerTypes"
import "./createpost.scss"

function CreatePost() {
  const user = useSelector((state: IAppState) => state.user)
  const [file, setFile] = useState<File>()

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
        <button className="shareBtn">Share</button>
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
