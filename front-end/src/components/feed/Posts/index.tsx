import React from "react"
import "./posts.scss"

function Posts() {
  return (
    <div className="posts">
      <Post media=".mp4" />
      <Post media=".mp3" />
      <Post media=".jpg" />
    </div>
  )
}

function Post(props: { media: string }) {
  return (
    <div className="post">
      <PostData />
      <Media url={props.media} />
      <PostText />
      <PostButtons />
    </div>
  )
}

function PostData() {
  return <div className="post-data">author</div>
}

function PostText() {
  return <div className="post-text">/</div>
}

function Media(props: { url: string }) {
  return (
    <div className="post-media">
      {props.url.includes(".mp3") && (
        <audio controls>
          <source src={props.url} />
        </audio>
      )}
      {props.url.match(/\.(mp4|ogg|webm)$/) && (
        <video controls>
          <source src={props.url} />
        </video>
      )}
      {props.url.match(/\.(jpe?g|png|gif)$/) && <img src={props.url} />}
    </div>
  )
}

function PostButtons() {
  return (
    <div className="post-buttons">
      <div className="post-button">
        <img src="./icons/like.png" title="Like" alt="Like" />
        <span>Like</span>
      </div>
      <div className="post-button">
        <img src="./icons/comment.png" title="Comment" alt="Comment" />
        <span>Comment</span>
      </div>
      <div className="post-button">
        <img src="./icons/share.png" title="Share" alt="Share" />
        <span>Share</span>
      </div>
    </div>
  )
}
export default Posts
