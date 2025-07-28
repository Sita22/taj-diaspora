import { useState, useEffect, createContext } from 'react'
import './App.css'
import { Routes, Route } from 'react-router'
import Home from './Components/Home/home.jsx'
import Post from './Components/Post/post.jsx'
import AddPost from './Components/AddPost/addPost.jsx'
import { getAllPosts, getAllTopics, getAllUsers, getUser } from './Services/ApiClient.js'
import Nav from './Components/Navigation/nav.jsx'
import UserDetails from './Components/UserDetails/userDetails.jsx'
import { useLocation } from 'react-router'

const AppContext = createContext(null);

function App() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState({});
  const [topics, setTopics] = useState([]);
  const [user, setUser] = useState({});
  const [users, setUsers] = useState([]);
  const location = useLocation();

  const displayMainNav = location.pathname === "/";

  const updateState = (list) => {
    setPosts((prevPosts) => {
      const newPosts = { ...prevPosts };
      list.forEach((post) => {
        newPosts[post._id] = post;
      })
      return newPosts;
    })
  }

  useEffect(() => {
    async function fetchData() {
      const postList = await getAllPosts();
      const topicList = await getAllTopics();
      const userData = await getUser();
      const usersData = await getAllUsers();
      updateState(postList);
      setTopics(topicList);
      setUser(userData);
      setUsers(usersData);
      setLoading(false);
    }
    fetchData();
  }, []);

  return (
    <>
      <AppContext.Provider value={{ user, users }}>
        <div className={`nav-container ${displayMainNav ? "display" : "hidden"}`}>
          <Nav user={user} posts={posts} />
        </div>
        <Routes>
          {loading ? (
            <Route path="/" element={<div>Loading...</div>} />
          ) : (
            <Route path="/" element={<Home setPosts={setPosts} topics={topics} user={user} posts={posts} />} />
          )}
          <Route path="/posts/:postId" element={<Post user={user} setPosts={setPosts} />} />
          <Route path="/user" element={<UserDetails user={user} setUser={setUser} />} />
          <Route path="/posts/add" element={<AddPost setPosts={setPosts} topics={topics} user={user} />} />
        </Routes>
      </AppContext.Provider>
    </>
  )
}

export default App
