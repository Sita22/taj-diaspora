import posts from '../../mock/posts.json'
import './postList.css'

export default function PostList({ }) {
  return (
    <>
      {
        posts.map(post => {
          return (
            <div className='post-teaser'>
              <a>{post.title}</a>
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