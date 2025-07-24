import Select from '../Select/select'
import PostList from '../PostList/postList'
import './home.css'

export default function Home({ postsByTopic, topics, user, setPostsByTopic, posts }) {


  //TODO display search bar 
  //TODO display user icon with link to User details
  //TODO display the list of highlighted posts or recent posts

  function handleAddPost () {

  }


  return (
    <>
      <nav>
        <div>
          <img src="logo.png" alt="" width={100} />
        </div>
        <div className='right-nav'>
          <p>Search    </p>
          <button onClick={handleAddPost}>Add Post</button>
          <p> {user.name}</p>
        </div>
      </nav>

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