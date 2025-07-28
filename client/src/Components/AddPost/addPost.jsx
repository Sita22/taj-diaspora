import { useState, useEffect } from "react";
import './addPost.css';
import { Link } from "react-router";
import { addPost } from "../../Services/ApiClient";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';

export default function AddPost({ setPosts, topics, user }) {

  const [title, setTitle] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("");
  const [content, setContent] = useState("");
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

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
    setOpen(true);
  }
  return (
    <>
      <div className="add-post-container">
        {
          open &&
          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
            <Alert
              onClose={handleClose}
              severity="success"
              variant="filled"
              sx={{ width: '100%', backgroundColor: '#d58936' }}
            >
            Your post was successfully created!
          </Alert>
          </Snackbar>
        }
      <div className="go-back">
        <Link to={"/"}>
          <FontAwesomeIcon icon={faChevronLeft} />
        </Link>
        <h4>Post</h4>
      </div>
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
        <input
          type="text"
          value={title}
          name="title"
          onChange={handleTitle}
          placeholder="Insert a title..."
          required />
        <label htmlFor="">Content</label>
        <textarea
          value={content}
          onChange={handleContent}
          rows={7}
          placeholder="Insert a content..." />
        <div className="button-container">
          <button type="submit">Create</button>
        </div>
      </form>
    </div >
    </>
  )
}