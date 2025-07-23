import Select from '../Select/select'
import PostList from '../PostList/postList'

export default function Home ({}) {
  return (
    <>
    <nav>
        <img src="logo.png" alt="" width={100} />
      </nav>
      <div className='dropdowns'>
        <Select />
      </div>
      <div className='postlist'>
        <PostList />
      </div>
    </>
  )
}