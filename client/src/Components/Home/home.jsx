import Select from '../Select/select'
import PostList from '../PostList/postList'
import './home.css'

export default function Home({ postsByTopic, topics, user, setPostsByTopic, posts }) {

  return (
    <>
      <div className='dropdowns'>
        <div>
          <p>Your local community</p>
          <div className='local-community'>
            <p>{user.city}, {user.country}</p>
          </div>
        </div>
        <Select topics={topics} setPostsByTopic={setPostsByTopic} postsByTopic={postsByTopic} posts={posts} />
      </div>
      <div className='postlist'>
        <PostList postsByTopic={postsByTopic} />
      </div>
    </>
  )
}