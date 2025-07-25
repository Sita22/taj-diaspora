import './postList.css'
import { Link } from 'react-router';
import { formatDistanceToNow } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faHeart } from '@fortawesome/free-solid-svg-icons'

export default function PostList({ posts, setPosts }) {
  const baseUrl = "http://localhost:3000/";

  async function updateLikeStatus(action, postId) {
    try {
      const data = await fetch(`${baseUrl}posts/${postId}/${action}`, {
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
    if (!post.liked) {
      action = "increment";
      const updatedPost = await updateLikeStatus(action, post._id);
      setPosts((prevList) => ({ ...prevList, [updatedPost._id]: {...updatedPost, liked: true} }));
    } else {
      action = "decrement";
      const updatedPost = await updateLikeStatus(action, post._id);
      setPosts((prevList) => ({ ...prevList, [updatedPost._id]: {...updatedPost, liked: false} }));
    }
  }

  return (
    <>
      {
        posts.length === 0 ?
          <p>Not posts yet</p>
          :
          Object.values(posts).slice().sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            .map(post => {
              return (
                <div key={post._id} className='post-teaser'>
                  <div className='title-author'>
                    <Link to={`/posts/${post._id}`}>
                      <h4>{post.title}</h4>
                    </Link>
                    <p>{post.author?.username}</p>
                  </div>
                  <div className='post-details'>
                    <p> <FontAwesomeIcon icon={faHeart} color={post.liked ? "#cb2a2a" : "#3d4050"} onClick={() => handleLike(post)} />{post.likes}</p>
                    <p> <FontAwesomeIcon icon={faComment} color="#3d4050" />{post.comments.length}</p>
                    <p>{formatDistanceToNow(new Date(post.timestamp))} ago</p>
                  </div>
                </div>
              )
            })
      }
    </>
  )
}