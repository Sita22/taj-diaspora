import { useState, useEffect } from "react";
import { useParams } from "react-router"

export default function Post() {
  let params = useParams();
  const baseUrl = "http://localhost:3000/";
  const [post, setPost] = useState({});

  //TODO display comments by comment details 
  //TODO if no comments, ??

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
    </>
  )
}