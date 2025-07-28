import { useState, useEffect } from "react";
import { useParams, Link } from "react-router"
import { addComment } from "../../Services/ApiClient";
import './postItem.css'
import { formatDistanceToNow } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faHeart, faChevronLeft } from '@fortawesome/free-solid-svg-icons'

export default function PostItem({ setPosts, user }) {
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
      setPost(updatedPost);
      setPosts((prevList) => ({ ...prevList, [updatedPost._id]: { ...updatedPost } }));
    } else {
      action = "decrement";
      const updatedPost = await updateLikeStatus(action, post._id);
      setPost(updatedPost);
      setPosts((prevList) => ({ ...prevList, [updatedPost._id]: { ...updatedPost } }));
    }
  }

  async function handleOnSubmit(event) {
    event.preventDefault();
    const newComment = await addComment(content, post._id, user._id);
    //AI support on the usage of the spread operators
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

  //suggestion from AI to use ?-marks since I was getting errors for the post and comment to be undefined
  return (
    <>
      {
        !loading ? (
          <div className="post-container">
            <div className="go-back">
              <Link to={"/"}>
                <FontAwesomeIcon icon={faChevronLeft} />
              </Link>
              <h4>Post</h4>
            </div>
            <div className="post-content">
              <div className='user-details'>
                <img src="/avatar.jpg" alt="" />
                <div>
                  <h4>{post.author?.username}</h4>
                  <p>{post?.timestamp ? formatDistanceToNow(new Date(post?.timestamp)) : ""} ago</p>
                </div>
              </div>
              <h2>{post.title}</h2>
              <p>{post.content}</p>
            </div>
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
                    <div key={comment._id} className="comment-container">
                      <h3>Comments</h3>
                      <div className='user-details'>
                        <img src="/avatar.jpg" alt="" />
                        <div className="comment-details">
                          <h4>{comment.author.username}</h4>
                          <p className="comment-content">{comment.content}</p>
                          <p className="comment-date">{post?.timestamp ? formatDistanceToNow(new Date(post?.timestamp)) : ""} ago</p>
                        </div>
                      </div>
                    </div>
                  )
                })
                : <div className="comment-container">
                  <h3>No comments yet</h3>
                </div>
            }
            <div className="add-comment-container">
              <h4>Add a new comment</h4>
              <form className="comment-form" action="" onSubmit={handleOnSubmit}>
                <textarea value={content} onChange={handleContent} rows={7} placeholder="Insert a content..." />
                <div className="button-container">
                  <button type="submit">Create</button>
                </div>
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