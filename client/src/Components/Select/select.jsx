import { useState } from 'react';
import communities from '../../mock/communities.json'
import { getAllPosts } from '../../Services/ApiClient';
import './select.css'

export default function Select({ topics, setPosts }) {
  const [selectedTopic, setSelectedTopic] = useState("All");

  function handleChange(event) {
    const value = event.target.value;
    setSelectedTopic(value);
    if (value === "all") {
      async function fetchData() {
        const postList = await getAllPosts();
        setPosts(postList);
      }
      fetchData();
    } else if (value !== "All") {
      const selectedTopicData = topics.filter(topic => topic.title === value);
      setPosts(selectedTopicData[0].posts);
    }
  }

  return (
    <>
      <div className='dropdowns'>
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