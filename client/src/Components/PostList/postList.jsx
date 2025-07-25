import './postList.css'
import { Link } from 'react-router';
import { useContext } from 'react';
import { AppContext } from '../../App';
import { useState, useEffect } from 'react';
import { format, formatDistanceToNow } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faHeart } from '@fortawesome/free-solid-svg-icons'

export default function PostList({ posts }) {
  const { user, users } = useContext(AppContext);
  const baseUrl = "http://localhost:3000/";

  const [liked, setLikedStatus] = useState(false);
  const [heartColor, setHeartColor] = useState("#3d4050");

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

  async function handleLike(postId) {
    let action = "";
    if (!liked) {
      action = "increment";
      setHeartColor("#cb2a2a");
      setLikedStatus(!liked);
      const updatedPost = await updateLikeStatus(action, postId);
      
    } else {
      action = "decrement";
      setHeartColor("#3d4050");
      setLikedStatus(!liked);
      updateLikeStatus(action, postId);
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
                    <p>{post.author.username}</p>
                  </div>
                  <div className='post-details'>
                    <p> <FontAwesomeIcon icon={faHeart} color={heartColor} onClick={() => handleLike(post._id)} />{post.likes}</p>
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