import Select from '../Select/select'
import PostList from '../PostList/postList'
import './home.css'

export default function Home({ topics, user, posts, setPosts, updateState }) {

  return (
    <>
      <div className='dropdowns'>
        <div className='location-bar'>
          <svg viewBox="0 0 24 24">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
          </svg>
          <span>{user.city}, {user.country}</span>
        </div>
      </div>
      <Select topics={topics} updateState={updateState} setPosts={setPosts} />
      <div className='postlist'>
        <PostList posts={posts} setPosts={setPosts} user={user} />
      </div>
    </>
  )
}