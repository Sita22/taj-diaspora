import { useState } from 'react'
import './App.css'
import user from './mock/user.json'
import Select from './Components/Select/select'
import PostList from './Components/PostList/postList'
import { Routes, Route } from 'react-router'


function App() {

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
      <Routes>
      </Routes>
    </>
  )
}

export default App
