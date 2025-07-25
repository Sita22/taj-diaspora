import Select from '../Select/select'
import PostList from '../PostList/postList'
import './home.css'

export default function Home({ topics, user, posts, setPosts }) {

  return (
    <>
      <div className='dropdowns'>
        <div>
          <p>Your local community</p>
          <div className='local-community'>
            <p>{user.city}, {user.country}</p>
          </div>
        </div>
        <Select topics={topics} setPosts={setPosts} />
      </div>
      <div className='postlist'>
        <PostList posts={posts} />
      </div>
    </>
  )
}