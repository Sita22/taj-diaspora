import { useState } from 'react';
import communities from '../../mock/communities.json'
import './select.css'

export default function Select({ topics, setPostsByTopic, posts }) {

  const [selectedTopic, setSelectedTopic] = useState("All");

  function handleChange(event) {
    const value = event.target.value;
    setSelectedTopic(value);
    if (value === "all") {
      setPostsByTopic(posts);
    } else if (value !== "All") {
      const selectedTopicData = topics.filter(topic => topic.title === value);
      const filteredPosts = posts.filter(post => post.topicId === selectedTopicData[0]._id)
      setPostsByTopic(filteredPosts);
    }
  }

  return (
    <>
      <div className='dropdowns'>
        {/* <form action="">
          <label htmlFor=""></label>
          <select name="" id="">
            {
              communities.map(comm => {
                return <option key={comm._id} value={comm.city}>{comm.city}</option>
              })
            }
          </select>
        </form> */}
        <div className='topics-container'>
          <label htmlFor="">Topics
            <select value={selectedTopic} onChange={handleChange}>
              <option value="all">All</option>
              {
                topics.map(topic => {
                  return <option key={topic._id} value={topic.title}>{topic.title}</option>
                })
              }
            </select>
          </label>
        </div>
      </div>
    </>
  )
}