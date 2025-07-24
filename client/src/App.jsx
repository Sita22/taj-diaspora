import { useState, useEffect } from 'react'
import './App.css'
import user from './mock/user.json'
import { Routes, Route } from 'react-router'
import Home from './Components/Home/home.jsx'
import Post from './Components/Post/post.jsx'
import { getAllPosts, getAllTopics, getCommunities, getUser } from './Services/ApiClient.js'


function App() {
  const [posts, setPosts] = useState([]);
  const [postsByTopic, setPostsByTopic] = useState([]);
  const [topics, setTopics] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    async function fetchData() {
      const postList = await getAllPosts();
      const topicList = await getAllTopics();
      const userData = await getUser();
      const communityData = await getCommunities();
      setPosts(postList);
      setPostsByTopic(postList);
      setTopics(topicList);
      setUser(userData);
    }
    fetchData();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home postsByTopic={postsByTopic} topics={topics} user={user} setPostsByTopic={setPostsByTopic} posts={posts} />} />
        <Route path="/posts/:postId" element={<Post />} />
      </Routes>
    </>
  )
}

export default App
