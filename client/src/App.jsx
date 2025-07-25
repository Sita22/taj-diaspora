import { useState, useEffect, createContext } from 'react'
import './App.css'
import { Routes, Route } from 'react-router'
import Home from './Components/Home/home.jsx'
import Post from './Components/Post/post.jsx'
import { getAllPosts, getAllTopics, getAllUsers, getCommunities, getUser } from './Services/ApiClient.js'
import Nav from './Components/Navigation/nav.jsx'
import UserDetails from './Components/UserDetails/userDetails.jsx'

export const AppContext = createContext(null);

function App() {
  const [posts, setPosts] = useState([]);
  const [topics, setTopics] = useState([]);
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const postList = await getAllPosts();
      const topicList = await getAllTopics();
      const userData = await getUser();
      const communityData = await getCommunities();
      const usersData = await getAllUsers();
      setPosts(postList);
      setTopics(topicList);
      setUser(userData);
      setUsers(usersData);
    }
    fetchData();
  }, []);

  return (
    <>
      <AppContext.Provider value={{ user, users }}>
        <div className='nav-container'>
          <Nav user={user} />
        </div>
        <Routes>
          <Route path="/" element={<Home setPosts={setPosts} topics={topics} user={user} posts={posts} />} />
          <Route path="/posts/:postId" element={<Post />} />
          <Route path="/user" element={<UserDetails user={user} />} />
        </Routes>
      </AppContext.Provider>
    </>
  )
}

export default App
