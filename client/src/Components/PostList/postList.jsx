//import posts from '../../mock/posts.json'
import './postList.css'
import { Link } from 'react-router';

export default function PostList({ postsByTopic }) {

  return (
    <>
      {
        postsByTopic.length === 0 ?
          <p>Not posts yet</p>
          :
          postsByTopic.map(post => {
            return (
              <div key={post._id} className='post-teaser'>
                <Link to={`/posts/${post._id}`}>
                  <h4>{post.title}</h4>
                </Link>
                <div className='post-details'>
                  <p>{post.likes} likes</p>
                  <p>{post.comments.length} comments</p>
                  <p>{post.timestamp}</p>
                </div>
              </div>
            )
          })
      }
    </>
  )
}