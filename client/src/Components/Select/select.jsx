import { useState } from 'react';
import { getAllPosts } from '../../Services/ApiClient';
import './select.css'

export default function Select({ topics, setPosts }) {
  const [selectedTopic, setSelectedTopic] = useState("All");

  function handleChange(topicTitle) {
    setSelectedTopic(topicTitle);
    if (topicTitle === "All") {
      async function fetchData() {
        const postList = await getAllPosts();
        setPosts(postList);
      }
      fetchData();
    } else if (topicTitle !== "All") {
      const selectedTopicData = topics.filter(topic => topic.title === topicTitle);
      setPosts(selectedTopicData[0].posts);
    }
  }

  return (
    <>
      <div className="topic-filter">
        <div className={`topic-pill ${selectedTopic === "All" ? "active" : ""}`}
          onClick={() => handleChange("All")}
        >All</div>
        {
          topics.map(topic => {
            return <div className={`topic-pill ${selectedTopic === topic.title ? "active" : ""}`}
              key={topic._id}
              onClick={() => handleChange(topic.title)}>{topic.title}</div>
          })
        }
      </div>
    </>
  )
}