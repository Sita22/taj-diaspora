import { useState, useEffect } from "react";
import { useParams } from "react-router"
import { addComment } from "../../Services/ApiClient";

export default function Post({ user }) {
  let params = useParams();
  const baseUrl = "http://localhost:3000/";
  const [post, setPost] = useState({});
  const [content, setContent] = useState("");

  function handleContent(event) {
    const newContent = event.target.value;
    setContent(newContent);
  }

  async function handleOnSubmit(event) {
    event.preventDefault();
    const newComment = await addComment(content, post._id, user._id);
    setPost(prevPost => ({
      ...prevPost,
      comments: [
        ...prevPost.comments,
        newComment
      ]
    }));
    setContent("");
    return <p>Post successfully created!</p>
  }

  useEffect(() => {
    if (params !== undefined) {
      async function fetchPost() {
        try {
          const data = await fetch(`${baseUrl}posts/${params.postId}`);
          if (!data.ok) {
            throw new Error(`Response status: ${data.status}`);
          }
          const json = await data.json();
          setPost(json);
        } catch (err) {
          console.log(err);
        }
      }
      fetchPost();
    }
  }, [])

  return (
    <>
      <h1>{post.title}</h1>
      <h2>{post.author?.username}</h2>
      <p>{post.content}</p>
      {
        post.comments && post.comments.length > 0
          ? post.comments.map(comment => {
            return (
              <div key={comment._id}>
                <h3>Comments</h3>
                <p>{comment.content}</p>
                <p>{comment.author.username}</p>
              </div>
            )
          })
          : <p>No comments yet</p>
      }
      <div className="add-comment-container">
        <h1>Add a new comment</h1>
        <form className="comment-form" action="" onSubmit={handleOnSubmit}>
          <label htmlFor="">Content</label>
          <textarea value={content} onChange={handleContent} rows={7} placeholder="Insert a content..." />
          <button type="submit">Create</button>
        </form>
      </div>
    </>
  )
}