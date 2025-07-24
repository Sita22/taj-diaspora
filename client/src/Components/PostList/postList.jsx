import './postList.css'
import { Link } from 'react-router';
import { useContext } from 'react';
import { AppContext } from '../../App';
import { useState, useEffect } from 'react';
import { format, formatDistanceToNow } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faHeart } from '@fortawesome/free-solid-svg-icons'

export default function PostList({ postsByTopic }) {
  const { user, users } = useContext(AppContext);
  const [postWithAuthor, setPostWithAuthor] = useState([]);
  //TODO display the author



  return (
    <>
      {
        postsByTopic.length === 0 ?
          <p>Not posts yet</p>
          :
          postsByTopic.slice().sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
            .map(post => {
              return (
                <div key={post._id} className='post-teaser'>
                  <Link to={`/posts/${post._id}`}>
                    <h4>{post.title}</h4>
                  </Link>
                  <div className='post-details'>
                    <p> <FontAwesomeIcon icon={faHeart} color="#cb2a2a" />{post.likes}</p>
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