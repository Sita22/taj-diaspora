import Select from '../Select/select'
import PostList from '../PostList/postList'
import './home.css'

export default function Home({ posts, topics, user }) {


  //TODO display search bar 
  //TODO display user icon with link to User details

  return (
    <>
      <nav>
        <div>
          <img src="logo.png" alt="" width={100} />
        </div>
        <div className='right-nav'>
          <p>Search    </p>
          <p> {user.name}</p>
        </div>
      </nav>

      <div className='dropdowns'>
        <div>
          <p>Your local community</p>
          <div>
            <p>{user.community}</p>
          </div>
        </div>
        <Select topics={topics} />
      </div>
      <div className='postlist'>
        <PostList posts={posts} />
      </div>
    </>
  )
}