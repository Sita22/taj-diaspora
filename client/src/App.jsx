import { useState } from 'react'
import './App.css'
import user from './mock/user.json'
import { Routes, Route } from 'react-router'
import Home from './Components/Home/home.jsx'
import Post from './Components/Post/post.jsx'


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts/:postId" element={<Post />} />
      </Routes>
    </>
  )
}

export default App
