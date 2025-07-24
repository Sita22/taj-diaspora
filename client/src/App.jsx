import { useState, useEffect } from 'react'
import './App.css'
import user from './mock/user.json'
import { Routes, Route } from 'react-router'
import Home from './Components/Home/home.jsx'
import Post from './Components/Post/post.jsx'
import { getAllPosts, getAllTopics, getUser } from './Services/ApiClient.js'


function App() {
  const [posts, setPosts] = useState([]);
  const [topics, setTopics] = useState([]);
  const [user, setUser] = useState({});


  useEffect(() => {
    async function fetchData() {
      const postList = await getAllPosts();
      const topicList = await getAllTopics();
      const userData = await getUser();
      setPosts(postList);
      setTopics(topicList);
      setUser(userData);
    }
    fetchData();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home posts={posts} topics={topics} user={user} />} />
        <Route path="/posts/:postId" element={<Post />} />
      </Routes>
    </>
  )
}

export default App
