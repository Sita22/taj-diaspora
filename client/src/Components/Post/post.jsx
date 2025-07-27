import { useState, useEffect } from "react";
import { useParams } from "react-router"
import { addComment } from "../../Services/ApiClient";
import './post.css'
import { formatDistanceToNow } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faHeart } from '@fortawesome/free-solid-svg-icons'

export default function Post({ setPosts, user }) {
  let params = useParams();
  const baseUrl = "http://localhost:3000/";
  const [post, setPost] = useState({});
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  function handleContent(event) {
    const newContent = event.target.value;
    setContent(newContent);
  }

  async function updateLikeStatus(action, postId) {
    try {
      const data = await fetch(`${baseUrl}posts/${postId}/${user._id}/${action}`, {
        method: "PUT"
      });
      if (!data.ok) {
        throw new Error("Reponse status: ", data.status);
      }
      const json = await data.json();
      return json;
    } catch (err) {
      console.log(err);
    }
  }

  async function handleLike(post) {
    let action = "";
    if (!post.likes.includes(user._id)) {
      action = "increment";
      const updatedPost = await updateLikeStatus(action, post._id);
      setPosts((prevList) => ({ ...prevList, [updatedPost._id]: { ...updatedPost } }));
    } else {
      action = "decrement";
      const updatedPost = await updateLikeStatus(action, post._id);
      setPosts((prevList) => ({ ...prevList, [updatedPost._id]: { ...updatedPost } }));
    }
  }

  //TODO display status after submitting form
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
          setLoading(false);
        } catch (err) {
          console.log(err);
        }
      }
      fetchPost();
    }
  }, [params.postId])

  return (
    <>
      {
        !loading ? (
          <div className="post-container">
            <div className='user-details'>
              <img src="/avatar.jpg" alt="" />
              <div>
                <h4>{post.author?.username}</h4>
                <p>{post?.timestamp ? formatDistanceToNow(new Date(post?.timestamp)) : ""} ago</p>
              </div>
            </div>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            <div className='post-details'>
              <p>
                <FontAwesomeIcon
                  icon={faHeart}
                  size="lg"
                  color={post?.likes?.includes(user._id) ? "#cb2a2a" : "#2c2c2c"}
                  onClick={() => handleLike(post)} />
                {post?.likes?.length}
              </p>
              <p>
                <FontAwesomeIcon
                  icon={faComment}
                  size="lg"
                  color="#2c2c2c"
                />
                {post?.comments?.length}
              </p>
            </div>
            {
              post?.comments && post?.comments?.length > 0
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
              <h4>Add a new comment</h4>
              <form className="comment-form" action="" onSubmit={handleOnSubmit}>
                <textarea value={content} onChange={handleContent} rows={7} placeholder="Insert a content..." />
                <button type="submit">Create</button>
              </form>
            </div>
          </div>
        ) : 
        (
          <p>Loading...</p>
        )
      
    }

    </>
  )
}