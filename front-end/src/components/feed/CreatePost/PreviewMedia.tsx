import React,{LegacyRef, useEffect} from "react"


export default function PreviewMedia(props: { file: File }) {
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
