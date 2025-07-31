import './postList.css'
import { Link } from 'react-router';
import { formatDistanceToNow } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faHeart, faCircleInfo, faUser } from '@fortawesome/free-solid-svg-icons'

export default function PostList({ posts, setPosts, user }) {
  const baseUrl = import.meta.env.VITE_BASEURL;

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

  return (
    <>
      {
        !posts ?
          <p>
            <FontAwesomeIcon icon={faCircleInfo} color="#69140e" />
            Not posts yet
          </p>
          :
          Object.values(posts).slice().sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
          .map(post => {
            return (
              <div key={post._id} className='post-teaser'>
                  <div className='above-post-text'>
                    <div className='user-details'>
                      {
                        post.author._id === "6888fdcf0914201a3dbef2ee" ? (
                          <img src="/avatar.jpg" alt="" />
                        ) : (
                          <div className='user-icon'>
                            <FontAwesomeIcon icon={faUser} color="#69140e" size="lg" />
                          </div>
                        )
                      }
                      <div>
                        <h4>{post?.author?.username}</h4>
                        <p>{formatDistanceToNow(new Date(post.timestamp))} ago</p>
                      </div>
                    </div>
                    <div className='topic'>
                      {post?.topicId?.title}
                    </div>
                  </div>
                  <div className='title-content'>
                    <Link to={`/posts/${post._id}`}>
                      <h3>{post.title}</h3>
                    </Link>
                    <p>{post.content}</p>
                  </div>
                  <div className='post-details'>
                    <p>
                      <FontAwesomeIcon
                        icon={faHeart}
                        size="lg"
                        color={post.likes.includes(user._id) ? "#a44200" : "#2c2c2c"}
                        onClick={() => handleLike(post)} />
                      {post.likes.length}
                    </p>
                    <p>
                      <FontAwesomeIcon
                        icon={faComment}
                        size="lg"
                        color="#2c2c2c"
                      />
                      {post.comments.length}
                    </p>
                  </div>
                </div>
              )
            })
      }
    </>
  )
}