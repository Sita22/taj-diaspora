import { useState, useEffect } from "react";
import './addPost.css';
import { addPost } from "../../Services/ApiClient";

export default function AddPost({ setPosts, topics, user }) {

  const [title, setTitle] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (topics.length > 0) {
      setSelectedTopic(topics[0].title);
    }
  }, [topics]);

  function handleTitle(event) {
    const newTitle = event.target.value;
    setTitle(newTitle);
  }

  function handleTopic(event) {
    const newTopic = event.target.value;
    setSelectedTopic(newTopic);
  }


  function handleContent(event) {
    const newContent = event.target.value;
    setContent(newContent);
  }

  async function handleOnSubmit(event) {
    event.preventDefault();
    const newPost = await addPost(title, content, selectedTopic, user._id);
    setPosts(oldPosts => ({ ...oldPosts, newPost }));
    setSelectedTopic("");
    setTitle("");
    setContent("");
    return <p>Post successfully created!</p>
  }
  return (
    <>
      <div className="add-post-container">
        <h1>Add a new post</h1>
        <form className="post-form" action="" onSubmit={handleOnSubmit}>
          <label htmlFor="">Select a topic</label>
          <select value={selectedTopic} onChange={handleTopic}>
            {
              topics.map(topic => {
                return <option key={topic._id} value={topic._id}>{topic.title}</option>
              })
            }
          </select>
          <label htmlFor="">Title</label>
          <input type="text" value={title} name="title" onChange={handleTitle} placeholder="Insert a title..." required />
          <label htmlFor="">Content</label>
          <textarea value={content} onChange={handleContent} rows={7} placeholder="Insert a content..." />
          <button type="submit">Create</button>
        </form>
      </div>
    </>
  )
}